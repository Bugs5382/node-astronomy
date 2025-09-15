import { defineConfig } from "tsup";

export default defineConfig([
  {
    clean: true,
    dts: {
      entry: "src/index.ts",
    },
    entry: ["src/index.ts"],
    format: "esm",
    minify: true,
    outDir: "lib/esm",
    sourcemap: true,
    target: "esnext",
  },
  {
    clean: false,
    entry: ["src/index.ts"],
    format: "cjs",
    minify: true,
    outDir: "lib/cjs",
    sourcemap: true,
    target: "esnext",
  },
]);
