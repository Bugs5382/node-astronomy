import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

/**
 * End-to-end test for `scripts/inject-iers-suppressor.mjs`.
 *
 * Spawns a fresh Node sub-process for each format, requires/imports the
 * built bundle, and asserts that astrometry's stale-IERS-table warning
 * never reaches stderr. The test is skipped when the build artifacts
 * don't exist on disk yet — run `npm run build` first.
 */
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const CJS_BUNDLE = path.join(REPO_ROOT, "lib", "cjs", "index.cjs");
const ESM_BUNDLE = path.join(REPO_ROOT, "lib", "esm", "index.mjs");
const buildExists = existsSync(CJS_BUNDLE) && existsSync(ESM_BUNDLE);

const IERS_FRAGMENT = "IERS leap seconds table is out of date";

describe.skipIf(!buildExists)("IERS suppression in built bundles", () => {
  test("CJS bundle loads without printing the IERS warning", () => {
    const result = spawnSync(
      process.execPath,
      ["-e", `require(${JSON.stringify(CJS_BUNDLE)})`],
      { encoding: "utf8" },
    );
    expect(result.status).toBe(0);
    expect(result.stderr).not.toContain(IERS_FRAGMENT);
  });

  test("ESM bundle loads without printing the IERS warning", () => {
    const result = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `await import(${JSON.stringify(ESM_BUNDLE)})`,
      ],
      { encoding: "utf8" },
    );
    expect(result.status).toBe(0);
    expect(result.stderr).not.toContain(IERS_FRAGMENT);
  });

  test("CJS shim still re-exports the package surface", () => {
    const result = spawnSync(
      process.execPath,
      [
        "-e",
        `const m = require(${JSON.stringify(CJS_BUNDLE)}); ` +
          `if (typeof m.Sun !== "function") process.exit(2); ` +
          `if (typeof m.SunTimes !== "function") process.exit(3); ` +
          `if (typeof m.TimeOfInterest !== "function") process.exit(4);`,
      ],
      { encoding: "utf8" },
    );
    expect(result.status).toBe(0);
  });

  test("Suppressor still forwards unrelated warnings", () => {
    const result = spawnSync(
      process.execPath,
      [
        "-e",
        `require(${JSON.stringify(CJS_BUNDLE)}); console.warn("hello world")`,
      ],
      { encoding: "utf8" },
    );
    expect(result.status).toBe(0);
    expect(result.stderr).toContain("hello world");
  });
});
