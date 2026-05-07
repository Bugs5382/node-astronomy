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
