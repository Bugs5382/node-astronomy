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
