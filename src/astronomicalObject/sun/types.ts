import { IAstronomicalObject } from "@/astronomicalObject/astronomicalObject";
import { ITimeOfInterest } from "@/time";

export type ISunProps = IAstronomicalObject;

export type ISun = ITimeOfInterest;

export type Radian = number;

export interface ISunBaseAngles {
  astronomicalDawn?: Radian;
  nauticalDawn?: Radian;
  civilDawn?: Radian;
  sunriseStart?: Radian;
  sunriseEnd?: Radian;
  solarNoon?: Radian;
  sunsetStart?: Radian;
  sunsetEnd?: Radian;
  civilDusk?: Radian;
  nauticalDusk?: Radian;
  astronomicalDusk?: Radian;
}

export interface ISunTimesProps extends ISunProps {
  angles?: ISunBaseAngles;
  latitude: number;
  longitude: number;
  refraction?: number;
}

export interface ISunTimes extends ISun {
  angles: ISunBaseAngles;
  /** Get Astronomical Dawn **/
  astronomicalDawn: () => Date;
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
