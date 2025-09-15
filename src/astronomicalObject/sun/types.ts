import { Interval, Twilight } from "@observerly/astrometry";

import { IAstronomicalObject } from "@/astronomicalObject";
import { TwilightExtended } from "@/astronomicalObject/sun/enum";
import { ITimeOfInterest } from "@/time/properties";

export type ISun = ITimeOfInterest;

export type ISunProperties = IAstronomicalObject;

export type ISunTimeResultProperties =
  | {
      from: Date;
      fromTz: string;
      seconds: number;
      to: Date;
      toTz: string;
    }
  | undefined;

export interface ISunTimes {
  /** Get Astronomical Dawn **/
  astronomicalDawn: () => ISunTimeResultProperties;
  /** Get Astronomical Dusk **/
  astronomicalDusk: () => ISunTimeResultProperties;
  /** Get Astronomical Dusk to Midnight **/
  astronomicalDuskToMidnight: () => ISunTimeResultProperties;
  /** Get Civil Dawn **/
  civilDawn: () => ISunTimeResultProperties;
  /** Get Civil Dusk **/
  civilDusk: () => ISunTimeResultProperties;
  /** Get Day **/
  day: () => ISunTimeResultProperties;
  /** Get Golden Hour (AM) **/
  goldenHourAM: () => ISunTimeResultProperties;
  /** Get Golden Hour (PM) **/
  goldenHourPM: () => ISunTimeResultProperties;
  /** Get Midnight Astronomical Dawn **/
  midnightToAstronomicalDawn: () => ISunTimeResultProperties;
  /** Get Nautical Dawn **/
  nauticalDawn: () => ISunTimeResultProperties;
  /** Get Nautical Dusk **/
  nauticalDusk: () => ISunTimeResultProperties;
  /** Get Solar Noon **/
  solarNoon: () => TSolarNoon | undefined;
  /** Get Sunrise **/
  sunrise: () => ISunTimeResultProperties;
  /** Get Sunset **/
  sunset: () => ISunTimeResultProperties;
  /** The time we want to do the calculations. */
  time?: Date;
}

export type TConverted = {
  interval: { from: Date; fromTz: Date; to: Date; toTz: Date };
  name: Twilight | TwilightExtended;
};

export type TSolarNoon = {
  date: Date;
  dateTz: string;
};

export type TTwilightBandExtended = {
  interval: Interval;
  name: Twilight | TwilightExtended;
};

export type TTwilightBlock = {
  interval: Interval;
  name: string;
  seconds: number;
};
