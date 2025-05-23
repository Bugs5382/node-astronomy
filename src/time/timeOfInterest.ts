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
   * Creates a new JulianTime instance based on one of the provided inputs: `T`, `jd`, or `time`.
   * @remarks
   * Priority of input properties:
   * - If `T` (Julian centuries since J2000.0) is provided, it takes precedence over `jd` and `time`.
   *   - `jd` is calculated from `T`, and `time` is derived from the computed `jd`.
   * - If `T` is not provided but `jd` (Julian Day Number) is, it takes precedence over `time`.
   *   - `time` is derived from the provided `jd`, and `T` is calculated from it.
   * - If neither `T` nor `jd` is provided, the current system time or `props.time` is used.
   *   - Both `jd` and `T` are computed based on that time.
   *
   * @param props - An object containing optional time information (`T`, `jd`, or `time`)
   * @since 0.1.0
   */
  constructor(props: ITimeOfInterest = {}) {
    if (props.T != null) {
      this.T = props.T;
      this.jd = this._getJulianDayFromCenturies(this.T);
      this.time = this._julianDateToDate(this.jd);
    } else {
      this.time = props.jd
        ? this._julianDateToDate(props.jd)
        : props.time || new Date();

      this.jd = props.jd || this.toJulianDay();
      this.T = this.getJulianCenturies(this.jd);
    }
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
   * @since 0.1.0
   */
  getDayOfYear() {
    return this._getDayOfYear();
  }

  /**
   * @since 0.1.0
   */
  async getDayOfYearAsync() {
    return this._getDayOfYear();
  }

  /**
   * @since 0.1.0
   */
  getDayOfWeek() {
    return this._getDayOfWeek();
  }

  /**
   * @since 0.1.0
   */
  async getDayOfWeekAsync() {
    return this._getDayOfWeek();
  }

  /**
   * @since 0.1.0
   * @private
   */
  private _getDayOfWeek(): number {
    return Math.floor((this._timeToJulianDay() + 1.5) % 7);
  }
  /**
   * @param T
   * @private
   */
  private _getJulianDayFromCenturies(T: number): number {
    return T * 36525 + 2451545.0;
  }

  /**
   *
   * @param jd
   * @private
   */
  private _julianDateToDate(jd: number) {
    const jdAdjusted = jd + 0.5;

    const Z = Math.floor(jdAdjusted);
    const F = jdAdjusted - Z;
    let A = Z;

    if (Z >= 2299161) {
      const alpha = Math.floor((Z - 1867216.25) / 36524.25);
      A = Z + 1 + alpha - Math.floor(alpha / 4);
    }

    const B = A + 1524;
    const C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C);
    const E = Math.floor((B - D) / 30.6001);

    const day = B - D - Math.floor(30.6001 * E) + F;
    const month = E < 14 ? E - 1 : E - 13;
    const year = month > 2 ? C - 4716 : C - 4715;

    const dayFrac = day - Math.floor(day);
    const hours = Math.floor(dayFrac * 24);
    const minutes = Math.floor((dayFrac * 24 - hours) * 60);
    const seconds = Math.floor(((dayFrac * 24 - hours) * 60 - minutes) * 60);

    return new Date(
      Date.UTC(year, month - 1, Math.floor(day), hours, minutes, seconds),
    );
  }
  /**
   * Returns the most appropriate epoch (J1900, J1950, J2000, J2100) for the stored JD.
   * @since 0.1.0
   * @private
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

  /**
   *
   */
  _timeToJulianDay(): number {
    const tmpYear = parseFloat(
      this.time.getUTCFullYear() + "." + this.getDayOfYear(),
    );

    let Y;
    let M;
    if (this.time.getUTCMonth() > 2) {
      Y = this.time.getUTCFullYear();
      M = this.time.getUTCMonth();
    } else {
      Y = this.time.getUTCFullYear() - 1;
      M = this.time.getUTCMonth() + 12;
    }

    const D = this.time.getUTCDate();
    const H =
      this.time.getUTCHours() / 24 +
      this.time.getUTCMinutes() / 1440 +
      this.time.getUTCSeconds() / 86400;

    let A;
    let B;
    if (tmpYear >= 1582.288) {
      // YYYY-MM-DD >= 1582-10-15
      A = Math.floor(Y / 100);
      B = 2 - A + Math.floor(A / 4);
    } else if (tmpYear <= 1582.277) {
      // YY-MM-DD <= 1582-10-04
      B = 0;
    } else {
      throw new Error("Date between 1582-10-04 and 1582-10-15 is not defined.");
    }

    // Meeus 7.1
    return (
      Math.floor(365.25 * (Y + 4716)) +
      Math.floor(30.6001 * (M + 1)) +
      D +
      H +
      B -
      1524.5
    );
  }

  /**
   * @since 0.1.0
   * @private
   */
  _getDayOfYear(): number {
    const K = this.isLeapYear() ? 1 : 2;
    const M = this.time.getMonth();
    const D = this.time.getDate();

    return Math.floor((275 * M) / 9) - K * Math.floor((M + 9) / 12) + D - 30;
  }
}

export default TimeOfInterest;
