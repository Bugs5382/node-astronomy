import {
  EPOCH_J1900,
  EPOCH_J1950,
  EPOCH_J2000,
  EPOCH_J2100,
} from "@/constants";
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
   * The date/time of the point in which all other calculations are done.
   * @since 0.1.0
   * @private
   */
  private time: Date;
  /**
   * Julian Date
   * @since 0.1.0
   */
  public readonly jd: number | undefined;
  /**
   * Number of Julian centuries (T) since J2000.0, calculated from the Julian Date (JD).
   * This value is used in astronomical calculations
   * to express time in centuries relative to the standard epoch J2000.0.
   * @since 0.1.0
   */
  public readonly T: number;

  /**
   * @since 0.1.0
   * @param props
   */
  constructor(props: ITimeOfInterest = {}) {
    this.time = props.time || new Date();
    this.jd = this.toJulianDay();
    this.T = this.getJulianCenturies(this.jd);
  }

  /**
   * Number of Julian centuries (T) since J2000.0, calculated from the Julian Date (JD).
   * This value is used in astronomical calculations
   * to express time in centuries relative to the standard epoch J2000.0.
   * @since 0.1.0
   */
  getJulianCenturies(jd: number): number {
    const epoch = this._getEpoch(jd);
    return (jd - epoch) / 36525.0;
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
   * @since 0..1.0
   */
  isLeapYear() {
    return this._isLeapYear();
  }
  /**
   * Calculates the Julian Day number from the current time.
   * @since 0.1.0
   */
  async isLeapYearAsync() {
    return this._isLeapYear();
  }

  /**
   * Returns the most appropriate epoch (J1900, J1950, J2000, J2100) for the stored JD.
   * @since 0.1.0
   */
  private _getEpoch(jd: number): number {
    if (jd < EPOCH_J1950) {
      return EPOCH_J1900;
    } else if (jd < EPOCH_J2000) {
      return EPOCH_J1950;
    } else if (jd < EPOCH_J2100) {
      return EPOCH_J2000;
    } else {
      return EPOCH_J2100;
    }
  }

  /**
   * @since 0.1.0
   * @private
   */
  private _isLeapYear(): boolean {
    const year = this.time.getFullYear();
    if (year / 4 !== Math.floor(year / 4)) {
      return false;
    } else if (year / 100 !== Math.floor(year / 100)) {
      return true;
    } else return year / 400 === Math.floor(year / 400);
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

    return (
      Math.floor(365.25 * (year + 4716)) +
      Math.floor(30.6001 * (month + 1)) +
      dayFraction +
      B -
      1524.5
    );
  }
}

export default TimeOfInterest;
