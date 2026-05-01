import { defineConfig } from "tsdown";

/**
 * tsdown build config — produces dual ESM + CJS output, both minified, both
 * with sourcemaps and ambient `.d.ts` declarations.
 *
 * Mirrors the previous `tsup.config.ts` shape so consumers see no change in
 * the published `lib/esm/` and `lib/cjs/` layout. The `@/*` path alias from
 * tsconfig.json is picked up automatically via the `tsconfig` option.
 *
 * @since 0.2.0
 */
export default defineConfig([
  {
    clean: true,
    dts: true,
    entry: ["src/index.ts"],
    format: "esm",
    minify: true,
    outDir: "lib/esm",
    sourcemap: true,
    target: "esnext",
    tsconfig: "./tsconfig.json",
  },
  {
    clean: false,
    dts: false,
    entry: ["src/index.ts"],
    format: "cjs",
    minify: true,
    outDir: "lib/cjs",
    sourcemap: true,
    target: "esnext",
    tsconfig: "./tsconfig.json",
  },
]);
