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
 * Planet geocentric ecliptic coordinate.
 *
 * Vendored from `@observerly/astrometry`'s `planets.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import { earth } from "@/astrometry/earth/orbit";
import { type PlanetOrbital } from "@/astrometry/planets/data";
import {
  getPlanetaryHeliocentricDistance,
  getPlanetaryHeliocentricEclipticLatitude,
  getPlanetaryHeliocentricEclipticLongitude,
} from "@/astrometry/planets/heliocentric";
import {
  radiansToDegrees as deg,
  degreesToRadians as rad,
} from "@/util/angles";
import { type EclipticCoordinate } from "@/util/coordinates";

/**
 * Planet geocentric ecliptic coordinate at `date`.
 *
 * Computes the planet's heliocentric position, Earth's heliocentric
 * position, and inverts to a geocentric apparent ecliptic coordinate.
 *
 * @since 0.2.0
 */
export function getPlanetaryGeocentricEclipticCoordinate(
  date: Date,
  planet: PlanetOrbital,
): EclipticCoordinate {
  const planetL = getPlanetaryHeliocentricEclipticLongitude(date, planet);
  const planetB = getPlanetaryHeliocentricEclipticLatitude(date, planet);
  const planetR = getPlanetaryHeliocentricDistance(date, planet);
  const Ω = planet.Ω ?? 0;
  const projection =
    Ω +
    deg(
      Math.atan2(
        Math.sin(rad(planetL - Ω)) * Math.cos(rad(planet.i)),
        Math.cos(rad(planetL - Ω)),
      ),
    );
  const earthL = getPlanetaryHeliocentricEclipticLongitude(date, earth);
  const earthR = getPlanetaryHeliocentricDistance(date, earth);

  const geocentricL: number = planet.isInferior
    ? 180 +
      earthL +
      deg(
        Math.atan2(
          planetR * Math.cos(rad(planetB)) * Math.sin(rad(earthL - projection)),
          earthR -
            planetR *
              Math.cos(rad(planetB)) *
              Math.cos(rad(earthL - projection)),
        ),
      )
    : projection +
      deg(
        Math.atan2(
          earthR * Math.sin(rad(projection - earthL)),
          planetR * Math.cos(rad(planetB)) -
            earthR * Math.sin(rad(earthL - projection)),
        ),
      );

  const geocentricB = deg(
    Math.atan(
      (planetR *
        Math.cos(rad(planetB)) *
        Math.tan(rad(planetB)) *
        Math.sin(rad(geocentricL - projection))) /
        (earthR * Math.sin(rad(projection - earthL))),
    ),
  );

  return {
    β: geocentricB,
    λ: geocentricL % 360,
  };
}
