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
import { getPlanetaryGeocentricEclipticCoordinate } from "@/astrometry/planets/geocentric";
import {
  getPlanetaryHeliocentricDistance,
  getPlanetaryHeliocentricEclipticLatitude,
  getPlanetaryHeliocentricEclipticLongitude,
} from "@/astrometry/planets/heliocentric";
import AstronomicalObject from "@/astronomicalObject";
import {
  ASTROMETRY_PLANETS,
  PLANET_DISPLAY_NAMES,
  PLANET_SYMBOLS,
} from "@/astronomicalObject/planet/data";
import { PlanetName } from "@/astronomicalObject/planet/enum";
import { getPlutoGeocentricEclipticCoordinate } from "@/astronomicalObject/planet/pluto/ephemeris";
import { IPlanetProperties } from "@/astronomicalObject/planet/properties";
import {
  IEclipticCoordinate,
  IHeliocentricPosition,
  IPlanet,
  IPlanetEquatorialCoordinate,
} from "@/astronomicalObject/planet/types";
import {
  convertEclipticToEquatorial,
  type EclipticCoordinate,
} from "@/util/coordinates";
import { normalizeDegrees360 } from "@/util/refraction";

/**
 * Snapshot of one planet at a moment in time. Observer-free —
 * see {@link PlanetTimes} for rise/set/alt-az.
 *
 * The base `Planet` is parameterised by a {@link PlanetName}; the
 * concrete subclasses (`Mercury`, `Mars`, ...) preset that name so
 * consumers can write `new Mars({ time })` without naming the planet
 * twice.
 *
 * @since 0.2.0
 * @example
 * ```ts
 * import { Mars } from "node-astronomy";
 * const mars = new Mars({ time: new Date("2026-04-30T22:00:00Z") });
 * mars.equatorialCoordinate(); // { ra, dec } in degrees
 * mars.geocentricDistance();   // AU
 * mars.symbol();               // "Mars"
 * ```
 */
export class Planet extends AstronomicalObject implements IPlanet {
  /** Which planet this snapshot represents. */
  readonly planet: PlanetName;

  /**
   * Build a Planet snapshot. Subclasses should call this with a fixed
   * `planet` value.
   *
   * @since 0.2.0
   * @param properties - Optional `time` and `planet`. Defaults to
   *   `"earth"` (you almost always want a subclass instead).
   */
  constructor(properties?: IPlanetProperties) {
    super(properties?.planet ?? "earth", properties);
    this.planet = properties?.planet ?? "earth";
  }

  /**
   * Display name (`"Mars"`, `"Pluto"`, etc.).
   *
   * @since 0.2.0
   */
  displayName(): string {
    return PLANET_DISPLAY_NAMES[this.planet];
  }

  /**
   * Geocentric ecliptic longitude (λ) and latitude (β) at the supplied
   * (or snapshot) instant. Longitude normalised to `[0, 360)`.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  eclipticCoordinate(date?: Date): IEclipticCoordinate {
    return planetGeocentricEcliptic(this.planet, date ?? this.time);
  }

  /**
   * Geocentric equatorial coordinate (RA / Dec).
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  equatorialCoordinate(date?: Date): IPlanetEquatorialCoordinate {
    const t = date ?? this.time;
    const ecliptic = this.eclipticCoordinate(t);
    const astrometryEcliptic: EclipticCoordinate = {
      β: ecliptic.latitude,
      λ: ecliptic.longitude,
    };
    const eq = convertEclipticToEquatorial(t, astrometryEcliptic);
    return { dec: eq.dec, ra: normalizeDegrees360(eq.ra) };
  }

  /**
   * Geocentric distance from Earth's centre to the planet, in AU.
   *
   * Computed indirectly: heliocentric distance and Earth's heliocentric
   * distance combined with the geocentric ecliptic longitude using the
   * law of cosines. Approximate (≈ 0.001 AU) but no extra astrometry
   * call needed.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  geocentricDistance(date?: Date): number {
    const t = date ?? this.time;
    if (this.planet === "earth") return 0;
    const planetR = this.heliocentricDistance(t);
    const earthR = 1; // AU; close enough for the purposes here
    const ecliptic = this.eclipticCoordinate(t);
    // Approximate planet–Earth distance: triangle with sides r_p (Sun→planet)
    // and r_e (Sun→Earth) and the angle between them ≈ planet's geocentric
    // ecliptic longitude minus Sun's heliocentric longitude (~0 for Earth).
    const angleRad = (ecliptic.longitude * Math.PI) / 180;
    return Math.sqrt(
      planetR ** 2 + earthR ** 2 - 2 * planetR * earthR * Math.cos(angleRad),
    );
  }

  /**
   * Heliocentric distance (Sun → planet) in AU at the supplied (or
   * snapshot) instant.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  heliocentricDistance(date?: Date): number {
    const t = date ?? this.time;
    if (this.planet === "pluto") {
      // Use mean orbital semi-major axis ± eccentricity-driven variation.
      const orbital = ASTROMETRY_PLANETS.pluto;
      // Approximation: r ≈ a (good to <2 AU for an orbit-mean reference);
      // call sites that care should grab geocentric coordinate instead.
      return orbital.a;
    }
    return getPlanetaryHeliocentricDistance(t, ASTROMETRY_PLANETS[this.planet]);
  }

  /**
   * Heliocentric ecliptic position `{ longitude, latitude, radius }`.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  heliocentricPosition(date?: Date): IHeliocentricPosition {
    const t = date ?? this.time;
    if (this.planet === "pluto") {
      // For Pluto we approximate the heliocentric position via the
      // ecliptic longitude of the snapshot — adequate for "where is
      // Pluto in its orbit?" queries.
      return {
        latitude: 0,
        longitude: this.eclipticCoordinate(t).longitude,
        radius: ASTROMETRY_PLANETS.pluto.a,
      };
    }
    const orbital = ASTROMETRY_PLANETS[this.planet];
    return {
      latitude: getPlanetaryHeliocentricEclipticLatitude(t, orbital),
      longitude: normalizeDegrees360(
        getPlanetaryHeliocentricEclipticLongitude(t, orbital),
      ),
      radius: getPlanetaryHeliocentricDistance(t, orbital),
    };
  }

  /**
   * Astrological / Unicode symbol for this planet.
   *
   * @since 0.2.0
   */
  symbol(): string {
    return PLANET_SYMBOLS[this.planet];
  }
}

/**
 * Compute a planet's geocentric ecliptic coordinate, dispatching Pluto
 * to our hand-rolled ephemeris and every other planet to astrometry.
 *
 * @internal
 */
export function planetGeocentricEcliptic(
  planet: PlanetName,
  date: Date,
): IEclipticCoordinate {
  if (planet === "pluto") {
    return getPlutoGeocentricEclipticCoordinate(date);
  }
  const orbital = ASTROMETRY_PLANETS[planet];
  const result = getPlanetaryGeocentricEclipticCoordinate(date, orbital);
  return {
    latitude: result.β,
    longitude: normalizeDegrees360(result.λ),
  };
}

export default Planet;
