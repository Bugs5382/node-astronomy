import { toUTCDate } from "@/helper";
import { TimeCalc } from "@/time/timeCalc";
import { ITimeOfInterest } from "@/time/types";

/**
 * Time of Interest
 * @summary Generate the object in which subductions do most of the work.
 * @example
 * const toi = new TimeOfInterest(new Date())
 * @remarks This class creates the most important 'toi' (Time of Interest), which all other functions and calculations depend on.
 * For instance, to determine where the Moon is at a certain time, the time must be converted into a mathematical format.
 * @since 0.1.0
 */
export class TimeOfInterest extends TimeCalc {
  private time!: Date;

  /**
   * Julian Date
   * @since 0.1.0
   */
  public readonly jd: number | undefined;

  /**
   * Number of Julian centuries (T) since J2000.0, calculated from the Julian Date (JD).
   * @since 0.1.0
   */
  public readonly T!: number;

  /**
   * Constructs a new TimeOfInterest instance.
   * @param props - Optional time input object.
   * @remarks
   * Priority:
   * - If `T` is provided, it takes precedence and JD and time are derived.
   * - Else if `time` is provided, JD and T are derived.
   * - Else if `jd` is provided, T and time are derived.
   * - Else the current system time is used.
   * @since 0.1.0
   */
  constructor(props: ITimeOfInterest = {}) {
    super();

    if (props.T != null) {
      this.T = props.T;
      this.jd = this._getJulianDayFromCenturies(this.T);
      this.time = this.julianDateToDate();
    } else if (props.time) {
      this.time = toUTCDate(props.time);
      this.jd = this.toJulianDay();
      this.T = this.getJulianCenturies();
    } else if (props.jd) {
      this.jd = props.jd;
      this.time = this.julianDateToDate();
      this.T = this.getJulianCenturies();
    } else {
      this.time = toUTCDate(new Date());
      this.jd = this.toJulianDay();
      this.T = this.getJulianCenturies();
    }
  }

  julianDateToDate() {
    return this._julianDateToDate(this.jd!);
  }

  async julianDateToDateAsync() {
    return this._julianDateToDate(this.jd!);
  }

  /**
   * Calculates Julian centuries since J2000.0 for a given Julian Date.
   * @returns The number of Julian centuries since J2000.0.
   * @since 0.1.0
   */
  getJulianCenturies(): number {
    const epoch = this._getEpoch(this.jd!);
    return (this.jd! - epoch) / 36525.0;
  }

  /**
   * Converts a Date object to its Julian Day equivalent.
   * @returns Julian Day number.
   * @since 0.1.0
   */
  toJulianDay(): number {
    return this._timeToJulianDay(this.time!);
  }

  /**
   * Asynchronously converts a Date object to its Julian Day equivalent.
   * @returns Promise resolving to Julian Day number.
   * @since 0.1.0
   */
  async toJulianDayAsync(): Promise<number> {
    return this._timeToJulianDay(this.time!);
  }

  /**
   * Determines if the current year is a leap year.
   * @returns True if leap year, otherwise false.
   * @since 0.1.0
   */
  isLeapYear(): boolean {
    return this._isLeapYear(this.time);
  }

  /**
   * Asynchronously determines if the current year is a leap year.
   * @returns Promise resolving to true if leap year.
   * @since 0.1.0
   */
  async isLeapYearAsync(): Promise<boolean> {
    return this._isLeapYear(this.time);
  }

  /**
   * Gets the day of the year (1–366) from the internal date.
   * @returns Day of the year.
   * @since 0.1.0
   */
  getDayOfYear(): number {
    return this._getDayOfYear(this.time);
  }

  /**
   * Asynchronously gets the day of the year.
   * @returns Promise resolving to day of the year.
   * @since 0.1.0
   */
  async getDayOfYearAsync(): Promise<number> {
    return this._getDayOfYear(this.time);
  }

  /**
   * Gets the day of the week for the current Julian Date.
   * @returns Day of the week (0=Sunday, 6=Saturday).
   * @since 0.1.0
   */
  getDayOfWeek(): number {
    return this._getDayOfWeek(this.jd!);
  }

  /**
   * Asynchronously gets the day of the week.
   * @returns Promise resolving to day of the week.
   * @since 0.1.0
   */
  async getDayOfWeekAsync(): Promise<number> {
    return this._getDayOfWeek(this.jd!);
  }

  /**
   * Gets the Julian Day Number at 0h UTC (start of day).
   * @returns Julian Day number at 0h UTC.
   * @since 0.1.0
   */
  getJulianDay0(): number {
    return this._julianDay2julianDay0(this.jd!);
  }

  /**
   * Asynchronously gets the Julian Day at 0h UTC.
   * @returns Promise resolving to Julian Day number at 0h UTC.
   * @since 0.1.0
   */
  async getJulianDay0Async(): Promise<number> {
    return this._julianDay2julianDay0(this.jd!);
  }

  /**
   * Gets the Julian centuries (T) since J2000.0.
   * @returns Julian centuries since J2000.0.
   * @since 0.1.0
   */
  getJulianCenturiesJ2000(): number {
    return this.T!;
  }

  /**
   * Asynchronously gets the Julian centuries since J2000.0.
   * @returns Promise resolving to Julian centuries since J2000.0.
   * @since 0.1.0
   */
  async getJulianCenturiesJ2000Async(): Promise<number> {
    return this.T!;
  }

  /**
   * Gets the Julian millennia (thousands of years) since J2000.0.
   * @returns Julian millennia since J2000.0.
   * @since 0.1.0
   */
  getJulianMillenniaJ2000(): number {
    return this._getJulianMillenniaJ2000(this.jd!);
  }

  /**
   * Asynchronously gets the Julian millennia since J2000.0.
   * @returns Promise resolving to Julian millennia since J2000.0.
   * @since 0.1.0
   */
  async getJulianMillenniaJ2000Async(): Promise<number> {
    return this._getJulianMillenniaJ2000(this.jd!);
  }

  /**
   * Computes ΔT (Delta T), the difference between Terrestrial Time (TT) and Universal Time (UT1).
   * @returns ΔT value in seconds.
   * @since 0.1.0
   */
  getDeltaT(): number {
    return this._getDeltaT(
      this.time.getUTCFullYear(),
      this.time.getUTCMonth() + 1,
    );
  }

  /**
   * Asynchronously computes ΔT (Delta T).
   * @returns Promise resolving to ΔT value in seconds.
   * @since 0.1.0
   */
  async getDeltaTASync(): Promise<number> {
    return this._getDeltaT(
      this.time.getUTCFullYear(),
      this.time.getUTCMonth() + 1,
    );
  }

  // Uncomment if needed later
  /*
  getGreenwichMeanSiderealTime() {
    return this._getGreenwichMeanSiderealTime(this.T!);
  }

  getGreenwichMeanSiderealTimeAsync() {
    return this._getGreenwichMeanSiderealTime(this.T!);
  }

  getGreenwichApparentSiderealTime() {
    return this._getGreenwichApparentSiderealTime(this.T!)
  }

  getGreenwichApparentSiderealTimeAsync() {
    return this._getGreenwichApparentSiderealTime(this.T!)
  }
  */
}

export default TimeOfInterest;
