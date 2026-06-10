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
 * Coordinate-system transforms (ecliptic ↔ equatorial ↔ horizontal).
 *
 * Formulas follow Meeus (1998) and the conventions used internally by
 * the original `@observerly/astrometry` implementation, ported here
 * with no external dependencies.
 *
 * @since 0.2.0
 */

import {
  radiansToDegrees as deg,
  normalizeDegrees360,
  degreesToRadians as rad,
} from "@/util/angles";
import {
  EARTH_RADIUS,
  getHourAngle,
  getLocalSiderealTime,
  getObliquityOfTheEcliptic,
} from "@/util/time";

/**
 * Ecliptic coordinate (longitude λ / latitude β, degrees).
 *
 * @since 0.2.0
 */
export interface EclipticCoordinate {
  /** Ecliptic latitude in degrees, `[-90, 90]`. */
  β: number;
  /** Ecliptic longitude in degrees, `[0, 360)`. */
  λ: number;
}

/**
 * Equatorial coordinate (right ascension / declination, degrees).
 *
 * @since 0.2.0
 */
export interface EquatorialCoordinate {
  /** Declination in degrees, `[-90, 90]`. */
  dec: number;
  /** Optional geocentric distance in metres (used for parallax). */
  distance?: number;
  /** Right ascension in degrees, `[0, 360)`. */
  ra: number;
}

/**
 * Geographic coordinate of a surface observer.
 *
 * @since 0.2.0
 */
export interface GeographicCoordinate {
  /** Optional elevation above sea level in metres. */
  elevation?: number;
  /** Latitude in decimal degrees, north positive. */
  latitude: number;
  /** Longitude in decimal degrees, east positive. */
  longitude: number;
}

/**
 * Horizontal coordinate (altitude / azimuth, degrees).
 *
 * @since 0.2.0
 */
export interface HorizontalCoordinate {
  /** Altitude in degrees above the horizon. */
  alt: number;
  /** Azimuth in degrees clockwise from north. */
  az: number;
}

/**
 * Convert an ecliptic coordinate to equatorial.
 *
 * Standard rotation by the mean obliquity ε at `date`. Returns RA in
 * `[0, 360)` and declination in `[-90, 90]`.
 *
 * @since 0.2.0
 */
export function convertEclipticToEquatorial(
  date: Date,
  ecliptic: EclipticCoordinate,
): EquatorialCoordinate {
  const εRad = rad(getObliquityOfTheEcliptic(date));
  const λRad = rad(ecliptic.λ);
  const βRad = rad(ecliptic.β);
  const raRad = Math.atan2(
    Math.sin(λRad) * Math.cos(εRad) - Math.tan(βRad) * Math.sin(εRad),
    Math.cos(λRad),
  );
  const decRad = Math.asin(
    Math.sin(βRad) * Math.cos(εRad) +
      Math.cos(βRad) * Math.sin(εRad) * Math.sin(λRad),
  );
  const ra = deg(raRad);
  return {
    dec: deg(decRad),
    ra: ra < 0 ? ra + 360 : ra,
  };
}

/**
 * Convert an equatorial coordinate to topocentric horizontal (alt/az)
 * for a given observer at a given instant.
 *
 * Includes a parallax correction when `target.distance` is supplied
 * (metres). For typical sun/moon/planet/star call-sites where distance
 * is not provided, the parallax term is zero and the result is
 * effectively geocentric alt/az.
 *
 * Special case: at the geographic poles (`cos(latitude) === 0`) the
 * azimuth is undefined; this function returns `{ alt: -1, az: -1 }` to
 * signal that condition rather than emitting NaN.
 *
 * @since 0.2.0
 */
export function convertEquatorialToHorizontal(
  date: Date,
  observer: GeographicCoordinate,
  target: EquatorialCoordinate,
): HorizontalCoordinate {
  const { elevation = 0, latitude, longitude } = observer;
  const decRad = rad(target.dec);
  const latRad = rad(latitude);

  if (Math.cos(latRad) === 0) {
    return { alt: -1, az: -1 };
  }

  const haRad = rad(getHourAngle(date, longitude, target.ra));

  const sinAlt = Math.max(
    -1,
    Math.min(
      1,
      Math.sin(decRad) * Math.sin(latRad) +
        Math.cos(decRad) * Math.cos(latRad) * Math.cos(haRad),
    ),
  );
  const altRad = Math.asin(sinAlt);

  const cosAz = Math.max(
    -1,
    Math.min(
      1,
      (Math.sin(decRad) - Math.sin(latRad) * sinAlt) /
        (Math.cos(latRad) * Math.cos(altRad)),
    ),
  );
  const azRad = Math.acos(cosAz);

  // Parallax correction (geocentric → topocentric) using a small-angle
  // approximation about the local horizontal frame. Active only when a
  // geocentric distance is provided.
  let parallax = 0;
  if (target.distance !== undefined && target.distance > 0) {
    parallax = EARTH_RADIUS / target.distance;
  }
  const parallaxAlt = parallax * Math.cos(altRad) * Math.cos(azRad);
  const parallaxAz = (-parallax * Math.sin(azRad)) / Math.cos(altRad);

  // Elevation refraction kludge inherited from upstream: adds
  // sqrt(2·elev/R) (radians) to the geometric altitude before parallax
  // is mixed in. For sea-level observers (elevation = 0) this is a
  // no-op; otherwise it nudges the apparent altitude up by the
  // dip-of-horizon angle.
  const altDeg = deg(altRad + Math.sqrt((2 * elevation) / EARTH_RADIUS));

  // Azimuth quadrant resolution: acos returns `[0, π]`, so use the sign
  // of sin(HA) to pick the correct half of the compass.
  const azBase = deg(azRad + parallaxAz);
  const az = Math.sin(haRad) > 0 ? 360 - azBase : azBase;

  return {
    alt: altDeg + parallaxAlt,
    az,
  };
}

/**
 * Convert a horizontal coordinate to equatorial for a given observer at
 * a given instant. Inverse of {@link convertEquatorialToHorizontal} for
 * geocentric input (no parallax correction).
 *
 * @since 0.2.0
 */
export function convertHorizontalToEquatorial(
  date: Date,
  observer: GeographicCoordinate,
  horizontal: HorizontalCoordinate,
): EquatorialCoordinate {
  const { latitude, longitude } = observer;
  const altRad = rad(horizontal.alt);
  const azRad = rad(horizontal.az);
  const latRad = rad(latitude);
  const decRad = Math.asin(
    Math.sin(latRad) * Math.sin(altRad) +
      Math.cos(latRad) * Math.cos(altRad) * Math.cos(azRad),
  );
  let haRad = Math.atan2(
    (-Math.sin(azRad) * Math.cos(altRad)) / Math.cos(decRad),
    (Math.sin(altRad) - Math.sin(latRad) * Math.sin(decRad)) /
      (Math.cos(latRad) * Math.cos(decRad)),
  );
  if (haRad < 0) haRad += 2 * Math.PI;
  let raDeg = getLocalSiderealTime(date, longitude) * 15 - deg(haRad);
  if (raDeg < 0) raDeg += 360;
  return {
    dec: deg(decRad),
    ra: normalizeDegrees360(raDeg),
  };
}
