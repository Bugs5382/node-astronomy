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
 * Lunar mean-element helpers.
 *
 * Vendored from `@observerly/astrometry`'s `moon.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import {
  getSolarEclipticLongitude,
  getSolarMeanAnomaly,
} from "@/astrometry/sun/anomaly";
import { degreesToRadians as rad } from "@/util/angles";
import { daysSinceJ2000, getJulianCenturiesSinceJ2000 } from "@/util/time";

/**
 * Annual-equation correction (degrees) applied to the moon's mean
 * longitude.
 *
 * @since 0.2.0
 */
export function getLunarAnnualEquationCorrection(date: Date): number {
  const sunM = rad(getSolarMeanAnomaly(date));
  return 0.1858 * Math.sin(sunM);
}

/**
 * Lunar argument of latitude at `date`, degrees `[0, 360)`.
 *
 * @since 0.2.0
 */
export function getLunarArgumentOfLatitude(date: Date): number {
  const T = getJulianCenturiesSinceJ2000(date);
  let F =
    (160.7108 +
      390.670_502_84 * Math.round(T * 1236.85) -
      1.6118e-3 * T ** 2 -
      2.27e-6 * T ** 3 -
      1.1e-8 * T ** 4) %
    360;
  if (F < 0) F += 360;
  return F;
}

/**
 * Evection correction (degrees) applied to the moon's mean longitude.
 *
 * @since 0.2.0
 */
export function getLunarEvectionCorrection(date: Date): number {
  const M = rad(getLunarMeanAnomaly(date));
  const L = rad(getLunarMeanEclipticLongitude(date));
  const sunLambda = rad(getSolarEclipticLongitude(date));
  return 1.2739 * Math.sin(2 * (L - sunLambda) - M);
}

/**
 * Lunar mean anomaly at `date`, degrees `[0, 360)`.
 *
 * @since 0.2.0
 */
export function getLunarMeanAnomaly(date: Date): number {
  const T = getJulianCenturiesSinceJ2000(date);
  let M =
    (134.963_411_4 +
      477_198.867_631_3 * T +
      8.997e-3 * T ** 2 +
      T ** 3 / 69_699 -
      T ** 4 / 14_712_000) %
    360;
  if (M < 0) M += 360;
  return M;
}

/**
 * Lunar mean-anomaly correction (degrees) — composite of annual,
 * evection, and small empirical terms.
 *
 * @since 0.2.0
 */
export function getLunarMeanAnomalyCorrection(date: Date): number {
  const annual = getLunarAnnualEquationCorrection(date);
  const evection = getLunarEvectionCorrection(date);
  const M = getLunarMeanAnomaly(date);
  const sunM = rad(getSolarMeanAnomaly(date));
  let MM = (M + evection - annual - 0.37 * Math.sin(sunM)) % 360;
  if (MM < 0) MM += 360;
  return MM;
}

/**
 * Lunar mean ecliptic longitude (no nutation), degrees `[0, 360)`.
 *
 * @since 0.2.0
 */
export function getLunarMeanEclipticLongitude(date: Date): number {
  let L = (13.176_339_686 * daysSinceJ2000(date) + 218.316_433_88) % 360;
  if (L < 0) L += 360;
  return L;
}

/**
 * Lunar mean ecliptic longitude of the ascending node, degrees.
 *
 * @since 0.2.0
 */
export function getLunarMeanEclipticLongitudeOfTheAscendingNode(
  date: Date,
): number {
  let Ω = (125.044_522 - 0.052_953_9 * daysSinceJ2000(date)) % 360;
  if (Ω < 0) Ω += 360;
  const sunM = rad(getSolarMeanAnomaly(date));
  return Ω - 0.16 * Math.sin(sunM);
}

/**
 * Lunar mean geometric longitude at `date`, degrees `[0, 360)`.
 *
 * @since 0.2.0
 */
export function getLunarMeanGeometricLongitude(date: Date): number {
  const T = getJulianCenturiesSinceJ2000(date);
  let L =
    (218.316_447_7 +
      481_267.881_234_21 * T -
      1.5786e-3 * T ** 2 +
      T ** 3 / 538_841 -
      T ** 4 / 65_194_000) %
    360;
  if (L < 0) L += 360;
  return L;
}
