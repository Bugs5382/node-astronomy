import { IAstronomicalObject } from "@/astronomicalObject/astronomicalObject";

export type ISunProps = IAstronomicalObject;

export type ISun = {};

export type Radian = number;

export interface ISunBaseAngles {
  astronomicalTwilight?: Radian;
  nauticalTwilight?: Radian;
  civilTwilight?: Radian;
  sunriseStart?: Radian;
  sunriseEnd?: Radian;
  sunNoon?: Radian;
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
  refraction: number;
}

export interface ISunTimes {
  angles: ISunBaseAngles;
}
