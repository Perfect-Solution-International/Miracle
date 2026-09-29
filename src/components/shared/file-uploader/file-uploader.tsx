"use client";

import { AlertCircle, CheckCircle2, FileText, RefreshCw, Upload, X } from "lucide-react";
import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatFileSize } from "@/lib/formatting/number";
import { cn } from "@/lib/utils";

import {
  DEFAULT_MAX_SIZE_BYTES,
  type FileUploaderConstraints,
} from "./file-uploader.types";
import { useFileUpload } from "./use-file-upload";

/**
 * Generic uploader for business documents, invoices, and supplier paperwork.
 *
 * The drop zone is a real `<button>` wrapping a hidden file input, so it is
 * reachable by keyboard and announced correctly; drag and drop is an enhancement
 * on top rather than the only way in.
 */
export function FileUploader({
  constraints = {},
  onComplete,
  label = "Upload documents",
  description,
  className,
}: {
  constraints?: FileUploaderConstraints;
  onComplete?: (documentIds: string[]) => void;
  label?: string;
  description?: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);
  const { items, addFiles, remove, retry, completedIds } = useFileUpload(constraints);

  const maxSize = constraints.maxSizeBytes ?? DEFAULT_MAX_SIZE_BYTES;
  const hint =
    description ??
    `Up to ${formatFileSize(maxSize)} per file${
      constraints.accept?.length ? `. Accepted: ${constraints.accept.join(", ")}` : ""
    }`;

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    addFiles(files);
    // Report ids after the queue settles; complete uploads resolve into state.
    queueMicrotask(() => onComplete?.(completedIds));
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
      >
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-describedby={`${inputId}-hint`}
          className={cn(
            "focus-visible:ring-ring flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-10 transition-colors focus-visible:ring-2 focus-visible:outline-none",
            isDragging ? "border-primary bg-accent/40" : "hover:bg-accent/30",
          )}
        >
          <Upload className="text-muted-foreground size-6" aria-hidden="true" />
          <span className="text-sm font-medium">{label}</span>
          <span id={`${inputId}-hint`} className="text-muted-foreground text-xs">
            Click to browse or drag files here. {hint}
          </span>
        </button>

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple={constraints.maxFiles !== 1}
          accept={constraints.accept?.join(",")}
          onChange={(event) => {
            handleFiles(event.target.files);
            // Clear so selecting the same file again re-triggers change.
            event.target.value = "";
          }}
          className="sr-only"
        />
      </div>

      {items.length > 0 ? (
        <ul className="space-y-2" aria-label="Upload queue">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 rounded-lg border p-3">
              {item.previewUrl ? (
                // Object URL of a local file; next/image cannot optimise it.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.previewUrl}
                  alt=""
                  className="size-10 shrink-0 rounded object-cover"
                />
              ) : (
                <FileText
                  className="text-muted-foreground size-5 shrink-0"
                  aria-hidden="true"
                />
              )}

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{item.file.name}</p>
                  <span className="text-muted-foreground shrink-0 text-xs">
                    {formatFileSize(item.file.size)}
                  </span>
                </div>

                {item.status === "uploading" || item.status === "confirming" ? (
                  <Progress value={item.progress} className="h-1.5" />
                ) : null}

                {item.status === "error" ? (
                  <p
                    className="text-destructive flex items-center gap-1 text-xs"
                    role="alert"
                  >
                    <AlertCircle className="size-3.5" aria-hidden="true" />
                    {item.error}
                  </p>
                ) : null}

                {item.status === "complete" ? (
                  <p className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    Uploaded
                  </p>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center gap-1">
                {item.status === "error" ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => retry(item.id)}
                    aria-label={`Retry upload of ${item.file.name}`}
                  >
                    <RefreshCw aria-hidden="true" />
                  </Button>
                ) : null}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.file.name}`}
                >
                  <X aria-hidden="true" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
