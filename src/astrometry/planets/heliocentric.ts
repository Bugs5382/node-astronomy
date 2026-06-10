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
 * Planet heliocentric ecliptic helpers.
 *
 * Vendored from `@observerly/astrometry`'s `planets.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import { getPlanetaryTrueAnomaly } from "@/astrometry/planets/anomaly";
import { type PlanetOrbital } from "@/astrometry/planets/data";
import {
  radiansToDegrees as deg,
  degreesToRadians as rad,
} from "@/util/angles";

/**
 * Planet heliocentric distance at `date`, AU.
 *
 * @since 0.2.0
 */
export function getPlanetaryHeliocentricDistance(
  date: Date,
  planet: PlanetOrbital,
): number {
  const v = getPlanetaryTrueAnomaly(date, planet);
  return (planet.a * (1 - planet.e ** 2)) / (1 + planet.e * Math.cos(rad(v)));
}

/**
 * Planet heliocentric ecliptic latitude at `date`, degrees.
 *
 * @since 0.2.0
 */
export function getPlanetaryHeliocentricEclipticLatitude(
  date: Date,
  planet: PlanetOrbital,
): number {
  const L = getPlanetaryHeliocentricEclipticLongitude(date, planet);
  const Ω = planet.Ω ?? 0;
  return deg(Math.asin(Math.sin(rad(L - Ω)) * Math.sin(rad(planet.i)))) % 360;
}

/**
 * Planet heliocentric ecliptic longitude at `date`, degrees.
 *
 * @since 0.2.0
 */
export function getPlanetaryHeliocentricEclipticLongitude(
  date: Date,
  planet: PlanetOrbital,
): number {
  const v = getPlanetaryTrueAnomaly(date, planet);
  return (v + planet.ϖ) % 360;
}
