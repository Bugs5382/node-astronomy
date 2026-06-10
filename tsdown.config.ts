/*
MIT License

Copyright (c) 2026 Shane Froebel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
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
