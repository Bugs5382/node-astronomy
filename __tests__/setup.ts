/**
 * Vitest setup file — runs once before each test file.
 *
 * The only job here is to mute `@observerly/astrometry`'s stale-IERS-table
 * warning during local test runs. The production fix lives in
 * `scripts/inject-iers-suppressor.mjs`, which wraps the built bundle.
 * Vitest, however, imports the TypeScript source tree directly (no bundle
 * involved), so the production wrapper never gets a chance to run. Without
 * this file, every developer would see the spurious warning printed once
 * per test file. The filter is intentionally narrow: only the exact stale
 * table message is suppressed; every other warning passes through.
 *
 * @since 0.2.0
 */
const _origWarn = console.warn;
console.warn = (...arguments_: unknown[]): void => {
  const first = arguments_[0];
  if (
    typeof first === "string" &&
    first.includes("IERS leap seconds table is out of date")
  ) {
    return;
  }
  _origWarn.apply(console, arguments_);
};
