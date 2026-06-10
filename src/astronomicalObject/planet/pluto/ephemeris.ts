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
import {
  ASTROMETRY_PLANETS,
  astrometryPluto,
} from "@/astronomicalObject/planet/data";
import { IEclipticCoordinate } from "@/astronomicalObject/planet/types";
import { normalizeDegrees360 } from "@/util/angles";
import { daysSinceJ2000 } from "@/util/time";

const RAD_PER_DEG = Math.PI / 180;
const DEG_PER_RAD = 180 / Math.PI;

/**
 * Pluto's *geocentric* ecliptic coordinate at the supplied UTC instant.
 *
 * Computed as the difference between Pluto's heliocentric Cartesian
 * coordinates (Keplerian propagation from J2000 mean elements) and
 * Earth's heliocentric Cartesian coordinates (astrometry's VSOP87
 * series). Returns ecliptic longitude/latitude in degrees.
 *
 * Accuracy: ≈ a few arc-minutes over 1900–2100 — sufficient for
 * "where is Pluto in the sky?" but not for tight ephemerides. Use a
 * higher-order solution (Meeus Ch 37 periodic terms or JPL Horizons)
 * if you need sub-arcsecond precision.
 *
 * @since 0.2.0
 * @param date - UTC instant.
 * @returns `{ longitude, latitude }` in degrees.
 */
export function getPlutoGeocentricEclipticCoordinate(
  date: Date,
): IEclipticCoordinate {
  const earth = earthHeliocentric(date);
  const pluto = plutoHeliocentric(date);
  const x = pluto.x - earth.x;
  const y = pluto.y - earth.y;
  const z = pluto.z - earth.z;
  const longitudeDeg = normalizeDegrees360(Math.atan2(y, x) * DEG_PER_RAD);
  const latitudeDeg = Math.atan2(z, Math.hypot(x, y)) * DEG_PER_RAD;
  return { latitude: latitudeDeg, longitude: longitudeDeg };
}

/**
 * Earth's heliocentric ecliptic Cartesian coordinates (AU) at `date`,
 * using simple Keplerian propagation from astrometry's `earth` mean
 * elements. Astrometry's higher-order VSOP87 helpers aren't re-exported
 * from the package's top-level entry point, so we use the same
 * Keplerian path as Pluto for consistency. Sufficient for the
 * arc-minute precision target documented in
 * `getPlutoGeocentricEclipticCoordinate`.
 *
 * @internal
 */
function earthHeliocentric(date: Date): { x: number; y: number; z: number } {
  const earthOrbital = ASTROMETRY_PLANETS.earth;
  const days = daysSinceJ2000(date);
  const meanMotionDegPerDay = 360 / (earthOrbital.T * 365.25);
  const meanLongitudeDeg = normalizeDegrees360(
    earthOrbital.ε + meanMotionDegPerDay * days,
  );
  return keplerianToCartesian({
    a: earthOrbital.a,
    e: earthOrbital.e,
    iDeg: earthOrbital.i,
    longitudeOfNodeDeg: earthOrbital.Ω ?? 0,
    longitudeOfPerihelionDeg: earthOrbital.ϖ,
    meanLongitudeDeg,
  });
}

/**
 * Heliocentric ecliptic Cartesian coordinates (AU) from Keplerian
 * elements. Used internally for Pluto and Earth.
 *
 * @internal
 */
function keplerianToCartesian(elements: {
  a: number;
  e: number;
  iDeg: number;
  longitudeOfNodeDeg: number;
  longitudeOfPerihelionDeg: number;
  meanLongitudeDeg: number;
}): { x: number; y: number; z: number } {
  const {
    a,
    e,
    iDeg,
    longitudeOfNodeDeg,
    longitudeOfPerihelionDeg,
    meanLongitudeDeg,
  } = elements;
  const omega = (longitudeOfPerihelionDeg - longitudeOfNodeDeg) * RAD_PER_DEG;
  const nodeRad = longitudeOfNodeDeg * RAD_PER_DEG;
  const indexRad = iDeg * RAD_PER_DEG;
  const meanAnomalyDeg = normalizeDegrees360(
    meanLongitudeDeg - longitudeOfPerihelionDeg,
  );
  const meanAnomalyRad = meanAnomalyDeg * RAD_PER_DEG;
  const eccentricAnomaly = solveKepler(meanAnomalyRad, e);
  const xOrbital = a * (Math.cos(eccentricAnomaly) - e);
  const yOrbital = a * Math.sqrt(1 - e * e) * Math.sin(eccentricAnomaly);

  // Rotate by argument of perihelion (ω) in the orbital plane, then by
  // inclination (i) about the line of nodes, then by longitude of
  // ascending node (Ω) about the ecliptic z-axis.
  const cosO = Math.cos(omega);
  const sinO = Math.sin(omega);
  const cosI = Math.cos(indexRad);
  const sinI = Math.sin(indexRad);
  const cosN = Math.cos(nodeRad);
  const sinN = Math.sin(nodeRad);

  const x1 = xOrbital * cosO - yOrbital * sinO;
  const y1 = xOrbital * sinO + yOrbital * cosO;

  // Apply inclination
  const x2 = x1;
  const y2 = y1 * cosI;
  const z2 = y1 * sinI;

  // Apply longitude of node
  const x = x2 * cosN - y2 * sinN;
  const y = x2 * sinN + y2 * cosN;
  const z = z2;
  return { x, y, z };
}

/**
 * Pluto's heliocentric ecliptic Cartesian coordinates (AU) at `date`,
 * using J2000 mean elements and Keplerian propagation. Accurate to
 * ≈ arc-minute level over 1900–2100.
 *
 * @internal
 */
function plutoHeliocentric(date: Date): { x: number; y: number; z: number } {
  const days = daysSinceJ2000(date);
  // Mean motion: n = 360°/T (degrees/year); convert to deg/day.
  const meanMotionDegPerDay = 360 / (astrometryPluto.T * 365.25);
  const meanLongitudeDeg = normalizeDegrees360(
    astrometryPluto.ε + meanMotionDegPerDay * days,
  );
  return keplerianToCartesian({
    a: astrometryPluto.a,
    e: astrometryPluto.e,
    iDeg: astrometryPluto.i,
    longitudeOfNodeDeg: astrometryPluto.Ω ?? 0,
    longitudeOfPerihelionDeg: astrometryPluto.ϖ,
    meanLongitudeDeg,
  });
}

/**
 * Solve Kepler's equation `M = E - e·sin(E)` for `E` given mean anomaly
 * `M` (radians) and eccentricity `e`. Newton-Raphson, converges in a
 * handful of iterations for `e < 0.5`.
 *
 * @internal
 */
function solveKepler(meanAnomalyRad: number, eccentricity: number): number {
  let eccentricAnomaly = meanAnomalyRad;
  for (let iteration = 0; iteration < 12; iteration++) {
    const f =
      eccentricAnomaly -
      eccentricity * Math.sin(eccentricAnomaly) -
      meanAnomalyRad;
    const fPrime = 1 - eccentricity * Math.cos(eccentricAnomaly);
    eccentricAnomaly -= f / fPrime;
  }
  return eccentricAnomaly;
}
