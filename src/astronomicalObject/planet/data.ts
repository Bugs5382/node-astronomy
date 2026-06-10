/*
MIT License

Copyright (c) __YEAR__ __AUTHOR__

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
import {
  earth as astrometryEarth,
  jupiter as astrometryJupiter,
  mars as astrometryMars,
  mercury as astrometryMercury,
  neptune as astrometryNeptune,
  type PlanetOrbital as AstrometryPlanet,
  saturn as astrometrySaturn,
  uranus as astrometryUranus,
  venus as astrometryVenus,
} from "@/astrometry/planets/data";
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
  isInferior: false,
  m: 0.0022,
  name: "Pluto",
  r: 0.18,
  symbol: "♇",
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
