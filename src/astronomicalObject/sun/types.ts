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
import { Interval, Twilight } from "@/astrometry/types";
import { IAstronomicalObject } from "@/astronomicalObject";
import { TwilightExtended } from "@/astronomicalObject/sun/enum";
import { ITimeOfInterest } from "@/time/properties";

export type ISun = ITimeOfInterest;

export interface ISunPosition {
  /** Sun altitude in degrees above the horizon (negative when below). */
  altitude: number;
  /** Sun azimuth in degrees clockwise from north. */
  azimuth: number;
}

export type ISunProperties = IAstronomicalObject;

export type ISunTimeResultProperties =
  | {
      /** The date the result starts. */
      from: Date;
      /** The date the result starts in local timezone format. */
      fromTz: string;
      /** How many total seconds in the frame. */
      seconds: number;
      /** The date the result ends. */
      to: Date;
      /** The date the result ends in local timezone format. */
      toTz: string;
    }
  | undefined;

export interface ISunTimes {
  /** Sun altitude (geometric, degrees above horizon) at the supplied instant. */
  altitudeAt: (date: Date) => number;
  /**
   * Sun apparent altitude (geometric altitude plus atmospheric-refraction
   * correction, degrees above horizon) at the supplied instant.
   * @since 0.2.0
   */
  apparentAltitudeAt: (date: Date) => number;
  /** Get Astronomical Dawn */
  astronomicalDawn: () => ISunTimeResultProperties;
  /** Get Astronomical Dusk */
  astronomicalDusk: () => ISunTimeResultProperties;
  /** Get Astronomical Dusk to Midnight */
  astronomicalDuskToMidnight: () => ISunTimeResultProperties;
  /** Sun azimuth (degrees clockwise from north) at the supplied instant. */
  azimuthAt: (date: Date) => number;
  /** Get Civil Dawn */
  civilDawn: () => ISunTimeResultProperties;
  /** Get Civil Dusk */
  civilDusk: () => ISunTimeResultProperties;
  /** True when the supplied instant falls within this snapshot's civil day. */
  coversDate: (date: Date) => boolean;
  /** Get Day */
  day: () => ISunTimeResultProperties;
  /** Get Golden Hour (AM) */
  goldenHourAM: () => ISunTimeResultProperties;
  /** Get Golden Hour (PM) */
  goldenHourPM: () => ISunTimeResultProperties;
  /** Get Midnight Astronomical Dawn */
  midnightToAstronomicalDawn: () => ISunTimeResultProperties;
  /** Get Nautical Dawn */
  nauticalDawn: () => ISunTimeResultProperties;
  /** Get Nautical Dusk */
  nauticalDusk: () => ISunTimeResultProperties;
  /**
   * Set when the snapshot's civil day falls in midnight-sun or polar-night.
   * `undefined` for normal days that have at least one sunrise/sunset
   * transition. See {@link TPolarRegion} for the contract.
   * @since 0.2.0
   */
  polarRegion?: TPolarRegion;
  /** Sun altitude and azimuth at the supplied instant. */
  positionAt: (date: Date) => ISunPosition;
  /** Get Solar Noon */
  solarNoon: () => TSolarNoon | undefined;
  /** Get Sunrise */
  sunrise: () => ISunTimeResultProperties;
  /** Get Sunset */
  sunset: () => ISunTimeResultProperties;
  /** The time we want to do the calculations. */
  time?: Date;
}

export type TConverted = {
  /** Getting the raw times (from and to) of each sun time.  */
  interval: { from: Date; fromTz: Date; to: Date; toTz: Date };
  name: Twilight | TwilightExtended;
};

/**
 * Indicates that the snapshot's civil day is in a polar regime where the
 * sun never crosses the horizon.
 *
 * - `"midnight-sun"` — the sun stays above the horizon for the entire local
 *   day. There is no sunrise, no sunset, and the time blocks have no
 *   `Night`/twilight bands. `solarNoon()` is still meaningful (the
 *   meridian-crossing time) and is still returned.
 * - `"polar-night"` — the sun stays below the horizon for the entire local
 *   day. There is no sunrise, no sunset, and no `Day` band. `solarNoon()`
 *   still returns the meridian-crossing time (when the sun is *least*
 *   below the horizon).
 *
 * @since 0.2.0
 */
export type TPolarRegion = "midnight-sun" | "polar-night";

export type TSolarNoon = {
  /** The time of solar noon. */
  date: Date;
  /** The time of solar noon in local timezone format. */
  dateTz: string;
};

export type TTwilightBandExtended = {
  /** Getting the raw times (from and to) of each sun time.  */
  interval: Interval;
  /** It's an internal name.  */
  name: Twilight | TwilightExtended;
};

export type TTwilightBlock = {
  /** Getting the raw times (from and to) of each sun time.  */
  interval: Interval;
  /** It's an internal name.  */
  name: string;
  /** How many seconds for this block. */
  seconds: number;
};
