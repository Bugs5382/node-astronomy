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
 * Equatorial-coordinate correction for precession of the equinoxes.
 *
 * Vendored from `@observerly/astrometry`'s `precession.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import {
  radiansToDegrees as deg,
  degreesToRadians as rad,
} from "@/util/angles";
import { type EquatorialCoordinate } from "@/util/coordinates";
import { getJulianCenturiesSinceJ2000 } from "@/util/time";

/**
 * Correction to apply to a J2000 equatorial coordinate to bring it to
 * the supplied date's equator/equinox.
 *
 * Returns `{ ra, dec }` correction terms (degrees) to ADD to the J2000
 * coordinate.
 *
 * @since 0.2.0
 */
export function getCorrectionToEquatorialForPrecessionOfEquinoxes(
  date: Date,
  target: EquatorialCoordinate,
): EquatorialCoordinate {
  const T = getJulianCenturiesSinceJ2000(date);
  const ζ = (2306.2181 * T + 0.301_88 * T ** 2 + 0.017_998 * T ** 3) / 3600;
  const z = (2306.2181 * T + 1.094_68 * T ** 2 + 0.018_203 * T ** 3) / 3600;
  const θ = (2004.3109 * T - 0.426_65 * T ** 2 - 0.041_833 * T ** 3) / 3600;
  const A = Math.cos(rad(target.dec)) * Math.sin(rad(target.ra + ζ));
  const B =
    Math.cos(rad(θ)) *
      Math.cos(rad(target.dec)) *
      Math.cos(rad(target.ra + ζ)) -
    Math.sin(rad(θ)) * Math.sin(rad(target.dec));
  const C =
    Math.sin(rad(θ)) *
      Math.cos(rad(target.dec)) *
      Math.cos(rad(target.ra + ζ)) +
    Math.cos(rad(θ)) * Math.sin(rad(target.dec));
  const newRa = deg(Math.atan2(A, B)) + z;
  const newDec = deg(Math.asin(C));
  return {
    dec: newDec - target.dec,
    ra: newRa - target.ra,
  };
}
