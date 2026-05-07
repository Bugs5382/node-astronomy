/**
 * Planet mean-element propagator: mean anomaly, equation of centre,
 * true anomaly.
 *
 * Vendored from `@observerly/astrometry`'s `planets.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import { type PlanetOrbital } from "@/astrometry/planets/data";
import { degreesToRadians as rad } from "@/util/angles";
import { daysSinceJ2000 } from "@/util/time";

/**
 * Planet equation of centre at `date`, degrees.
 *
 * @since 0.2.0
 */
export function getPlanetaryEquationOfCenter(
  date: Date,
  planet: PlanetOrbital,
): number {
  const M = getPlanetaryMeanAnomaly(date, planet);
  return (360 / Math.PI) * planet.e * Math.sin(rad(M));
}

/**
 * Planet mean anomaly at `date`, degrees `[0, 360)`.
 *
 * Uses the simplified `daysSinceJ2000 / SOLAR_TROPICAL_YEAR / T` mean-
 * motion form astrometry vendors. Adequate for arc-minute precision
 * across centuries near J2000.
 *
 * @since 0.2.0
 */
export function getPlanetaryMeanAnomaly(
  date: Date,
  planet: PlanetOrbital,
): number {
  const days = daysSinceJ2000(date);
  let M = ((360 / 365.242_191) * (days / planet.T) + planet.ε - planet.ϖ) % 360;
  if (M < 0) M += 360;
  return M;
}

/**
 * Planet true anomaly at `date`, degrees.
 *
 * @since 0.2.0
 */
export function getPlanetaryTrueAnomaly(
  date: Date,
  planet: PlanetOrbital,
): number {
  const M = getPlanetaryMeanAnomaly(date, planet);
  const C = getPlanetaryEquationOfCenter(date, planet);
  return (M + C) % 360;
}
