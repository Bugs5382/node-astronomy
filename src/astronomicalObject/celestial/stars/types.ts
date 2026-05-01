import { IAstronomicalObject } from "@/astronomicalObject";

/**
 * Snapshot-level star shape.
 *
 * @since 0.2.0
 */
export type IStar = IAstronomicalObject;

/**
 * Single sample point along a star's track.
 *
 * @since 0.2.0
 */
export interface IStarArcSample {
  /** Altitude in degrees above the horizon. */
  altitude: number;
  /** Azimuth in degrees clockwise from north. */
  azimuth: number;
  /** UTC instant of the sample. */
  date: Date;
}

/**
 * One entry in the curated named-stars catalog.
 *
 * @since 0.2.0
 */
export interface IStarCatalogEntry {
  /** Bayer designation, e.g. `"α UMi"`. */
  bayer: string;
  /** IAU constellation the star belongs to. */
  constellation: string;
  /** Declination in decimal degrees, J2000. */
  decDeg: number;
  /** Hipparcos catalog number. */
  hip: number;
  /** IAU-recognised name, when available. */
  iauName: string;
  /** Apparent visual magnitude. */
  magnitude: number;
  /** Common name (also used as the lookup key). */
  name: string;
  /** Right ascension in decimal degrees, J2000. */
  raDeg: number;
  /** Spectral classification. */
  spectralClass: string;
}

/**
 * Equatorial coordinate (RA + Dec, degrees).
 *
 * @since 0.2.0
 */
export interface IStarEquatorialCoordinate {
  /** Declination in degrees, `[-90, 90]`. */
  dec: number;
  /** Right ascension in degrees, `[0, 360)`. */
  ra: number;
}

/**
 * Result of a rise/set query.
 *
 * @since 0.2.0
 */
export type IStarTimeResultProperties =
  | {
      /** UTC instant of the event. */
      from: Date;
      /** Same instant formatted in the snapshot's timezone. */
      fromTz: string;
      /** Seconds between the snapshot anchor and the event. */
      seconds: number;
      /** Same as `from` (kept for `ISunTimeResultProperties` parity). */
      to: Date;
      /** Same as `fromTz`. */
      toTz: string;
    }
  | undefined;
