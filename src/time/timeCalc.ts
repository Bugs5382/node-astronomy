import {
  EPOCH_J1900,
  EPOCH_J1950,
  EPOCH_J2000,
  EPOCH_J2100,
} from "@/constants";

/**
 *
 */
export class TimeCalc {
  /**
   * @since 0.1.0
   * @private
   */
  protected _getDayOfWeek(time: Date): number {
    return Math.floor((this._timeToJulianDay(time) + 1.5) % 7);
  }
  /**
   * @param T
   * @private
   */
  protected _getJulianDayFromCenturies(T: number): number {
    return T * 36525 + 2451545.0;
  }

  /**
   *
   * @param jd
   * @private
   */
  protected _julianDateToDate(jd: number) {
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
  protected _getEpoch(jd: number): number {
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
  protected _isLeapYear(time: Date): boolean {
    const year = time.getFullYear();
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
  protected _calculateJulianDay(time: Date): number {
    const Y = time.getUTCFullYear();
    const M = time.getUTCMonth() + 1;
    const D = time.getUTCDate();
    const H = time.getUTCHours();
    const Min = time.getUTCMinutes();
    const S = time.getUTCSeconds();

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
  _timeToJulianDay(time: Date): number {
    const tmpYear = parseFloat(
      time.getUTCFullYear() + "." + this._getDayOfYear(time),
    );

    let Y;
    let M;
    if (time.getUTCMonth() > 2) {
      Y = time.getUTCFullYear();
      M = time.getUTCMonth();
    } else {
      Y = time.getUTCFullYear() - 1;
      M = time.getUTCMonth() + 12;
    }

    const D = time.getUTCDate();
    const H =
      time.getUTCHours() / 24 +
      time.getUTCMinutes() / 1440 +
      time.getUTCSeconds() / 86400;

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
  _getDayOfYear(time: Date): number {
    const K = this._isLeapYear(time) ? 1 : 2;
    const M = time.getMonth();
    const D = time.getDate();

    return Math.floor((275 * M) / 9) - K * Math.floor((M + 9) / 12) + D - 30;
  }
}
