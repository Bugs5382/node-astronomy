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
 * Lunar distance and angular-diameter helpers.
 *
 * Vendored from `@observerly/astrometry`'s `moon.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import { earth } from "@/astrometry/earth/orbit";
import { getLunarEquatorialCoordinate } from "@/astrometry/moon/equatorial";
import { getFOrbitalParameter } from "@/astrometry/moon/orbit";
import { getLunarTrueAnomaly } from "@/astrometry/moon/true";
import {
  radiansToDegrees as deg,
  degreesToRadians as rad,
} from "@/util/angles";
import { type GeographicCoordinate } from "@/util/coordinates";
import { AU_IN_METERS, getHourAngle } from "@/util/time";

/** Mean lunar distance from Earth's centre, in metres. */
const MEAN_LUNAR_DISTANCE_METRES = 3.844e8;

/** Lunar orbital eccentricity. */
const LUNAR_ECCENTRICITY = 0.0549;

/** Mean angular semi-diameter of the moon, degrees. */
const MEAN_LUNAR_SEMI_DIAMETER_DEG = 0.272_481;

/**
 * Lunar angular diameter (degrees).
 *
 * - Without an `observer`: returns the geocentric angular diameter
 *   based on the mean semi-diameter scaled by the F orbital parameter.
 * - With an `observer`: returns the topocentric angular diameter,
 *   accounting for the observer's geocentric position (latitude,
 *   longitude, elevation) and parallax.
 *
 * @since 0.2.0
 */
export function getLunarAngularDiameter(
  date: Date,
  observer?: GeographicCoordinate,
): number {
  if (!observer) {
    const v = getLunarTrueAnomaly(date);
    return 0.5181 * getFOrbitalParameter(v, LUNAR_ECCENTRICITY);
  }

  const meanDiameter = 2 * MEAN_LUNAR_SEMI_DIAMETER_DEG;
  const distanceAU = getLunarDistance(date) / AU_IN_METERS;
  const { dec, ra } = getLunarEquatorialCoordinate(date);
  const ha = getHourAngle(date, observer.longitude, ra);
  const horizontalParallaxArcsec = 8.794 / distanceAU;
  const sinHP = Math.sin(rad(horizontalParallaxArcsec / 3600));

  const earthEquatorialRadiusM = earth.r;
  const elevation = observer.elevation ?? 0;
  const sinDec = Math.sin(rad(dec));
  const cosDec = Math.cos(rad(dec));
  const sinHA = Math.sin(rad(ha));
  const cosHA = Math.cos(rad(ha));

  // Reduced latitude (geocentric ↔ geodetic correction).
  const u = Math.atan(0.996_647_19 * Math.tan(rad(observer.latitude)));
  const rhoSinPhiPrime =
    0.996_647_19 * Math.sin(u) +
    (elevation * Math.sin(rad(observer.latitude))) / earthEquatorialRadiusM;
  const rhoCosPhiPrime =
    Math.cos(u) +
    (elevation * Math.cos(rad(observer.latitude))) / earthEquatorialRadiusM;

  const A = cosDec * sinHA;
  const B = cosDec * cosHA - rhoCosPhiPrime * sinHP;
  const C = sinDec - rhoSinPhiPrime * sinHP;
  const distanceFactor = Math.hypot(A, B, C);

  return deg((meanDiameter / distanceFactor) * sinHP);
}

/**
 * Geocentric lunar distance at `date`, metres.
 *
 * @since 0.2.0
 */
export function getLunarDistance(date: Date): number {
  const v = getLunarTrueAnomaly(date);
  return (
    MEAN_LUNAR_DISTANCE_METRES / getFOrbitalParameter(v, LUNAR_ECCENTRICITY)
  );
}
