import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // globalSetup: './__tests__/setup.ts',
    //
    // setupFiles: ['./__tests__/setup.ts'],
    coverage: {
      provider: "v8",
      exclude: [
        "tsup.config.ts",
        "commitlint.config.cjs",
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
