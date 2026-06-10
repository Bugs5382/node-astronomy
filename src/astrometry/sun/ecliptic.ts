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
 * Solar ecliptic position via VSOP87 (Earth-heliocentric inversion +
 * aberration & FK5 corrections).
 *
 * Vendored from `@observerly/astrometry`'s `sun.js::getSolarEclipticCoordinate`
 * (Copyright © 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import { getEarthHeliocentricEcliptic } from "@/astrometry/earth/heliocentric";
import { degreesToRadians as rad } from "@/util/angles";
import { AU_IN_METERS, getJulianCenturiesSinceJ2000 } from "@/util/time";

/**
 * Solar geocentric ecliptic coordinate at `date`.
 *
 * Returns:
 * - `λ` — apparent ecliptic longitude in degrees `[0, 360)`
 * - `β` — apparent ecliptic latitude in degrees
 * - `R` — Sun-Earth distance in metres
 *
 * Includes aberration and the FK5 longitude/latitude corrections.
 *
 * @since 0.2.0
 */
export function getSolarEclipticCoordinate(date: Date): {
  R: number;
  β: number;
  λ: number;
} {
  const T = getJulianCenturiesSinceJ2000(date);
  const τ = T / 10;
  const earth = getEarthHeliocentricEcliptic(date);

  const earthLambda = earth.λ % 360;
  const earthBeta = earth.β % 360;
  const earthRMetres = earth.R;

  // Geocentric solar longitude is Earth's heliocentric longitude + 180°.
  let λSun = earthLambda + 180;
  const RinAu = earthRMetres / AU_IN_METERS;

  // FK5 frame correction.
  const Λ = λSun - 1.397 * T - 3.1e-4 * T ** 2;
  const δβ = 1.087_78e-5 * (Math.cos(rad(Λ)) - Math.sin(rad(Λ)));

  // Aberration constant correction.
  λSun -= 2.508_33e-5;
  if (λSun < 0) λSun += 360;

  // Periodic correction (Bretagnon "T" series).
  const Tcorr =
    3548.193 +
    118.568 * Math.sin(rad(87.5287 + 359_993.7286 * τ)) +
    2.476 * Math.sin(rad(85.0561 + 719_987.4571 * τ)) +
    1.376 * Math.sin(rad(27.8502 + 4_452_671.1152 * τ)) +
    0.119 * Math.sin(rad(73.1375 + 450_368.8567 * τ)) +
    0.114 * Math.sin(rad(337.2264 + 329_644.6719 * τ)) +
    0.086 * Math.sin(rad(222.54 + 659_289.3436 * τ)) +
    0.078 * Math.sin(rad(162.8136 + 9_224_659.7915 * τ)) +
    0.054 * Math.sin(rad(82.5823 + 1_079_981.1857 * τ)) +
    0.052 * Math.sin(rad(171.5189 + 225_184.4282 * τ)) +
    0.034 * Math.sin(rad(30.3214 + 4_092_677.3866 * τ)) +
    0.033 * Math.sin(rad(119.8105 + 337_181.0415 * τ)) +
    0.023 * Math.sin(rad(247.5418 + 299_295.6151 * τ)) +
    0.023 * Math.sin(rad(325.1526 + 315_559.556 * τ)) +
    0.021 * Math.sin(rad(155.1241 + 675_553.2846 * τ)) +
    7.311 * Math.sin(rad(333.4515 + 359_993.7286 * τ)) +
    0.305 * Math.sin(rad(330.9814 + 719_987.4571 * τ)) +
    0.0107 * Math.sin(rad(328.517 + 1_079_981.1857 * τ)) +
    0.309 * τ * Math.sin(rad(241.4518 + 359_993.7286 * τ)) +
    0.021 * τ * Math.sin(rad(205.0482 + 719_987.4571 * τ)) +
    4e-3 * τ ** 2 * Math.sin(rad(297.861 + 4_452_671.1152 * τ)) +
    0.01 * τ ** 3 * Math.sin(rad(154.7066 + 359_993.7286 * τ));

  // Aberration correction (apparent place).
  λSun -= 20.4898 / 3600 / RinAu;
  λSun -= (-5.775_518e-3 * RinAu * Tcorr) / 3600;

  return {
    R: earthRMetres,
    β: δβ - earthBeta,
    λ: λSun % 360,
  };
}
