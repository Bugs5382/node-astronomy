import {
  EPOCH_J1900,
  EPOCH_J1950,
  EPOCH_J2000,
  EPOCH_J2100,
} from "@/constants";
// import { normalizeAngle } from "@/helper";

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

  protected _julianDay2julianDay0(jd: number): number {
    return Math.floor(jd + 0.5) - 0.5;
  }

  private _julianDay2julianCenturiesJ2000(jd: number): number {
    return (jd - 2451545.0) / 36525.0;
  }

  protected _getJulianMillenniaJ2000(jd: number): number {
    const T = this._julianDay2julianCenturiesJ2000(jd);
    return T / 10;
  }

  // protected _getGreenwichMeanSiderealTime(T: number): number {
  //   const jd = this._getJulianDayFromCenturies(T);
  //
  //   // Meeus 12.4
  //   const GMST =
  //     280.46061837 +
  //     360.98564736629 * (jd - 2451545) +
  //     0.000387933 * Math.pow(T, 2) +
  //     Math.pow(T, 3) / 38710000;
  //
  //   return normalizeAngle(GMST);
  // }

  // protected _getGreenwichApparentSiderealTime(T: number): string {
  //   const GMST = this._getGreenwichMeanSiderealTime(T);
  //   const p = earthCalc.getNutationInLongitude(T);
  //   const e = earthCalc.getTrueObliquityOfEcliptic(T);
  //   const eRad = deg2rad(e);
  //
  //   // Meeus 12
  //   return GMST + p * Math.cos(eRad);
  // }

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

  protected _getDeltaT(year: number, month: number = 0): number {
    // https://eclipse.gsfc.nasa.gov/SEcat5/deltatpoly.html
    const y = year + (month - 0.5) / 12;

    let t;
    let deltaT = 0;

    if (year < -500) {
      t = (y - 1820) / 100;
      deltaT = -20 + 32 * Math.pow(t, 2);
    }

    if (year >= -500 && year < 500) {
      t = y / 100;
      deltaT =
        10583.6 -
        1014.41 * t +
        33.78311 * Math.pow(t, 2) -
        5.952053 * Math.pow(t, 3) -
        0.1798452 * Math.pow(t, 4) +
        0.022174192 * Math.pow(t, 5) +
        0.0090316521 * Math.pow(t, 6);
    }

    if (year >= 500 && year < 1600) {
      t = (y - 1000) / 100;
      deltaT =
        1574.2 -
        556.01 * t +
        71.23472 * Math.pow(t, 2) +
        0.319781 * Math.pow(t, 3) -
        0.8503463 * Math.pow(t, 4) -
        0.005050998 * Math.pow(t, 5) +
        0.0083572073 * Math.pow(t, 6);
    }

    if (year >= 1600 && year < 1700) {
      t = y - 1600;
      deltaT =
        120 - 0.9808 * t - 0.01532 * Math.pow(t, 2) + Math.pow(t, 3) / 7129;
    }

    if (year >= 1700 && year < 1800) {
      t = y - 1700;
      deltaT =
        8.83 +
        0.1603 * t -
        0.0059285 * Math.pow(t, 2) +
        0.00013336 * Math.pow(t, 3) -
        Math.pow(t, 4) / 1174000;
    }

    if (year >= 1800 && year < 1860) {
      t = y - 1800;
      deltaT =
        13.72 -
        0.332447 * t +
        0.0068612 * Math.pow(t, 2) +
        0.0041116 * Math.pow(t, 3) -
        0.00037436 * Math.pow(t, 4) +
        0.0000121272 * Math.pow(t, 5) -
        0.0000001699 * Math.pow(t, 6) +
        0.000000000875 * Math.pow(t, 7);
    }

    if (year >= 1860 && year < 1900) {
      t = y - 1860;

      deltaT =
        7.62 +
        0.5737 * t -
        0.251754 * Math.pow(t, 2) +
        0.01680668 * Math.pow(t, 3) -
        0.0004473624 * Math.pow(t, 4) +
        Math.pow(t, 5) / 233174;
    }

    if (year >= 1900 && year < 1920) {
      t = y - 1900;
      deltaT =
        -2.79 +
        1.494119 * t -
        0.0598939 * Math.pow(t, 2) +
        0.0061966 * Math.pow(t, 3) -
        0.000197 * Math.pow(t, 4);
    }

    if (year >= 1920 && year < 1941) {
      t = y - 1920;
      deltaT =
        21.2 +
        0.84493 * t -
        0.0761 * Math.pow(t, 2) +
        0.0020936 * Math.pow(t, 3);
    }

    if (year >= 1941 && year < 1961) {
      t = y - 1950;
      deltaT = 29.07 + 0.407 * t - Math.pow(t, 2) / 233 + Math.pow(t, 3) / 2547;
    }

    if (year >= 1961 && year < 1986) {
      t = y - 1975;
      deltaT = 45.45 + 1.067 * t - Math.pow(t, 2) / 260 - Math.pow(t, 3) / 718;
    }

    if (year >= 1986 && year < 2005) {
      t = y - 2000;
      deltaT =
        63.86 +
        0.3345 * t -
        0.060374 * Math.pow(t, 2) +
        0.0017275 * Math.pow(t, 3) +
        0.000651814 * Math.pow(t, 4) +
        0.00002373599 * Math.pow(t, 5);
    }

    if (year >= 2005 && year < 2050) {
      t = y - 2000;
      deltaT = 62.92 + 0.32217 * t + 0.005589 * Math.pow(t, 2);
    }

    if (year >= 2050) {
      t = (y - 1820) / 100;
      deltaT = -20 + 32 * Math.pow(t, 2);
    }

    return deltaT;
  }
}
