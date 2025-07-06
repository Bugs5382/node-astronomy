import * as path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    coverage: {
      provider: "v8",
      exclude: [
        "tsup.config.ts",
        "src/index.ts",
        "*.mts",
        "*.mjs",
        "**/__tests__/**/**",
        "**/docs/**",
        "**/lib/**",
      ],
    },
  },
});
