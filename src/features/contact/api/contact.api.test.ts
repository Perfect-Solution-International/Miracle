import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { submitContact } from "./contact.api";

const message = {
  name: "Test Visitor",
  email: "visitor@example.com",
  phone: "",
  subject: "Support",
  message: "Please send more information.",
};
beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_CONTACT_API_URL", "https://email.example/contact");
  vi.stubGlobal("fetch", vi.fn());
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

it.each([undefined, "http://email.example/contact"])(
  "does not send to an absent or insecure public endpoint: %s",
  async (endpoint) => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_API_URL", endpoint);
    await expect(submitContact(message, "")).rejects.toThrow();
    expect(fetch).not.toHaveBeenCalled();
  },
);

it("maps server validation to known fields without accepting arbitrary response keys", async () => {
  vi.mocked(fetch).mockResolvedValue(
    Response.json(
      { fieldErrors: { email: "Enter a valid email address.", admin: "unexpected" } },
      { status: 400 },
    ),
  );
  await expect(submitContact(message, "")).rejects.toMatchObject({
    fieldErrors: { email: "Enter a valid email address." },
  });
});

it("does not treat a successful HTTP response without an explicit success flag as delivery", async () => {
  vi.mocked(fetch).mockResolvedValue(new Response("<html>Error</html>"));
  await expect(submitContact(message, "")).rejects.toThrow();
});
