import {
  EPOCH_J1900,
  EPOCH_J1950,
  EPOCH_J2000,
  EPOCH_J2100,
} from "@/constants";

/**
 * Utility class for astronomical time calculations, including Julian date conversions and epoch determination.
 *
 * @since 0.1.0
 */
export class TimeCalc {
  /**
   * Calculates the day of the week from a Julian Day Number.
   * Sunday = 0, Monday = 1, ..., Saturday = 6.
   *
   * @param jd - Julian Day number
   * @returns Day of the week (0–6)
   * @since 0.1.0
   * @private
   */
  protected _getDayOfWeek(jd: number): number {
    return Math.floor(jd + 1.5) % 7;
  }

  /**
   * Converts Julian centuries since J2000.0 to Julian Day.
   *
   * @param T - Julian centuries since J2000.0
   * @returns Julian Day number
   * @since 0.1.0
   * @private
   */
  protected _getJulianDayFromCenturies(T: number): number {
    return T * 36525 + 2451545.0;
  }

  /**
   * Converts a Julian Day number to a JavaScript Date object in UTC.
   *
   * @param jd - Julian Day number
   * @returns Corresponding UTC Date object
   * @since 0.1.0
   * @private
   */
  protected _julianDateToDate(jd: number): Date {
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

    const dayInt = Math.floor(day);
    const dayFraction = day - dayInt;

    const totalMilliseconds = Math.round(dayFraction * 86400000);
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const ms = totalMilliseconds % 1000;

    return new Date(
      Date.UTC(year, month - 1, dayInt, hours, minutes, seconds, ms),
    );
  }

  /**
   * Determines the closest named Julian epoch for a given Julian Day.
   *
   * @param jd - Julian Day number
   * @returns Epoch constant
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
   * Checks if a given year is a leap year in the Gregorian calendar.
   *
   * @param time - UTC Date object
   * @returns True if leap year, otherwise false
   * @since 0.1.0
   * @private
   */
  protected _isLeapYear(time: Date): boolean {
    const year = time.getUTCFullYear();
    if (year % 4 !== 0) {
      return false;
    } else if (year % 100 !== 0) {
      return true;
    } else {
      return year % 400 === 0;
    }
  }

  /**
   * Converts a UTC Date object to a Julian Day number.
   * Throws an error if the date falls within the non-existent calendar transition period (1582-10-05 to 1582-10-14).
   *
   * @param time - UTC Date object
   * @returns Julian Day number
   * @throws Error if date is in invalid calendar transition range
   * @since 0.1.0
   * @private
   */
  protected _timeToJulianDay(time: Date): number {
    let Y = time.getUTCFullYear();
    let M = time.getUTCMonth() + 1;
    const D = time.getUTCDate();
    const H = time.getUTCHours();
    const Min = time.getUTCMinutes();
    const S = time.getUTCSeconds();
    const MS = time.getUTCMilliseconds();

    if (M <= 2) {
      Y -= 1;
      M += 12;
    }

    const dayFraction = D + (H + Min / 60 + (S + MS / 1000) / 3600) / 24;

    const gregorianStart = Date.UTC(1582, 9, 15);
    const julianEnd = Date.UTC(1582, 9, 4);
    const dateUTC = Date.UTC(
      time.getUTCFullYear(),
      time.getUTCMonth(),
      time.getUTCDate(),
    );

    let B = 0;
    if (dateUTC >= gregorianStart) {
      const A = Math.floor(Y / 100);
      B = 2 - A + Math.floor(A / 4);
    } else if (dateUTC <= julianEnd) {
      B = 0;
    } else {
      throw new Error("Date between 1582-10-05 and 1582-10-14 is invalid");
    }

    return (
      Math.floor(365.25 * (Y + 4716)) +
      Math.floor(30.6001 * (M + 1)) +
      dayFraction +
      B -
      1524.5
    );
  }

  /**
   * Calculates the day of the year (1–366) from a given UTC Date.
   *
   * @param time - UTC Date object
   * @returns Day of the year (1–366)
   * @since 0.1.0
   * @private
   */
  protected _getDayOfYear(time: Date): number {
    const start = Date.UTC(time.getUTCFullYear(), 0, 1);
    const current = Date.UTC(
      time.getUTCFullYear(),
      time.getUTCMonth(),
      time.getUTCDate(),
    );
    const diffMs = current - start;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  }
}
