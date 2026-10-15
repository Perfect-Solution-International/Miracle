import type { ContactMessageInput } from "../schemas/contact-message.schema";

export class ContactSubmissionError extends Error {
  constructor(
    message: string,
    readonly fieldErrors: Partial<Record<keyof ContactMessageInput, string>> = {},
  ) {
    super(message);
  }
}

const messages: Record<number, string> = {
  400: "Please check your details and try again.",
  403: "We could not accept this message. Please reload the website and try again, or contact us by email.",
  413: "Your message is too long. Please shorten it and try again.",
  429: "Too many attempts. Please wait a few minutes before trying again.",
  503: "We cannot send your message right now. Please try again later or contact us by email.",
};

/** Public contact endpoint on the existing Rust API; also works with a static frontend. */
export async function submitContact(
  values: ContactMessageInput,
  website: string,
): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_API_URL;
  if (!endpoint) {
    throw new ContactSubmissionError(messages[503]!);
  }
  const url = new URL(endpoint);
  if (
    url.protocol !== "https:" &&
    !(
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
    )
  ) {
    throw new ContactSubmissionError(messages[503]!);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "omit",
      body: JSON.stringify({ ...values, website }),
      signal: AbortSignal.timeout(55_000),
    });
  } catch {
    // Never retry automatically: a lost response can follow SMTP acceptance.
    throw new ContactSubmissionError(
      "We could not confirm that your message was sent. Your details are still here. Please check your connection before trying again, or contact us by email.",
    );
  }

  const body: unknown = await response.json().catch(() => null);
  if (
    response.ok &&
    body &&
    typeof body === "object" &&
    "success" in body &&
    body.success === true
  )
    return;

  const fieldErrors: Partial<Record<keyof ContactMessageInput, string>> = {};
  if (
    response.status === 400 &&
    body &&
    typeof body === "object" &&
    "fieldErrors" in body &&
    body.fieldErrors &&
    typeof body.fieldErrors === "object"
  ) {
    for (const key of ["name", "email", "phone", "subject", "message"] as const) {
      if (key in body.fieldErrors) {
        const value = (body.fieldErrors as Record<string, unknown>)[key];
        if (typeof value === "string") fieldErrors[key] = value;
      }
    }
  }
  throw new ContactSubmissionError(
    messages[response.status] ?? messages[503]!,
    fieldErrors,
  );
}
