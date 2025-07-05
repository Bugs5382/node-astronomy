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

export interface ISunTimesResult {
  astronomicalDawn:  { rise: Date | null; set: Date | null; };
  nauticalDawn: Date;
  civilDawn: Date;
  sunriseStart: Date;
  sunriseEnd: Date;
  solarNoon: Date;
  sunsetStart: Date;
  sunsetEnd: Date;
  civilDusk: Date;
  nauticalDusk: Date;
  astronomicalDusk?: Date;
}

export interface ISunTimesProps extends ISunProps {
  angles?: ISunBaseAngles;
  latitude: number;
  longitude: number;
  refraction?: number;
}

export interface ISunTimes extends ISun {
  angles: ISunBaseAngles;
  degrees: ISunBaseDegrees;
  /** */
  allTimes: () => ISunTimesResult;
  /** Get Astronomical Dawn **/
  astronomicalDawn: () => { rise: Date | null, set: Date | null };
  /** Get Nautical Dawn **/
  nauticalDawn: () => Date;
  /** Get Civil Dawn **/
  civilDawn: () => Date;
  /** Get Sunrise Start **/
  sunriseStart: () => Date;
  /** Get Sunrise End **/
  sunriseEnd: () => Date;
  /** Get Solar Noon **/
  solarNoon: () => Date;
  /** Get Sunset Start **/
  sunsetStart: () => Date;
  /** Get Sunset End **/
  sunsetEnd: () => Date;
  /** Get Civil Dusk **/
  civilDusk: () => Date;
  /** Get Nautical Dusk **/
  nauticalDusk: () => Date;
  /** Get Astronomical Dusk **/
  astronomicalDusk: () => Date;
}
