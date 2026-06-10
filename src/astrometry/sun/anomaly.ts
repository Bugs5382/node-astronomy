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
/**
 * Solar anomaly and longitude helpers.
 *
 * Vendored from `@observerly/astrometry`'s `sun.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import { degreesToRadians as rad } from "@/util/angles";
import { getJulianCenturiesSinceJ2000 } from "@/util/time";

/**
 * Solar ecliptic longitude at `date`, degrees.
 *
 * Mirrors the upstream quirk: returns the unmodded `trueAnomaly +
 * 282.938346`, which can exceed 360°. Callers that need a normalised
 * `[0, 360)` value should pass the result through `normalizeDegrees360`.
 *
 * @since 0.2.0
 */
export function getSolarEclipticLongitude(date: Date): number {
  let lon = getSolarTrueAnomaly(date) + (282.938_346 % 360);
  if (lon < 0) lon += 360;
  return lon;
}

/**
 * Solar equation of centre at `date`, degrees.
 *
 * @since 0.2.0
 */
export function getSolarEquationOfCenter(date: Date): number {
  const T = getJulianCenturiesSinceJ2000(date);
  const M = getSolarMeanAnomaly(date);
  return (
    (1.914_602 - 4.817e-3 * T ** 2 - 1.4e-5 * T ** 3) * Math.sin(rad(M)) +
    (0.019_993 - 1.01e-4 * T ** 2) * Math.sin(rad(2 * M)) +
    2.89e-4 * Math.sin(rad(3 * M))
  );
}

/**
 * Solar mean anomaly at `date`, degrees `[0, 360)`.
 *
 * @since 0.2.0
 */
export function getSolarMeanAnomaly(date: Date): number {
  const T = getJulianCenturiesSinceJ2000(date);
  let M = (357.529_11 + 35_999.050_29 * T - 1.537e-4 * T ** 2) % 360;
  if (M < 0) M += 360;
  return M;
}

/**
 * Solar mean geometric longitude at `date`, degrees `[0, 360)`.
 *
 * @since 0.2.0
 */
export function getSolarMeanGeometricLongitude(date: Date): number {
  const T = getJulianCenturiesSinceJ2000(date);
  let L = (280.466_46 + 36_000.769_83 * T + 3.032e-4 * T ** 2) % 360;
  if (L < 0) L += 360;
  return L;
}

/**
 * Solar true anomaly at `date`, degrees.
 *
 * @since 0.2.0
 */
export function getSolarTrueAnomaly(date: Date): number {
  const M = getSolarMeanAnomaly(date);
  const C = getSolarEquationOfCenter(date);
  return (M + C) % 360;
}

/**
 * Solar true geometric longitude at `date`, degrees.
 *
 * @since 0.2.0
 */
export function getSolarTrueGeometricLongitude(date: Date): number {
  const L = getSolarMeanGeometricLongitude(date);
  const C = getSolarEquationOfCenter(date);
  return (L + C) % 360;
}
