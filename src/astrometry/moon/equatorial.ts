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
 * Lunar equatorial position.
 *
 * Vendored from `@observerly/astrometry`'s `moon.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * Note that astrometry's `getLunarEquatorialCoordinate` performs the
 * ecliptic→equatorial rotation inline (rather than calling
 * `convertEclipticToEquatorial`). The two paths are mathematically
 * equivalent; we keep the inline form here so the port stays
 * bit-for-bit faithful to upstream.
 *
 * @since 0.2.0
 */

import { getLunarEclipticCoordinate } from "@/astrometry/moon/ecliptic";
import {
  radiansToDegrees as deg,
  degreesToRadians as rad,
} from "@/util/angles";
import { type EquatorialCoordinate } from "@/util/coordinates";
import { getObliquityOfTheEcliptic } from "@/util/time";

/**
 * Lunar geocentric equatorial coordinate at `date`.
 *
 * @since 0.2.0
 */
export function getLunarEquatorialCoordinate(date: Date): EquatorialCoordinate {
  const { β, λ } = getLunarEclipticCoordinate(date);
  const ε = rad(getObliquityOfTheEcliptic(date));
  const ra = deg(
    Math.atan2(
      Math.sin(rad(λ)) * Math.cos(ε) - Math.tan(rad(β)) * Math.sin(ε),
      Math.cos(rad(λ)),
    ),
  );
  const dec = deg(
    Math.asin(
      Math.sin(rad(β)) * Math.cos(ε) +
        Math.cos(rad(β)) * Math.sin(ε) * Math.sin(rad(λ)),
    ),
  );
  return { dec, ra };
}
