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
/**
 * Earth orbital scalars (eccentricity, obliquity, eccentricity
 * coefficient) and the canonical Earth orbital-element record.
 *
 * Vendored from `@observerly/astrometry`'s `earth.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import { getJulianCenturiesSinceJ2000 } from "@/util/time";

/** Canonical orbital descriptor for a planet. */
export interface PlanetOrbital {
  /** Semi-major axis in AU. */
  a: number;
  /** Eccentricity. */
  e: number;
  /** Inclination to the ecliptic, degrees. */
  i: number;
  /** Whether the planet is interior to Earth's orbit. */
  isInferior: boolean;
  /** Mass relative to Earth (Earth = 1). */
  m: number;
  /** Common name. */
  name: string;
  /** Equatorial radius in metres. */
  r: number;
  /** Symbol glyph. */
  symbol: string;
  /** Sidereal period in years. */
  T: number;
  /** Stable unique identifier. */
  uid: string;
  /** Mean longitude at the J2000 epoch, degrees. */
  ε: number;
  /** Longitude of perihelion, degrees. */
  ϖ: number;
  /** Longitude of ascending node, degrees. Omitted when undefined (e.g. Earth). */
  Ω?: number;
}

/**
 * Canonical Earth orbital-element record (J2000 mean elements).
 *
 * @since 0.2.0
 */
export const earth: PlanetOrbital = {
  a: 1.000_000_3,
  e: 0.016_711_23,
  i: -1.531e-5,
  isInferior: false,
  m: 1,
  name: "Earth",
  r: 6_378_140,
  symbol: "♁",
  T: 1.000_017_4,
  uid: "01HD4AM60QS3SXKKJWY1A2Z3JF",
  ε: 100.464_572,
  ϖ: 102.937_682,
};

/**
 * Dimensionless coefficient relating Earth's mean orbital eccentricity
 * to its instantaneous form. Used internally by sun-distance series.
 *
 * @since 0.2.0
 */
export function getCoefficientOfEccentricity(date: Date): number {
  const T = getJulianCenturiesSinceJ2000(date);
  return 1 - 0.002_516 * T - 7.4e-6 * T ** 2;
}

/**
 * Earth's orbital eccentricity at `date`. Slowly varies over time.
 *
 * @since 0.2.0
 */
export function getEccentricityOfOrbit(date: Date): number {
  const T = getJulianCenturiesSinceJ2000(date);
  return 0.016_708_634_2 - 4.2037e-5 * T - ((1.267e-7 * T ** 2) % 360);
}

/**
 * Mean obliquity of the ecliptic at `date`, in degrees, using the
 * high-order IAU/Laskar polynomial. Differs from the low-order form in
 * `util/time.ts` (which is what coordinate transforms rely on); this
 * version is what the public `Earth.obliquityOfEcliptic()` reports.
 *
 * @since 0.2.0
 */
export function getObliquityOfEcliptic(date: Date): number {
  const T = getJulianCenturiesSinceJ2000(date);
  return (
    23.439_291_111_1 -
    0.013_004_166_7 * T -
    1.639e-7 * T ** 2 +
    5.036e-7 * T ** 3 -
    6e-10 * T ** 4 -
    1.8e-11 * T * T * T * T * T
  );
}
