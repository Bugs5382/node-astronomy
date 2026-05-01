import { IAstronomicalObject } from "@/astronomicalObject";

/**
 * Equatorial coordinate (right ascension + declination, both in degrees).
 *
 * @since 0.2.0
 */
export interface IEquatorialCoordinate {
  /** Declination in degrees, -90 to +90. */
  dec: number;
  /** Right ascension in degrees, 0–360. */
  ra: number;
}

/**
 * Alt/az horizontal coordinate at an observer's location and time.
 *
 * @since 0.2.0
 */
export interface IHorizontalCoordinate {
  /** Altitude in degrees above the horizon (negative when below). */
  altitude: number;
  /** Azimuth in degrees clockwise from north. */
  azimuth: number;
}

/**
 * Snapshot-level moon shape (no observer required).
 *
 * @since 0.2.0
 */
export type IMoon = IAstronomicalObject;

/**
 * Both geocentric and topocentric flavors of the moon's apparent
 * angular diameter at a given instant.
 *
 * Geocentric is what you'd see from Earth's centre; topocentric is what
 * an observer at the supplied lat/long/elevation actually sees. The
 * difference is small (≈ tens of arcseconds) but visible at horizon
 * altitudes — exposing both lets the consumer pick.
 *
 * @since 0.2.0
 */
export interface IMoonAngularDiameter {
  /** Geocentric apparent diameter in degrees. */
  geocentric: number;
  /** Topocentric apparent diameter in degrees, using the observer. */
  topocentric: number;
}

/**
 * Single sample point along an arc / track.
 *
 * @since 0.2.0
 */
export interface IMoonArcSample {
  /** Moon altitude in degrees above the horizon at this instant. */
  altitude: number;
  /** Moon azimuth in degrees clockwise from north at this instant. */
  azimuth: number;
  /** UTC instant of the sample. */
  date: Date;
}

/**
 * The "highest point of the visible arc" for a moon snapshot —
 * analogous to `SunTimes.solarNoon()`.
 *
 * @since 0.2.0
 */
export interface IMoonPeak {
  /** Altitude at the peak, degrees above horizon. */
  altitude: number;
  /** Azimuth at the peak, degrees clockwise from north. */
  azimuth: number;
  /** UTC instant of the peak. */
  date: Date;
  /** Same instant formatted as ISO-8601 in the snapshot's timezone. */
  dateTz: string;
}

/**
 * Result shape for one bounded interval (rise→set, peak window, etc.).
 * Mirrors `ISunTimeResultProperties` for API consistency. `undefined`
 * when the event doesn't occur (e.g. circumpolar body).
 *
 * @since 0.2.0
 */
export type IMoonTimeResultProperties =
  | {
      /** UTC instant of the start of the interval. */
      from: Date;
      /** Same instant formatted as ISO-8601 in the snapshot's timezone. */
      fromTz: string;
      /** Duration of the interval in seconds. */
      seconds: number;
      /** UTC instant of the end of the interval. */
      to: Date;
      /** Same instant formatted as ISO-8601 in the snapshot's timezone. */
      toTz: string;
    }
  | undefined;
