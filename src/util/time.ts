/*
MIT License

Copyright (c) 2026 Shane Froebel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
/**
 * Time and sidereal-time utilities.
 *
 * Implementations follow the same formulas used by the underlying
 * astronomy code that previously lived behind `@observerly/astrometry`,
 * but with no external dependencies. Targets amateur-precision (a few
 * milliseconds for sidereal time, sub-arcsecond for obliquity) — delta-T
 * and leap-second corrections are intentionally omitted; they are below
 * the precision floor of every calling subsystem in this package.
 *
 * @since 0.2.0
 */

/** Julian Date of the J1900.0 epoch. */
export const J1900 = 2_415_020;

/** Julian Date of the Unix epoch (1970-01-01T00:00:00Z). */
export const J1970 = 2_440_587.5;

/** Julian Date of the J2000.0 epoch (2000-01-01T12:00:00Z). */
export const J2000 = 2_451_545;

/** Equatorial radius of the Earth in metres (WGS-84). */
export const EARTH_RADIUS = 6_378_137;

/** One astronomical unit in metres. */
export const AU_IN_METERS = 149_597_870_700;

/** Number of seconds in a Julian day. */
export const SECONDS_IN_DAY = 86_400;

/**
 * Convert a Greenwich Sidereal Time (decimal hours) on the calendar
 * date of `referenceDate` back to UTC.
 *
 * @since 0.2.0
 */
export function convertGreenwichSiderealTimeToUniversalTime(
  GSTHours: number,
  referenceDate: Date,
): Date {
  const localDayStart = new Date(
    referenceDate.getTime() + referenceDate.getTimezoneOffset() * 60_000,
  );
  const dayStartUtc = new Date(
    Date.UTC(
      localDayStart.getFullYear(),
      localDayStart.getMonth(),
      localDayStart.getDate(),
      0,
      0,
      0,
      0,
    ),
  );
  const yearStartUtc = new Date(
    Date.UTC(localDayStart.getFullYear(), 1, 1, 0, 0, 0, 0),
  );
  const J0 = getJulianDate(yearStartUtc) - 1;
  const daysIntoYear = getJulianDate(dayStartUtc) - J0;
  const T = (J0 - 2_415_020) / 36_525;
  const D =
    24 -
    (6.646_065_6 + 2400.051_262 * T + 2.581e-5 * T ** 2) +
    24 * (localDayStart.getFullYear() - 1900);
  let n = 0.065_709_8 * daysIntoYear - D;
  if (n < 0) n += 24;
  if (n > 24) n -= 24;
  let s = GSTHours - n;
  if (s < 0) s += 24;
  const r = 0.997_27 * s;
  const hours = Math.floor(r);
  const minutes = Math.floor((r - hours) * 60);
  const seconds = Math.floor(((r - hours) * 60 - minutes) * 60);
  const milliseconds = Math.floor(
    (((r - hours) * 60 - minutes) * 60 - seconds) * 1000,
  );
  return new Date(
    localDayStart.getFullYear(),
    localDayStart.getMonth(),
    localDayStart.getDate(),
    hours,
    minutes,
    seconds,
    milliseconds,
  );
}

/**
 * UTC `Date` for a Julian Date.
 *
 * @since 0.2.0
 */
export function convertJulianDateToUTC(JD: number): Date {
  return new Date((JD - J1970) * 86_400_000);
}

/**
 * Convert a Local Sidereal Time (decimal hours) at the given observer
 * back to Greenwich Sidereal Time (decimal hours `[0, 24)`).
 *
 * @since 0.2.0
 */
export function convertLocalSiderealTimeToGreenwichSiderealTime(
  LSTHours: number,
  observer: { longitude: number },
): number {
  let GST = LSTHours - observer.longitude / 15;
  if (GST < 0) GST += 24;
  if (GST > 24) GST -= 24;
  return GST;
}

/**
 * Days elapsed since J2000.0.
 *
 * @since 0.2.0
 */
export function daysSinceJ2000(date: Date): number {
  return getJulianDate(date) - J2000;
}

/**
 * Greenwich (Mean) Sidereal Time at `date`, in decimal hours.
 *
 * Returns hours in `[0, 24)`. Computed from the standard sidereal-time
 * polynomial referenced to the previous UT noon, then advanced for the
 * current UT fraction of a day at the sidereal-to-solar rate.
 *
 * @since 0.2.0
 */
export function getGreenwichSiderealTime(date: Date): number {
  const JD = getJulianDate(date);
  const T = (Math.floor(JD - 0.5) + 0.5 - J2000) / 36_525;
  let GST0 = (6.697_374_558 + 2400.051_336 * T + 0.000_025_862 * T ** 2) % 24;
  if (GST0 < 0) GST0 += 24;
  const fractionalUtHours =
    (date.getUTCHours() +
      date.getUTCMinutes() / 60 +
      date.getUTCSeconds() / 3600 +
      date.getUTCMilliseconds() / 3_600_000) *
    1.002_737_909;
  let total = (GST0 + fractionalUtHours) % 24;
  if (total < 0) total += 24;
  return total;
}

/**
 * Hour angle (degrees, `[0, 360)`) of an object with right ascension
 * `raDeg` for an observer at longitude `longitudeDeg` at `date`.
 *
 * @since 0.2.0
 */
export function getHourAngle(
  date: Date,
  longitudeDeg: number,
  raDeg: number,
): number {
  let HA = getLocalSiderealTime(date, longitudeDeg) * 15 - raDeg;
  if (HA < 0) HA += 360;
  return HA;
}

/**
 * Julian centuries elapsed since J2000.0.
 *
 * @since 0.2.0
 */
export function getJulianCenturiesSinceJ2000(date: Date): number {
  return daysSinceJ2000(date) / 36_525;
}

/**
 * Julian Date corresponding to a UTC instant.
 *
 * @since 0.2.0
 */
export function getJulianDate(date: Date): number {
  return date.getTime() / 86_400_000 + J1970;
}

/**
 * Local (Mean) Sidereal Time at `date` for the supplied longitude, in
 * decimal hours `[0, 24)`. Longitude is in decimal degrees, east positive.
 *
 * @since 0.2.0
 */
export function getLocalSiderealTime(date: Date, longitudeDeg: number): number {
  let n = (getGreenwichSiderealTime(date) + longitudeDeg / 15) / 24;
  n -= Math.floor(n);
  if (n < 0) n += 1;
  return 24 * n;
}

/**
 * Mean obliquity of the ecliptic at `date`, in degrees.
 *
 * Uses the standard low-precision polynomial (good to a few hundredths
 * of an arcsecond from 1800 to 2100). Does not include nutation; the
 * caller should add Δε if they need true obliquity.
 *
 * @since 0.2.0
 */
export function getObliquityOfTheEcliptic(date: Date): number {
  const T = getJulianCenturiesSinceJ2000(date);
  return (
    23.439_292 - (46.845 * T + 0.000_59 * T ** 2 + 1.813e-6 * T ** 3) / 3600
  );
}
