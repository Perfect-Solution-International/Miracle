/** Status of a single file in the upload queue. */
export type UploadStatus =
  | "queued"
  | "requesting-url"
  | "uploading"
  | "confirming"
  | "complete"
  | "error"
  | "cancelled";

export interface UploadItem {
  /** Client-generated id; the server id arrives once the upload is confirmed. */
  id: string;
  file: File;
  status: UploadStatus;
  /** 0-100. */
  progress: number;
  error?: string;
  /** Document id returned by the backend after confirmation. */
  documentId?: string;
  /** Object URL for image previews. Revoked on removal to avoid leaking memory. */
  previewUrl?: string;
}

export interface FileUploaderConstraints {
  /** Accepted MIME types or extensions, e.g. `["application/pdf", ".docx"]`. */
  accept?: readonly string[];
  /** Maximum size per file, in bytes. */
  maxSizeBytes?: number;
  maxFiles?: number;
}

export interface PresignResponse {
  /** Pre-signed PUT URL issued by the backend for direct object-storage upload. */
  uploadUrl: string;
  /** Identifier used to confirm the upload once the transfer completes. */
  documentId: string;
  /** Headers the storage provider requires on the PUT. */
  headers?: Record<string, string>;
}

export const DEFAULT_MAX_SIZE_BYTES = 10 * 1024 * 1024;

/** Validates a file against the constraints, returning an error message or null. */
export function validateFile(
  file: File,
  constraints: FileUploaderConstraints,
): string | null {
  const maxSize = constraints.maxSizeBytes ?? DEFAULT_MAX_SIZE_BYTES;

  if (file.size > maxSize) {
    const maxMb = Math.round(maxSize / (1024 * 1024));
    return `File exceeds the ${maxMb} MB limit.`;
  }

  if (file.size === 0) {
    return "File appears to be empty.";
  }

  const accept = constraints.accept;
  if (accept && accept.length > 0) {
    const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
    const matches = accept.some((pattern) => {
      if (pattern.startsWith(".")) return pattern.toLowerCase() === extension;
      if (pattern.endsWith("/*")) return file.type.startsWith(pattern.slice(0, -1));
      return file.type === pattern;
    });

    if (!matches) return "This file type is not accepted.";
  }

  return null;
}
