import { toUTCDate } from "@/helper";
import { TimeCalc } from "@/time/timeCalc";
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
export class TimeOfInterest extends TimeCalc {
  /**
   * The date/time of the point in which all other calculations are done.
   * This will be in UTC format even if you pass your local date object in.
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
    super();

    if (props.T != null) {
      this.T = props.T;
      this.jd = this._getJulianDayFromCenturies(this.T);
      this.time = this._julianDateToDate(this.jd);
    } else {
      if (props.time) {
        this.time = toUTCDate(props.time);
      } else if (props.jd) {
        this.time = this._julianDateToDate(props.jd);
      } else {
        this.time = toUTCDate(new Date());
        this.time = toUTCDate(this.time);
      }

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
    return this._timeToJulianDay(this.time);
  }
  /**
   * Calculates the Julian Day number from the current time.
   * @since 0.1.0
   */
  async toJulianDayAsync() {
    return this._timeToJulianDay(this.time);
  }
  /**
   * Calculates the Julian Day number from the current time.
   * @since 0..1.0
   */
  isLeapYear() {
    return this._isLeapYear(this.time);
  }
  /**
   * Calculates the Julian Day number from the current time.
   * @since 0.1.0
   */
  async isLeapYearAsync() {
    return this._isLeapYear(this.time);
  }
  /**
   * @since 0.1.0
   */
  getDayOfYear() {
    return this._getDayOfYear(this.time);
  }

  /**
   * @since 0.1.0
   */
  async getDayOfYearAsync() {
    return this._getDayOfYear(this.time);
  }

  /**
   * @since 0.1.0
   */
  getDayOfWeek() {
    return this._getDayOfWeek(this.jd!);
  }

  /**
   * @since 0.1.0
   */
  async getDayOfWeekAsync() {
    return this._getDayOfWeek(this.jd!);
  }
}

export default TimeOfInterest;
