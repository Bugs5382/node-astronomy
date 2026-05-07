/**
 * Lunar ecliptic position.
 *
 * Vendored from `@observerly/astrometry`'s `moon.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import {
  getLunarCorrectedEclipticLongitudeOfTheAscendingNode,
  getLunarTrueEclipticLongitude,
} from "@/astrometry/moon/true";
import { getSolarEclipticLongitude } from "@/astrometry/sun/anomaly";
import {
  radiansToDegrees as deg,
  degreesToRadians as rad,
} from "@/util/angles";
import { type EclipticCoordinate } from "@/util/coordinates";

/** Inclination of the lunar orbit to the ecliptic, degrees. */
const LUNAR_INCLINATION_DEG = 5.145_396_4;

/**
 * Lunar geocentric ecliptic coordinate at `date`.
 *
 * @since 0.2.0
 */
export function getLunarEclipticCoordinate(date: Date): EclipticCoordinate {
  const L = getLunarTrueEclipticLongitude(date);
  const Ω = getLunarCorrectedEclipticLongitudeOfTheAscendingNode(date);
  const index = rad(LUNAR_INCLINATION_DEG);
  let λ =
    (Ω +
      deg(
        Math.atan2(
          Math.sin(rad(L - Ω)) * Math.cos(index),
          Math.cos(rad(L - Ω)),
        ),
      )) %
    360;
  if (λ < 0) λ += 360;
  const β = deg(Math.asin(Math.sin(rad(L - Ω)) * Math.sin(index)));
  return { β, λ };
}

/**
 * Lunar ecliptic latitude (degrees).
 *
 * @since 0.2.0
 */
export function getLunarEclipticLatitude(date: Date): number {
  const L = getLunarTrueEclipticLongitude(date);
  const Ω = getLunarCorrectedEclipticLongitudeOfTheAscendingNode(date);
  const index = rad(LUNAR_INCLINATION_DEG);
  return deg(Math.asin(Math.sin(rad(L - Ω)) * Math.sin(index)));
}

/**
 * Lunar ecliptic longitude (degrees, `[0, 360)`).
 *
 * @since 0.2.0
 */
export function getLunarEclipticLongitude(date: Date): number {
  const L = getLunarTrueEclipticLongitude(date);
  const Ω = getLunarCorrectedEclipticLongitudeOfTheAscendingNode(date);
  const index = rad(LUNAR_INCLINATION_DEG);
  let λ =
    (Ω +
      deg(
        Math.atan2(
          Math.sin(rad(L - Ω)) * Math.cos(index),
          Math.cos(rad(L - Ω)),
        ),
      )) %
    360;
  if (λ < 0) λ += 360;
  return λ;
}

/**
 * Lunar elongation from the sun (degrees, `[0, 360)`).
 *
 * @since 0.2.0
 */
export function getLunarElongation(date: Date): number {
  const { β, λ } = getLunarEclipticCoordinate(date);
  const sunLambda = getSolarEclipticLongitude(date);
  let E = deg(Math.acos(Math.cos(rad(λ - sunLambda)) * Math.cos(rad(β)))) % 360;
  if (E < 0) E += 360;
  return E;
}
