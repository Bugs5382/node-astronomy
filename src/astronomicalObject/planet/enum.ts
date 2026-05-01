/**
 * Identifier for each supported planet.
 *
 * `Earth` is included for completeness (the {@link Earth} class exposes
 * orbital info but no observer-aware methods), and `Pluto` is supported
 * via a hand-rolled Keplerian ephemeris because `@observerly/astrometry`
 * does not include it.
 *
 * @since 0.2.0
 */
export const PlanetName = {
  Earth: "earth",
  Jupiter: "jupiter",
  Mars: "mars",
  Mercury: "mercury",
  Neptune: "neptune",
  Pluto: "pluto",
  Saturn: "saturn",
  Uranus: "uranus",
  Venus: "venus",
} as const;

/**
 * Planets for which `PlanetTimes` (observer-aware methods) is defined.
 * Earth is excluded because rise/set/alt-az from itself is undefined.
 *
 * @since 0.2.0
 */
export type ObservablePlanetName = Exclude<PlanetName, "earth">;

export type PlanetName = (typeof PlanetName)[keyof typeof PlanetName];
