import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // Playwright owns end-to-end specs; Vitest must not try to run them.
    exclude: ["node_modules/**", ".next/**", "src/test/e2e/**"],
    coverage: {
      reporter: ["text", "html"],
      include: ["src/lib/**", "src/features/**"],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
