/**
 * Shared orbit-parameter helper used by lunar distance / angular-diameter
 * formulas (and reusable by other small-eccentricity bodies).
 *
 * Vendored from `@observerly/astrometry`'s `orbit.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import { degreesToRadians as rad } from "@/util/angles";

/**
 * Standard "F" orbital parameter:
 *   F = (1 + e·cos(true_anomaly)) / (1 − e²)
 *
 * Used to scale the body's mean distance / mean angular diameter to the
 * instantaneous value at the given true anomaly.
 *
 * @since 0.2.0
 */
export function getFOrbitalParameter(
  trueAnomalyDeg: number,
  eccentricity: number,
): number {
  return (
    (1 + eccentricity * Math.cos(rad(trueAnomalyDeg))) / (1 - eccentricity ** 2)
  );
}
