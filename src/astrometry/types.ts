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
