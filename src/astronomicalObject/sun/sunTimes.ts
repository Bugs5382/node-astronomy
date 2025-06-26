import { Sun } from "@/astronomicalObject/sun/sun";
import {
  ISunBaseAngles,
  ISunTimes,
  ISunTimesProps,
} from "@/astronomicalObject/sun/types";
import { angleFromDeg, sexagesimal } from "./utils";

export class SunTimes extends Sun implements ISunTimes {
  public readonly angles: ISunBaseAngles;

  private readonly longitude: number;

  private readonly latitude: number;

  constructor(props: ISunTimesProps) {
    const timeAtMidnight = props.time ? new Date(props.time) : new Date();

    // force the date to be the midnight of that day.
    timeAtMidnight.setHours(0, 0, 0, 0);

    super({ ...props, time: timeAtMidnight });

    this.angles = {
      astronomicalDawn: new sexagesimal.Angle(true, 18, 0, 0).rad(),
      nauticalDawn: new sexagesimal.Angle(true, 12, 0, 0).rad(),
      civilDawn: new sexagesimal.Angle(true, 6, 0, 0).rad(),
      sunriseStart: new sexagesimal.Angle(true, 0, 50, 0).rad(),
      sunriseEnd: new sexagesimal.Angle(true, 0, 18, 0).rad(),
      solarNoon: new sexagesimal.Angle(false, 90, 0, 0).rad(),
      sunsetStart: new sexagesimal.Angle(true, 0, 18, 0).rad(),
      sunsetEnd: new sexagesimal.Angle(true, 0, 50, 0).rad(),
      civilDusk: new sexagesimal.Angle(true, 6, 0, 0).rad(),
      nauticalDusk: new sexagesimal.Angle(true, 12, 0, 0).rad(),
      astronomicalDusk: new sexagesimal.Angle(true, 18, 0, 0).rad(),
    };

    this.longitude = angleFromDeg(props.longitude);

    this.latitude = angleFromDeg(props.latitude);
  }

  protected allTimes() {
    return {
      astronomicalDawn: this.astronomicalDawn(),
      nauticalDawn: this.nauticalDawn(),
      civilDawn: this.civilDawn(),
      sunriseStart: this.sunriseStart(),
      sunriseEnd: this.sunriseEnd(),
      sunNoon: this.solarNoon(),
      sunsetStart: this.sunsetStart(),
      sunsetEnd: this.sunsetEnd(),
      civilDusk: this.civilDusk(),
      nauticalDusk: this.nauticalDusk(),
      astronomicalDusk: this.astronomicalDusk(),
    };
  }

  astronomicalDawn() {
    return new Date();
  }

  nauticalDawn() {
    return new Date();
  }

  civilDawn() {
    return new Date();
  }

  sunriseStart() {
    return new Date();
  }

  sunriseEnd() {
    return new Date();
  }

  solarNoon() {
    return new Date();
  }

  sunsetStart() {
    return new Date();
  }

  sunsetEnd() {
    return new Date();
  }

  civilDusk() {
    return new Date();
  }

  nauticalDusk() {
    return new Date();
  }

  astronomicalDusk() {
    return new Date();
  }
}
