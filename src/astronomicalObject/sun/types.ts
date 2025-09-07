import { IAstronomicalObject } from "@/astronomicalObject";
import { TwilightExtended } from "@/astronomicalObject/sun/enum";
import { ITimeOfInterest } from "@/time/props";
import { Interval, Twilight } from "@observerly/astrometry";

export type ISunProps = IAstronomicalObject;

export type ISun = ITimeOfInterest;

export type ISunTimeResultProp = {
  from: string;
  to: string;
  seconds: number;
} | null;

export interface ISunTimes {
  time?: Date;
  /** Get Midnight Astronomical Dawn **/
  midnightToAstronomicalDawn: () => ISunTimeResultProp;
  /** Get Astronomical Dawn **/
  astronomicalDawn: () => ISunTimeResultProp;
  /** Get Nautical Dawn **/
  nauticalDawn: () => ISunTimeResultProp;
  /** Get Civil Dawn **/
  civilDawn: () => ISunTimeResultProp;
  /** Get Sunrise **/
  sunrise: () => ISunTimeResultProp;
  /** Get Golden Hour (AM) **/
  goldenHourAM: () => ISunTimeResultProp;
  /** Get Day **/
  day: () => ISunTimeResultProp;
  /** Get Golden Hour (PM) **/
  goldenHourPM: () => ISunTimeResultProp;
  /** Get Solar Noon **/
  solarNoon: () => string | null;
  /** Get Sunset **/
  sunset: () => ISunTimeResultProp;
  /** Get Civil Dusk **/
  civilDusk: () => ISunTimeResultProp;
  /** Get Nautical Dusk **/
  nauticalDusk: () => ISunTimeResultProp;
  /** Get Astronomical Dusk **/
  astronomicalDusk: () => ISunTimeResultProp;
  /** Get Astronomical Dusk to Midnight **/
  astronomicalDuskToMidnight: () => ISunTimeResultProp;
}

export type TTwilightBandExtended = {
  name: Twilight | TwilightExtended;
  interval: Interval;
};

export type TTwilightBlock = {
  name: string;
  interval: Interval;
  seconds: number;
};
