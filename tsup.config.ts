import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    outDir: "lib/esm",
    format: "esm",
    dts: {
      entry: "src/index.ts",
    },
    sourcemap: true,
    minify: true,
    clean: true,
    target: "esnext",
  },
  {
    entry: ["src/index.ts"],
    outDir: "lib/cjs",
    format: "cjs",
    sourcemap: true,
    minify: true,
    clean: false,
    target: "esnext",
  },
]);
