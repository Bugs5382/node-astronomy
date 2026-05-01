import {
  earth as astrometryEarth,
  jupiter as astrometryJupiter,
  mars as astrometryMars,
  mercury as astrometryMercury,
  neptune as astrometryNeptune,
  Planet as AstrometryPlanet,
  saturn as astrometrySaturn,
  uranus as astrometryUranus,
  venus as astrometryVenus,
} from "@observerly/astrometry";

import { PlanetName } from "@/astronomicalObject/planet/enum";

/**
 * Symbol glyph used by each planet (Pluto's stylised `♇` is widely
 * recognised even though the IAU has not officially blessed it).
 *
 * @since 0.2.0
 */
export const PLANET_SYMBOLS: Record<PlanetName, string> = {
  earth: "♁",
  jupiter: "♃",
  mars: "♂",
  mercury: "☿",
  neptune: "♆",
  pluto: "♇",
  saturn: "♄",
  uranus: "♅",
  venus: "♀",
};

/**
 * Westernised display names for each planet.
 *
 * @since 0.2.0
 */
export const PLANET_DISPLAY_NAMES: Record<PlanetName, string> = {
  earth: "Earth",
  jupiter: "Jupiter",
  mars: "Mars",
  mercury: "Mercury",
  neptune: "Neptune",
  pluto: "Pluto",
  saturn: "Saturn",
  uranus: "Uranus",
  venus: "Venus",
};

/**
 * J2000.0 orbital elements for Pluto, hand-rolled because
 * `@observerly/astrometry` does not include Pluto. Matches the shape of
 * astrometry's `Planet` so the same Keplerian-propagation code path can
 * be used.
 *
 * Source: standard tabulated J2000 mean elements (Meeus, Astronomical
 * Algorithms, Chapter 33). Sufficient for ≈ arc-minute accuracy over
 * 1900–2100; for higher precision use Meeus Ch 37 periodic terms.
 *
 * @since 0.2.0
 */
export const astrometryPluto: AstrometryPlanet = {
  a: 39.482,
  e: 0.2488,
  i: 17.16,
  m: 0.0022,
  name: "Earth", // satisfies the type — we don't read this field
  r: 0.18,
  symbol: "♁", // unused; we use PLANET_SYMBOLS
  T: 247.7,
  uid: "pluto",
  ε: 238.93,
  ϖ: 224.07,
  Ω: 110.299,
};

/**
 * Lookup table from `PlanetName` to astrometry's `Planet` constant.
 * Used by the base `Planet` class to dispatch ephemeris calls.
 *
 * @since 0.2.0
 */
export const ASTROMETRY_PLANETS: Record<PlanetName, AstrometryPlanet> = {
  earth: astrometryEarth,
  jupiter: astrometryJupiter,
  mars: astrometryMars,
  mercury: astrometryMercury,
  neptune: astrometryNeptune,
  pluto: astrometryPluto,
  saturn: astrometrySaturn,
  uranus: astrometryUranus,
  venus: astrometryVenus,
};
