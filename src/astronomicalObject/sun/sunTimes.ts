import { Sun } from "@/astronomicalObject/sun/sun";
import {
  Degrees,
  ISunBaseAngles, ISunBaseDegrees,
  ISunTimes,
  ISunTimesProps, ISunTimesResult
} from "@/astronomicalObject/sun/types";
import {angleFromDeg, sexagesimal} from "./utils";

export class SunTimes extends Sun implements ISunTimes {
  public readonly angles: ISunBaseAngles;

  public readonly degrees: ISunBaseDegrees;

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
    return this.getSolarPhaseTime(this.latitude, this.longitude, this.degrees.astronomicalDawn, this.getJulianDay0())
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

  /**
   * Calculates solar event time(s) for a given solar depression angle.
   *
   * @param latitudeDeg
   * @param longitudeDeg
   * @param solarDepression - Solar depression angle in degrees (negative below horizon)
   * @returns Rise and set times or null if the sun never rises/sets at that angle
   */
  public getSolarPhaseTime(
    latitudeDeg: number,
    longitudeDeg: number,
    solarDepression: Degrees,
    J_date: number
  ): { rise: Date | null; set: Date | null } {
    const adjustedAngle = this.adjustAngleForAltitude(solarDepression);
    return this.getSolarEventTime(latitudeDeg, longitudeDeg, adjustedAngle, J_date);
  }

  adjustAngleForAltitude(baseAngle: number): number {
    const dip = 1.76 * Math.sqrt(0) / 60;
    return baseAngle - dip;
  }

  getSolarEventTime(
    latitudeDeg: number,
    longitudeDeg: number,
    degrees: Degrees,
    J_date: number
  ): { rise: Date | null; set: Date | null } {

    console.log('latitudeDeg', latitudeDeg)
    console.log('longitudeDeg', longitudeDeg)
    console.log('J_date', J_date)


    const n = J_date - 2451545.0 + 0.0008;
    console.log('n', n)

    // Mean solar noon
    const J_star = n + longitudeDeg / 360;
    console.log('J_star', J_star)

    // Solar mean anomaly
    const M = (357.5291 + 0.98560028 * J_star) % 360;
    console.log('M', M)

    // Equation of center
    const C =
      1.9148 * Math.sin((M * Math.PI) / 180) +
      0.0200 * Math.sin((2 * M * Math.PI) / 180) +
      0.0003 * Math.sin((3 * M * Math.PI) / 180);
    console.log('C', C)

    // Ecliptic longitude
    const lambda = (M + 102.9372 + C + 180) % 360;
    console.log('lambda', lambda)

    const J_transit = J_date + (longitudeDeg / 360) +
      0.0053 * Math.sin((M * Math.PI) / 180) -
      0.0069 * Math.sin((2 * lambda * Math.PI) / 180);
    console.log('J_transit', J_transit)


    // Solar declination
    const delta = Math.asin(
      Math.sin((lambda * Math.PI) / 180) * Math.sin((23.44 * Math.PI) / 180)
    );
    console.log('delta', delta);

    const latRad = angleFromDeg(latitudeDeg);

    const cos_omega =
      (Math.sin(angleFromDeg(degrees)) -
        Math.sin(latRad) * Math.sin(delta)) /
      (Math.cos(latRad) * Math.cos(delta));
    console.log('cos_omega', cos_omega);

    if (cos_omega < -1 || cos_omega > 1) {
      // Sun does not reach this angle this date at this location
      return { rise: null, set: null };
    }

    // Hour angle in radians
    const omega = Math.acos(cos_omega);
    console.log('omega', omega);

    // Convert hour angle to fraction of day
    const dayFraction = omega / (2 * Math.PI);
    console.log('dayFraction', dayFraction);

    // Calculate rise and set Julian dates
    const J_rise = J_transit - dayFraction;
    console.log('J_rise', J_rise);
    let J_set = J_transit + dayFraction;
    console.log('J_set', J_set);

    if (J_set < J_rise) {
      J_set += 1; // move set time into next day
      console.log('Update if needed: J_set', J_set);
    }

    // Convert Julian dates to JS Dates in UTC
    const rise = new Date((J_rise - 2440587.5) * 86400000);
    console.log('rise', rise);
    const set = new Date((J_set - 2440587.5) * 86400000);
    console.log('set', set);

    return { rise, set };
  }


}
