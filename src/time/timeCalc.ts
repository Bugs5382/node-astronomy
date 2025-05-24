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
  protected _getDayOfWeek(jd: number): number {
    return (Math.floor(jd + 0.5) + 4) % 7;
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
    const year = time.getUTCFullYear();
    if (year % 4 !== 0) {
      return false;
    } else if (year % 100 !== 0) {
      return true;
    } else return year % 400 === 0;
  }

  /**
   * Calculates the Julian Day number from the given UTC time.
   * @since 0.1.0
   * @private
   */
  protected _timeToJulianDay(time: Date): number {
    const Y = time.getUTCFullYear();
    const M = time.getUTCMonth() + 1;
    const D = time.getUTCDate();
    const H = time.getUTCHours();
    const Min = time.getUTCMinutes();
    const S = time.getUTCSeconds();
    const MS = time.getUTCMilliseconds();

    let year = Y;
    let month = M;

    if (month <= 2) {
      year -= 1;
      month += 12;
    }

    const dayFraction = D + (H + Min / 60 + (S + MS / 1000) / 3600) / 24;

    // Gregorian calendar switch (October 15, 1582)
    const gregorianStart = Date.UTC(1582, 9, 15); // October is month 9 (0-based)
    const julianEnd = Date.UTC(1582, 9, 4); // Julian calendar last day

    const jdDate = Date.UTC(Y, M - 1, D);
    let B: number;

    if (jdDate >= gregorianStart) {
      const A = Math.floor(year / 100);
      B = 2 - A + Math.floor(A / 4);
    } else if (jdDate <= julianEnd) {
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
   * @since 0.1.0
   * @private
   */
  _getDayOfYear(time: Date): number {
    const K = this._isLeapYear(time) ? 1 : 2;
    const M = time.getUTCMonth();
    const D = time.getUTCDate();

    return Math.floor((275 * M) / 9) - K * Math.floor((M + 9) / 12) + D - 30;
  }
}
