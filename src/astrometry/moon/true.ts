/**
 * Lunar "true" (corrected) ecliptic helpers.
 *
 * Vendored from `@observerly/astrometry`'s `moon.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import {
  getLunarAnnualEquationCorrection,
  getLunarEvectionCorrection,
  getLunarMeanAnomalyCorrection,
  getLunarMeanEclipticLongitude,
  getLunarMeanEclipticLongitudeOfTheAscendingNode,
} from "@/astrometry/moon/mean";
import {
  getSolarEclipticLongitude,
  getSolarMeanAnomaly,
} from "@/astrometry/sun/anomaly";
import { degreesToRadians as rad } from "@/util/angles";

/**
 * Lunar corrected ecliptic longitude of the ascending node, degrees.
 *
 * @since 0.2.0
 */
export function getLunarCorrectedEclipticLongitudeOfTheAscendingNode(
  date: Date,
): number {
  const Ω = getLunarMeanEclipticLongitudeOfTheAscendingNode(date);
  const sunM = getSolarMeanAnomaly(date);
  return Ω - 0.16 * Math.sin(rad(sunM));
}

/**
 * Lunar true anomaly at `date`, degrees.
 *
 * Mirrors astrometry's quirk: the second `0.214 * sin(2·M')` term is
 * mod-360 before being added (operator-precedence accident upstream
 * that has no observable effect because the addend is small).
 *
 * @since 0.2.0
 */
export function getLunarTrueAnomaly(date: Date): number {
  const MM = getLunarMeanAnomalyCorrection(date);
  let v = 6.2886 * Math.sin(rad(MM)) + ((0.214 * Math.sin(rad(2 * MM))) % 360);
  if (v < 0) v += 360;
  return v;
}

/**
 * Lunar true ecliptic longitude at `date`, degrees `[0, 360)`.
 *
 * @since 0.2.0
 */
export function getLunarTrueEclipticLongitude(date: Date): number {
  let L = getLunarMeanEclipticLongitude(date);
  const annual = getLunarAnnualEquationCorrection(date);
  const evection = getLunarEvectionCorrection(date);
  const v = getLunarTrueAnomaly(date);
  L = (L + evection + v - annual) % 360;
  if (L < 0) L += 360;
  const sunLambda = getSolarEclipticLongitude(date);
  const correction = 0.6583 * Math.sin(2 * rad(L - sunLambda));
  let result = (L + correction) % 360;
  if (result < 0) result += 360;
  return result;
}
