import { Interval, Twilight } from "@observerly/astrometry";

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
  /** Sun altitude (degrees above horizon) at the supplied instant. */
  altitudeAt: (date: Date) => number;
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
