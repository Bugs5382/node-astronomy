import { IAstronomicalObject } from "@/astronomicalObject/astronomicalObject";
import { ITimeOfInterest } from "@/time";

export type ISunProps = IAstronomicalObject;

export type ISun = ITimeOfInterest;

export type Radian = number;
export type Degrees = number;

export interface ISunBaseAngles {
  astronomicalDawn: Radian;
  nauticalDawn: Radian;
  civilDawn: Radian;
  sunriseStart: Radian;
  sunriseEnd: Radian;
  solarNoon: Radian;
  sunsetStart: Radian;
  sunsetEnd: Radian;
  civilDusk: Radian;
  nauticalDusk: Radian;
  astronomicalDusk: Radian;
}

export interface ISunBaseDegrees {
  astronomicalDawn: Degrees;
  nauticalDawn: Degrees;
  civilDawn: Degrees;
  sunriseStart: Degrees;
  sunriseEnd: Degrees;
  solarNoon: Degrees;
  sunsetStart: Degrees;
  sunsetEnd: Degrees;
  civilDusk: Degrees;
  nauticalDusk: Degrees;
  astronomicalDusk: Degrees;
}

export type ISunTimeResultProp = {
  start: Date | null;
  end: Date | null;
  startClean: string;
  endClean: string;
};

export interface ISunTimesResult {
  astronomicalDawn: ISunTimeResultProp;
  nauticalDawn: ISunTimeResultProp;
  civilDawn: ISunTimeResultProp;
  sunriseStart: ISunTimeResultProp;
  sunriseEnd: ISunTimeResultProp;
  solarNoon: ISunTimeResultProp;
  sunsetStart: ISunTimeResultProp;
  sunsetEnd: ISunTimeResultProp;
  civilDusk: ISunTimeResultProp;
  nauticalDusk: ISunTimeResultProp;
  astronomicalDusk?: ISunTimeResultProp;
}

export interface ISunTimesProps extends ISunProps {
  angles?: ISunBaseAngles;
  latitude: number;
  longitude: number;
  timezone?: string;
  refraction?: number;
}

export interface ISunTimes extends ISun {
  degrees: ISunBaseDegrees;
  /** */
  allTimes: () => ISunTimesResult;
  /** Get Astronomical Dawn **/
  astronomicalDawn: () => ISunTimeResultProp;
  /** Get Nautical Dawn **/
  nauticalDawn: () => ISunTimeResultProp;
  /** Get Civil Dawn **/
  civilDawn: () => ISunTimeResultProp;
  /** Get Sunrise Start **/
  sunriseStart: () => ISunTimeResultProp;
  /** Get Sunrise End **/
  sunriseEnd: () => ISunTimeResultProp;
  /** Get Solar Noon **/
  solarNoon: () => ISunTimeResultProp;
  /** Get Sunset Start **/
  sunsetStart: () => ISunTimeResultProp;
  /** Get Sunset End **/
  sunsetEnd: () => ISunTimeResultProp;
  /** Get Civil Dusk **/
  civilDusk: () => ISunTimeResultProp;
  /** Get Nautical Dusk **/
  nauticalDusk: () => ISunTimeResultProp;
  /** Get Astronomical Dusk **/
  astronomicalDusk: () => ISunTimeResultProp;
}
