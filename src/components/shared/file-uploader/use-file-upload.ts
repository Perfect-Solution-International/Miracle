"use client";

import { useCallback, useRef, useState } from "react";

import { api } from "@/lib/api/client";
import { API_ROUTES } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/api-error";
import {
  validateFile,
  type FileUploaderConstraints,
  type PresignResponse,
  type UploadItem,
} from "./file-uploader.types";

/**
 * Upload queue driving the FileUploader.
 *
 * Uploads go straight to object storage using a pre-signed URL from the Rust
 * backend, so large trade documents never pass through the Next server. The flow
 * is: presign, PUT to storage, then confirm so the backend can record the
 * document and run its own checks.
 *
 * Each in-flight request keeps an AbortController so a cancelled or removed
 * upload stops transferring rather than finishing invisibly.
 */
export function useFileUpload(constraints: FileUploaderConstraints = {}) {
  const [items, setItems] = useState<UploadItem[]>([]);
  const controllers = useRef(new Map<string, AbortController>());

  const update = useCallback((id: string, patch: Partial<UploadItem>) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }, []);

  const upload = useCallback(
    async (item: UploadItem) => {
      const controller = new AbortController();
      controllers.current.set(item.id, controller);

      try {
        update(item.id, { status: "requesting-url", progress: 0 });

        const presign = await api.post<PresignResponse>(
          API_ROUTES.documents.presign,
          {
            fileName: item.file.name,
            contentType: item.file.type || "application/octet-stream",
            sizeBytes: item.file.size,
          },
          { signal: controller.signal },
        );

        update(item.id, { status: "uploading", documentId: presign.documentId });

        // XHR rather than fetch: it reports upload progress, which fetch does not.
        await putWithProgress({
          url: presign.uploadUrl,
          file: item.file,
          headers: presign.headers,
          signal: controller.signal,
          onProgress: (progress) => update(item.id, { progress }),
        });

        update(item.id, { status: "confirming", progress: 100 });
        await api.post(API_ROUTES.documents.confirm(presign.documentId), undefined, {
          signal: controller.signal,
        });

        update(item.id, { status: "complete" });
      } catch (error) {
        if (controller.signal.aborted) {
          update(item.id, { status: "cancelled" });
          return;
        }
        const message =
          error instanceof ApiError
            ? error.message
            : error instanceof Error
              ? error.message
              : "Upload failed.";
        update(item.id, { status: "error", error: message });
      } finally {
        controllers.current.delete(item.id);
      }
    },
    [update],
  );

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const incoming = Array.from(files);
      const maxFiles = constraints.maxFiles;

      setItems((current) => {
        const room = maxFiles ? Math.max(maxFiles - current.length, 0) : incoming.length;
        const accepted = incoming.slice(0, room);

        const created: UploadItem[] = accepted.map((file) => {
          const error = validateFile(file, constraints);
          return {
            id: crypto.randomUUID(),
            file,
            status: error ? "error" : "queued",
            progress: 0,
            error: error ?? undefined,
            previewUrl: file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : undefined,
          };
        });

        // Start only the files that passed validation.
        queueMicrotask(() => {
          for (const item of created) {
            if (item.status === "queued") void upload(item);
          }
        });

        return [...current, ...created];
      });
    },
    [constraints, upload],
  );

  const remove = useCallback((id: string) => {
    controllers.current.get(id)?.abort();
    controllers.current.delete(id);

    setItems((current) => {
      const target = current.find((item) => item.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return current.filter((item) => item.id !== id);
    });
  }, []);

  const retry = useCallback(
    (id: string) => {
      setItems((current) => {
        const target = current.find((item) => item.id === id);
        if (target) {
          queueMicrotask(() => void upload({ ...target, error: undefined }));
        }
        return current.map((item) =>
          item.id === id
            ? { ...item, status: "queued", error: undefined, progress: 0 }
            : item,
        );
      });
    },
    [upload],
  );

  const reset = useCallback(() => {
    for (const controller of controllers.current.values()) controller.abort();
    controllers.current.clear();
    setItems((current) => {
      for (const item of current) {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      }
      return [];
    });
  }, []);

  return {
    items,
    addFiles,
    remove,
    retry,
    reset,
    /** Document ids of successful uploads, for submitting with a form. */
    completedIds: items
      .filter((item) => item.status === "complete" && item.documentId)
      .map((item) => item.documentId as string),
    isUploading: items.some((item) =>
      ["queued", "requesting-url", "uploading", "confirming"].includes(item.status),
    ),
  };
}

function putWithProgress({
  url,
  file,
  headers,
  signal,
  onProgress,
}: {
  url: string;
  file: File;
  headers?: Record<string, string>;
  signal: AbortSignal;
  onProgress: (progress: number) => void;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);

    for (const [key, value] of Object.entries(headers ?? {})) {
      xhr.setRequestHeader(key, value);
    }
    if (!headers?.["Content-Type"]) {
      xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    }

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Storage rejected the upload (status ${xhr.status}).`));
      }
    });
    xhr.addEventListener("error", () =>
      reject(new Error("Network error during upload.")),
    );
    xhr.addEventListener("abort", () => reject(new Error("Upload cancelled.")));

    signal.addEventListener("abort", () => xhr.abort(), { once: true });
    xhr.send(file);
  });
}
