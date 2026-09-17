import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

import { ApiError } from "@/lib/api/api-error";

/**
 * Maps backend field errors onto a React Hook Form instance.
 *
 * The Rust API returns `error.fields` keyed by field path, so a validation
 * failure lands on the offending input rather than in a generic toast. Unknown
 * keys fall back to a form-level error so the message is never silently dropped.
 */
export function applyBackendErrors<TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
  knownFields: readonly Path<TFieldValues>[],
): string | null {
  if (!(error instanceof ApiError)) {
    return "An unexpected error occurred. Please try again.";
  }

  if (!error.isValidation || !error.fields) {
    return error.message;
  }

  const unmatched: string[] = [];

  for (const [field, messages] of Object.entries(error.fields)) {
    const message = messages[0];
    if (!message) continue;

    const path = toFieldPath<TFieldValues>(field);
    if (knownFields.includes(path)) {
      setError(path, { type: "server", message });
    } else {
      unmatched.push(message);
    }
  }

  return unmatched.length > 0 ? unmatched.join(" ") : null;
}

/** Converts `snake_case` backend keys and `items.0.qty` paths to form paths. */
function toFieldPath<TFieldValues extends FieldValues>(
  field: string,
): Path<TFieldValues> {
  const camel = field.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());
  return camel as Path<TFieldValues>;
}
