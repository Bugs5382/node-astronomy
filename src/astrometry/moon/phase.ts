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
 * Lunar phase, age, illumination, and Brown lunation helpers.
 *
 * Vendored from `@observerly/astrometry`'s `moon.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import { getLunarElongation } from "@/astrometry/moon/ecliptic";
import { getLunarMeanAnomaly } from "@/astrometry/moon/mean";
import { getLunarTrueEclipticLongitude } from "@/astrometry/moon/true";
import { getSolarEclipticLongitude } from "@/astrometry/sun/anomaly";
import { degreesToRadians as rad } from "@/util/angles";
import { getJulianDate } from "@/util/time";

/** Julian-day reference for lunation 1 (Brown's reckoning). */
export const LUNATION_BASE_JULIAN_DAY = 2_423_436.611_527_777_7;

/** Synodic month, mean (days). */
export const LUNAR_SYNODIC_MONTH = 29.530_588_853;

/** Named lunar phases — strings match the upstream `Phases` enum 1:1. */
export const Phases = {
  FirstQuarter: "First Quarter",
  Full: "Full",
  Invalid: "Invalid",
  LastQuarter: "Last Quarter",
  New: "New",
  WaningCrescent: "Waning Crescent",
  WaningGibbous: "Waning Gibbous",
  WaxingCrescent: "Waxing Crescent",
  WaxingGibbous: "Waxing Gibbous",
} as const;

/**
 * Lunar age (days since the most recent new moon) and angle (degrees
 * past elongation = 0).
 *
 * @since 0.2.0
 */
export function getLunarAge(date: Date): { A: number; age: number } {
  const L = getLunarTrueEclipticLongitude(date);
  let A = (L - getSolarEclipticLongitude(date)) % 360;
  if (A < 0) A += 360;
  const age = A * (29.5306 / 360);
  return { A, age };
}

/**
 * Brown lunation number for `date`.
 *
 * @since 0.2.0
 */
export function getLunarBrownLunationNumber(date: Date): number {
  const JD = getJulianDate(date);
  return Math.round((JD - LUNATION_BASE_JULIAN_DAY) / LUNAR_SYNODIC_MONTH) + 1;
}

/**
 * Fraction of the lunar disc illuminated, in `[0, 100]`.
 *
 * @since 0.2.0
 */
export function getLunarIllumination(date: Date): number {
  const phaseAngle = getLunarPhaseAngle(date);
  return 50 * (1 + Math.cos(rad(phaseAngle)));
}

/**
 * Named lunar phase at `date` (matches `Phases` values).
 *
 * @since 0.2.0
 */
export function getLunarPhase(date: Date): string {
  const { age } = getLunarAge(date);
  const illumination = getLunarIllumination(date);
  if (age < 5.536_99) return Phases.WaxingCrescent;
  if (age < 9.228_31) return Phases.FirstQuarter;
  if (age < 14.719_63) return Phases.WaxingGibbous;
  if (age < 15.020_96 && Math.abs(illumination - 100) < 1) return Phases.Full;
  if (age < 20.302_28) return Phases.WaningGibbous;
  if (age < 23.993_61) return Phases.LastQuarter;
  if (age < 29.084_93) return Phases.WaningCrescent;
  return Phases.New;
}

/**
 * Lunar phase angle (sun-Earth-moon angle, degrees).
 *
 * @since 0.2.0
 */
export function getLunarPhaseAngle(date: Date): number {
  const M = rad(getLunarMeanAnomaly(date));
  const E = getLunarElongation(date);
  return (
    180 -
    E -
    0.1468 *
      ((1 - 0.0549 * Math.sin(M)) / (1 - 0.0167 * Math.sin(M))) *
      Math.sin(rad(E))
  );
}
