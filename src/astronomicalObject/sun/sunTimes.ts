import { Sun } from "@/astronomicalObject/sun/sun";
import {
  Degrees,
  ISunBaseDegrees,
  ISunTimeResultProp,
  ISunTimes,
  ISunTimesProps,
  ISunTimesResult,
} from "@/astronomicalObject/sun/types";
import { toZonedTime } from "date-fns-tz";
import { angleFromDeg, sexagesimal } from "./utils";

export class SunTimes extends Sun implements ISunTimes {

  public readonly degrees: ISunBaseDegrees;

  private readonly longitude: number;

  private readonly latitude: number;

  private readonly timezone: string;

  public readonly  angles: ISunBaseDegrees;

  constructor(props: ISunTimesProps) {
    const timeAtMidnight = props.time ? new Date(props.time) : new Date();

    // force the date to be the midnight of that day.
    timeAtMidnight.setHours(0, 0, 0, 0);

    super({ ...props, time: timeAtMidnight });

    this.timezone = props.timezone || "UTC";

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

    this.degrees = {
      astronomicalDawn: new sexagesimal.Angle(true, 18, 0, 0).deg(),
      nauticalDawn: new sexagesimal.Angle(true, 12, 0, 0).deg(),
      civilDawn: new sexagesimal.Angle(true, 6, 0, 0).deg(),
      sunriseStart: new sexagesimal.Angle(true, 0, 50, 0).deg(),
      sunriseEnd: new sexagesimal.Angle(true, 0, 18, 0).deg(),
      solarNoon: new sexagesimal.Angle(false, 90, 0, 0).deg(),
      sunsetStart: new sexagesimal.Angle(true, 0, 18, 0).deg(),
      sunsetEnd: new sexagesimal.Angle(true, 0, 50, 0).deg(),
      civilDusk: new sexagesimal.Angle(true, 6, 0, 0).deg(),
      nauticalDusk: new sexagesimal.Angle(true, 12, 0, 0).deg(),
      astronomicalDusk: new sexagesimal.Angle(true, 18, 0, 0).deg(),
    };

    this.longitude = props.longitude;
    this.latitude = props.latitude;
  }

  allTimes(): ISunTimesResult {
    return {
      astronomicalDawn: this.astronomicalDawn(),
      nauticalDawn: this.nauticalDawn(),
      civilDawn: this.civilDawn(),
      sunriseStart: this.sunriseStart(),
      sunriseEnd: this.sunriseEnd(),
      solarNoon: this.solarNoon(),
      sunsetStart: this.sunsetStart(),
      sunsetEnd: this.sunsetEnd(),
      civilDusk: this.civilDusk(),
      nauticalDusk: this.nauticalDusk(),
      astronomicalDusk: this.astronomicalDusk(),
    };
  }

  astronomicalDawn() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.astronomicalDawn,
      this.getJulianDay0(),
    );
  }

  nauticalDawn() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.nauticalDawn,
      this.getJulianDay0(),
    );
  }

  civilDawn() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.civilDawn,
      this.getJulianDay0(),
    );
  }

  sunriseStart() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.sunriseStart,
      this.getJulianDay0(),
    );
  }

  sunriseEnd() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.sunriseEnd,
      this.getJulianDay0(),
    );
  }

  solarNoon() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.nauticalDawn,
      this.getJulianDay0(),
    );
  }

  sunsetStart() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.nauticalDawn,
      this.getJulianDay0(),
    );
  }

  sunsetEnd() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.nauticalDawn,
      this.getJulianDay0(),
    );
  }

  civilDusk() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.nauticalDawn,
      this.getJulianDay0(),
    );
  }

  nauticalDusk() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.nauticalDawn,
      this.getJulianDay0(),
    );
  }

  astronomicalDusk() {
    return this.getSolarPhaseTime(
      this.latitude,
      this.longitude,
      this.degrees.nauticalDawn,
      this.getJulianDay0(),
    );
  }

  /**
   * Calculates solar event time(s) for a given solar depression angle.
   *
   * @param latitudeDeg
   * @param longitudeDeg
   * @param solarDepression - Solar depression angle in degrees (negative below horizon)
   * @param J_date
   * @returns Rise and set times or null if the sun never rises/sets at that angle
   */
  public getSolarPhaseTime(
    latitudeDeg: number,
    longitudeDeg: number,
    solarDepression: Degrees,
    J_date: number,
  ): ISunTimeResultProp {
    const adjustedAngle = this.adjustAngleForAltitude(solarDepression);
    return this.getSolarEventTime(
      latitudeDeg,
      longitudeDeg,
      adjustedAngle,
      J_date,
    );
  }

  adjustAngleForAltitude(baseAngle: number): number {
    const dip = (1.76 * Math.sqrt(0)) / 60;
    return baseAngle - dip;
  }

  getSolarEventTime(
    latitudeDeg: number,
    longitudeDeg: number,
    degrees: Degrees,
    J_date: number,
  ): ISunTimeResultProp {
    const n = J_date - 2451545.0 + 0.0008;
    const J_star = n + longitudeDeg / 360;
    const M = (357.5291 + 0.98560028 * J_star) % 360;
    const C =
      1.9148 * Math.sin((M * Math.PI) / 180) +
      0.02 * Math.sin((2 * M * Math.PI) / 180) +
      0.0003 * Math.sin((3 * M * Math.PI) / 180);
    const lambda = (M + 102.9372 + C + 180) % 360;
    const J_transit =
      J_date +
      longitudeDeg / 360 +
      0.0053 * Math.sin((M * Math.PI) / 180) -
      0.0069 * Math.sin((2 * lambda * Math.PI) / 180);
    const delta = Math.asin(
      Math.sin((lambda * Math.PI) / 180) * Math.sin((23.44 * Math.PI) / 180),
    );
    const latRad = angleFromDeg(latitudeDeg);
    const cos_omega =
      (Math.sin(angleFromDeg(degrees)) - Math.sin(latRad) * Math.sin(delta)) /
      (Math.cos(latRad) * Math.cos(delta));
    if (cos_omega < -1 || cos_omega > 1) {
      return {
        start: null,
        end: null,
        startClean: "",
        endClean: "",
      };
    }
    const omega = Math.acos(cos_omega);
    const dayFraction = omega / (2 * Math.PI);
    const J_rise = J_transit - dayFraction;
    let J_set = J_transit + dayFraction;

    if (J_set < J_rise) {
      J_set += 1;
    }

    const riseUtc = new Date((J_rise - 2440587.5) * 86400000);
    const setUtc = new Date((J_set - 2440587.5) * 86400000);
    const riseZoned = toZonedTime(riseUtc, this.timezone);
    const setZoned = toZonedTime(setUtc, this.timezone);

    return {
      start: riseZoned,
      end: setZoned,
      startClean: riseZoned.toLocaleString("en-US", { timeZone: this.timezone }),
      endClean: setZoned.toLocaleString("en-US", { timeZone: this.timezone }),
    };
  }
}
