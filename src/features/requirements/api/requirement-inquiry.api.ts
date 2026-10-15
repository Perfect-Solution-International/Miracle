import type { RequirementInquiryInput } from "../schemas/requirement-inquiry.schema";

export class RequirementInquiryError extends Error {
  constructor(
    message: string,
    readonly fieldErrors: Partial<Record<keyof RequirementInquiryInput, string>> = {},
  ) {
    super(message);
  }
}

/** Uses the existing public email API host, independently of sessions or Next.js routes. */
export async function submitRequirementInquiry(
  values: RequirementInquiryInput,
  files: File[],
  website: string,
): Promise<string> {
  const unavailable =
    "We cannot send your requirement right now. Please try again later or contact us by email.";
  let endpoint: URL;
  try {
    const configured = process.env.NEXT_PUBLIC_CONTACT_API_URL;
    if (!configured) throw new Error();
    endpoint = new URL(configured);
    if (
      endpoint.protocol !== "https:" &&
      !(
        endpoint.protocol === "http:" &&
        ["localhost", "127.0.0.1", "[::1]"].includes(endpoint.hostname)
      )
    )
      throw new Error();
    endpoint.pathname = endpoint.pathname.replace(/\/+$/, "");
    endpoint = new URL("requirement-inquiries", endpoint);
  } catch {
    throw new RequirementInquiryError(unavailable);
  }
  const body = new FormData();
  body.append("data", JSON.stringify({ ...values, website }));
  files.forEach((file) => body.append("files", file));
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      body,
      credentials: "omit",
      signal: AbortSignal.timeout(55_000),
    });
  } catch {
    // A lost response may follow SMTP acceptance. Never retry automatically.
    throw new RequirementInquiryError(
      "We could not confirm that your requirement was sent. Your details and files are still here. Check your connection before trying again, or contact us by email.",
    );
  }
  const result: unknown = await response.json().catch(() => null);
  if (
    response.ok &&
    result &&
    typeof result === "object" &&
    "success" in result &&
    result.success === true &&
    "data" in result &&
    result.data &&
    typeof result.data === "object" &&
    "accepted" in result.data &&
    result.data.accepted === true &&
    "reference" in result.data &&
    typeof result.data.reference === "string" &&
    /^REQ-[A-F0-9]{12}$/.test(result.data.reference)
  )
    return result.data.reference;

  const fields: Partial<Record<keyof RequirementInquiryInput, string>> = {};
  if (
    response.status === 400 &&
    result &&
    typeof result === "object" &&
    "fieldErrors" in result &&
    result.fieldErrors &&
    typeof result.fieldErrors === "object"
  ) {
    for (const key of [
      "fullName",
      "email",
      "phone",
      "whatsappNumber",
      "requirementType",
      "whatDoYouNeed",
      "country",
      "timeline",
      "budgetRange",
      "additionalRequirements",
      "agreeToTerms",
    ] as const) {
      const value = (result.fieldErrors as Record<string, unknown>)[key];
      if (typeof value === "string") fields[key] = value;
    }
  }
  const messages: Record<number, string> = {
    400: "Check your details and attachments. Use PDF, DOC, DOCX, JPG, PNG or WEBP files up to 10 MB each.",
    403: "We could not accept this requirement. Please reload the website and try again, or contact us by email.",
    413: "Attach up to 3 files, no more than 10 MB each and 15 MB in total.",
    429: "Too many attempts. Please wait a few minutes before trying again.",
  };
  throw new RequirementInquiryError(messages[response.status] ?? unavailable, fields);
}
