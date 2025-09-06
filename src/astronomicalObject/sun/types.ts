import { IAstronomicalObject } from "@/astronomicalObject/astronomicalObject";
import { TwilightExtended } from "@/astronomicalObject/sun/enum";
import { ITimeOfInterest } from "@/time";
import { Interval, Twilight } from "@observerly/astrometry";

export type ISunProps = IAstronomicalObject;

export type ISun = ITimeOfInterest;

export type ISunTimeResultProp = { from: string; to: string, seconds: number } | null;

export interface ISunTimes extends ISun {
  // /** Get Astronomical Dawn **/
  astronomicalDawn: () => ISunTimeResultProp;
  // /** Get Nautical Dawn **/
  nauticalDawn: () => ISunTimeResultProp;
  // /** Get Civil Dawn **/
  // civilDawn: () => ISunTimeResultProp;
  // /** Get Sunrise Start **/
  // sunriseStart: () => ISunTimeResultProp;
  // /** Get Sunrise End **/
  // sunriseEnd: () => ISunTimeResultProp;
  // /** Get Solar Noon **/
  // solarNoon: () => ISunTimeResultProp;
  // /** Get Sunset Start **/
  // sunsetStart: () => ISunTimeResultProp;
  // /** Get Sunset End **/
  // sunsetEnd: () => ISunTimeResultProp;
  // /** Get Civil Dusk **/
  // civilDusk: () => ISunTimeResultProp;
  // /** Get Nautical Dusk **/
  // nauticalDusk: () => ISunTimeResultProp;
  // /** Get Astronomical Dusk **/
  // astronomicalDusk: () => ISunTimeResultProp;
}

export type TwilightBandExtended = {
  name: Twilight | TwilightExtended;
  interval: Interval;
};

export type TwilightBlock = {
  name: string;
  interval: Interval;
  seconds: number;
};
