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
