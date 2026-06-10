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
 * Earth heliocentric ecliptic position via VSOP87 (truncated).
 *
 * Vendored from `@observerly/astrometry`'s `sun.js` series-summing
 * helpers (Copyright © 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import {
  EARTH_B_SERIES,
  EARTH_L_SERIES,
  EARTH_R_SERIES,
  type VsopSeries,
} from "@/astrometry/earth/vsop87";
import { radiansToDegrees } from "@/util/angles";
import { AU_IN_METERS, getJulianCenturiesSinceJ2000 } from "@/util/time";

/**
 * Earth's heliocentric ecliptic coordinate at `date`.
 *
 * Returns ecliptic longitude `λ` and latitude `β` in degrees and the
 * radius vector `R` in metres (Earth–Sun distance).
 *
 * @since 0.2.0
 */
export function getEarthHeliocentricEcliptic(date: Date): {
  R: number;
  β: number;
  λ: number;
} {
  const τ = getJulianCenturiesSinceJ2000(date) / 10;
  const λ = radiansToDegrees(sumSeries(τ, EARTH_L_SERIES) / 1e8);
  const β = radiansToDegrees(sumSeries(τ, EARTH_B_SERIES) / 1e8);
  const R = (sumSeries(τ, EARTH_R_SERIES) / 1e8) * AU_IN_METERS;
  return { R, β, λ };
}

function sumSeries(τ: number, series: readonly VsopSeries[]): number {
  let total = 0;
  for (const [index, element] of series.entries()) {
    total += sumSingleSeries(τ, element) * τ ** index;
  }
  return total;
}

function sumSingleSeries(τ: number, terms: VsopSeries): number {
  let total = 0;
  for (const term of terms) {
    total += term.A * Math.cos(term.B + term.C * τ);
  }
  return total;
}
