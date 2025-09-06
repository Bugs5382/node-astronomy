import { IAstronomicalObject } from "@/astronomicalObject/astronomicalObject";
import { ITimeOfInterest } from "@/time";

export type ISunProps = IAstronomicalObject;

export type ISun = ITimeOfInterest;

export type ISunTimeResultProp = Date | null;

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

export interface ISunTimes extends ISun {
  // /** Get Astronomical Dawn **/
  // astronomicalDawn: () => ISunTimeResultProp;
  // /** Get Nautical Dawn **/
  // nauticalDawn: () => ISunTimeResultProp;
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
