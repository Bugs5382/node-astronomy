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
import { IAstronomicalObject } from "@/astronomicalObject";

/**
 * Ecliptic coordinate (geocentric ecliptic longitude + latitude, degrees).
 *
 * @since 0.2.0
 */
export interface IEclipticCoordinate {
  /** Ecliptic latitude (β) in degrees, in `[-90, 90]`. */
  latitude: number;
  /** Ecliptic longitude (λ) in degrees, normalised to `[0, 360)`. */
  longitude: number;
}

/**
 * Heliocentric position (longitude, latitude in degrees; radius in AU).
 *
 * @since 0.2.0
 */
export interface IHeliocentricPosition {
  /** Heliocentric ecliptic latitude in degrees. */
  latitude: number;
  /** Heliocentric ecliptic longitude in degrees, in `[0, 360)`. */
  longitude: number;
  /** Heliocentric distance in AU. */
  radius: number;
}

/**
 * Snapshot-level planet shape.
 *
 * @since 0.2.0
 */
export type IPlanet = IAstronomicalObject;

/**
 * Single sample point along a planet's nightly arc.
 *
 * @since 0.2.0
 */
export interface IPlanetArcSample {
  /** Altitude in degrees above the horizon at this instant. */
  altitude: number;
  /** Azimuth in degrees clockwise from north at this instant. */
  azimuth: number;
  /** UTC instant of the sample. */
  date: Date;
}

/**
 * Equatorial coordinate (RA + Dec, degrees).
 *
 * @since 0.2.0
 */
export interface IPlanetEquatorialCoordinate {
  /** Declination in degrees, in `[-90, 90]`. */
  dec: number;
  /** Right ascension in degrees, normalised to `[0, 360)`. */
  ra: number;
}

/**
 * Highest-altitude sample of a planet's currently visible arc.
 *
 * @since 0.2.0
 */
export interface IPlanetPeak {
  /** Altitude at the peak in degrees. */
  altitude: number;
  /** Azimuth at the peak in degrees. */
  azimuth: number;
  /** UTC instant of the peak. */
  date: Date;
  /** Same instant formatted in the snapshot's timezone. */
  dateTz: string;
}

/**
 * Result for a rise / set event.
 *
 * @since 0.2.0
 */
export type IPlanetTimeResultProperties =
  | {
      /** UTC instant of the event. */
      from: Date;
      /** Same instant formatted as ISO-8601 in the snapshot's timezone. */
      fromTz: string;
      /** Seconds between the snapshot anchor and the event. */
      seconds: number;
      /** Same instant — provided for parity with `ISunTimeResultProperties`. */
      to: Date;
      /** Same as `fromTz`. */
      toTz: string;
    }
  | undefined;
