import { Interval, Twilight } from "@observerly/astrometry";

import { IAstronomicalObject } from "@/astronomicalObject";
import { TwilightExtended } from "@/astronomicalObject/sun/enum";
import { ITimeOfInterest } from "@/time/props";

export type ISun = ITimeOfInterest;

export type ISunProps = IAstronomicalObject;

export type ISunTimeResultProp = {
  from: string;
  seconds: number;
  to: string;
} | null;

export interface ISunTimes {
  /** Get Astronomical Dawn **/
  astronomicalDawn: () => ISunTimeResultProp;
  /** Get Astronomical Dusk **/
  astronomicalDusk: () => ISunTimeResultProp;
  /** Get Astronomical Dusk to Midnight **/
  astronomicalDuskToMidnight: () => ISunTimeResultProp;
  /** Get Civil Dawn **/
  civilDawn: () => ISunTimeResultProp;
  /** Get Civil Dusk **/
  civilDusk: () => ISunTimeResultProp;
  /** Get Day **/
  day: () => ISunTimeResultProp;
  /** Get Golden Hour (AM) **/
  goldenHourAM: () => ISunTimeResultProp;
  /** Get Golden Hour (PM) **/
  goldenHourPM: () => ISunTimeResultProp;
  /** Get Midnight Astronomical Dawn **/
  midnightToAstronomicalDawn: () => ISunTimeResultProp;
  /** Get Nautical Dawn **/
  nauticalDawn: () => ISunTimeResultProp;
  /** Get Nautical Dusk **/
  nauticalDusk: () => ISunTimeResultProp;
  /** Get Solar Noon **/
  solarNoon: () => null | string;
  /** Get Sunrise **/
  sunrise: () => ISunTimeResultProp;
  /** Get Sunset **/
  sunset: () => ISunTimeResultProp;
  time?: Date;
}

export type TTwilightBandExtended = {
  interval: Interval;
  name: Twilight | TwilightExtended;
};

export type TTwilightBlock = {
  interval: Interval;
  name: string;
  seconds: number;
};
