/**
 * Named lunar phases.
 *
 * Re-exported as our own const so consumers don't have to depend on
 * `@observerly/astrometry` types directly. Values match astrometry's
 * `Phases` strings 1:1, so the cast in `Moon.phase()` is safe.
 *
 * @since 0.2.0
 */
export const MoonPhase = {
  FirstQuarter: "First Quarter",
  Full: "Full",
  Invalid: "Invalid",
  LastQuarter: "Last Quarter",
  New: "New",
  WaningCrescent: "Waning Crescent",
  WaningGibbous: "Waning Gibbous",
  WaxingCrescent: "Waxing Crescent",
  WaxingGibbous: "Waxing Gibbous",
} as const;

export type MoonPhase = (typeof MoonPhase)[keyof typeof MoonPhase];
