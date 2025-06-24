import { Sun } from "@/astronomicalObject/sun/sun";
import {
  ISunBaseAngles,
  ISunTimes,
  ISunTimesProps,
} from "@/astronomicalObject/sun/types";
import { angleFromDeg, sexagesimal } from "./utils";

export class SunTimes extends Sun implements ISunTimes {
  public readonly angles: ISunBaseAngles;

  private longitude: number;

  private latitude: number;

  private refraction: number;

  constructor(props: ISunTimesProps) {
    super(props);

    this.angles = {
      astronomicalTwilight: new sexagesimal.Angle(true, 18, 0, 0).rad(),
      nauticalTwilight: new sexagesimal.Angle(true, 12, 0, 0).rad(),
      civilTwilight: new sexagesimal.Angle(true, 6, 0, 0).rad(),
      sunriseStart: new sexagesimal.Angle(true, 0, 50, 0).rad(),
      sunriseEnd: new sexagesimal.Angle(true, 0, 18, 0).rad(),
      sunNoon: new sexagesimal.Angle(false, 90, 0, 0).rad(),
      sunsetStart: new sexagesimal.Angle(true, 0, 18, 0).rad(),
      sunsetEnd: new sexagesimal.Angle(true, 0, 50, 0).rad(),
      civilDusk: new sexagesimal.Angle(true, 6, 0, 0).rad(),
      nauticalDusk: new sexagesimal.Angle(true, 12, 0, 0).rad(),
      astronomicalDusk: new sexagesimal.Angle(true, 18, 0, 0).rad(),
    };

    this.longitude = angleFromDeg(props.longitude);
    this.latitude = angleFromDeg(props.latitude);

    this.refraction = props.refraction;

    console.log(this.angles);
  }
}
