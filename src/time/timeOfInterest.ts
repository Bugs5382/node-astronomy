import { ITimeOfInterest } from "@/time/types";

/**
 * Time of Interest
 * @summary Generate the object in which subductions do most of the work.
 * @example
 *
 * const toi = new TimeOfInterest(new Date())
 * @remarks This class create the most import 'toi' which all other functions and calculations are done.
 * For instance, if we wanted to see where the moon was for a certain time period, we need to get that time into a math format for us to understand.
 * @since 0.1.0
 */
export class TimeOfInterest {
  /**
   * The date/time of the point in which all other calluclations are done.
   * @since 0.1.0
   * @private
   */
  private time: Date;
  /**
   * Julian Date
   * @private
   */
  jd: number | undefined;
  /**
   * @since 0.1.0
   * @param props
   */
  constructor(props: ITimeOfInterest = {}) {
    this.jd = undefined;
    this.time = props.time || new Date();
  }

  /**
   * Calculates the Julian Day number from the current time.
   * @since 0..1.0
   */
  toJulianDay() {
    return this._calculateJulianDay();
  }

  /**
   * Calculates the Julian Day number from the current time.
   * @since 0.1.0
   */
  async toJulianDayAsync() {
    return this._calculateJulianDay();
  }

  /**
   * Calculates the Julian Day number from the current time.
   * @since 0.1.0
   * @private
   */
  private _calculateJulianDay(): number {
    const Y = this.time.getUTCFullYear();
    const M = this.time.getUTCMonth() + 1;
    const D = this.time.getUTCDate();
    const H = this.time.getUTCHours();
    const Min = this.time.getUTCMinutes();
    const S = this.time.getUTCSeconds();

    let year = Y;
    let month = M;

    if (M <= 2) {
      year -= 1;
      month += 12;
    }

    const dayFraction = D + (H + Min / 60 + S / 3600) / 24;
    const jdTimestamp = Date.UTC(Y, M - 1, D);

    let B: number;
    if (jdTimestamp >= Date.UTC(1582, 9, 15)) {
      const A = Math.floor(year / 100);
      B = 2 - A + Math.floor(A / 4);
    } else if (jdTimestamp <= Date.UTC(1582, 9, 4)) {
      B = 0;
    } else {
      throw new Error(
        "Date between 1582-10-05 and 1582-10-14 is not defined in Julian or Gregorian calendars.",
      );
    }

    this.jd =
      Math.floor(365.25 * (year + 4716)) +
      Math.floor(30.6001 * (month + 1)) +
      dayFraction +
      B -
      1524.5;

    return this.jd;
  }
}

export default TimeOfInterest;
