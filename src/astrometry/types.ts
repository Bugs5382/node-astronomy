/**
 * Shared astronomy types used by the internal astrometry layer.
 *
 * MIT-attribution: function shapes and conventions match the original
 * `@observerly/astrometry` package (Copyright © 2021-2023 observerly,
 * MIT licensed). See NOTICE for details.
 *
 * @since 0.2.0
 */

export type {
  EclipticCoordinate,
  EquatorialCoordinate,
  GeographicCoordinate,
  HorizontalCoordinate,
} from "@/util/coordinates";

/**
 * Astronomical twilight band for the sun's altitude relative to the
 * horizon. Values match the strings used by upstream consumers and by
 * the public `TwilightExtended` enum.
 *
 * @since 0.2.0
 */
export enum Twilight {
  Astronomical = "Astronomical",
  Civil = "Civil",
  Day = "Day",
  Nautical = "Nautical",
  Night = "Night",
}

/**
 * A closed time interval `[from, to]`.
 *
 * @since 0.2.0
 */
export interface Interval {
  from: Date;
  to: Date;
}

/**
 * Result of a successful rise/set search.
 *
 * @since 0.2.0
 */
export interface TransitInstance {
  /** Azimuth of the body at the moment of the event, degrees. */
  az: number;
  /** UTC instant of the event. */
  datetime: Date;
  /** Greenwich Sidereal Time of the event, decimal hours `[0, 24)`. */
  GST: number;
  /** Local Sidereal Time of the event, decimal hours `[0, 24)`. */
  LST: number;
}
