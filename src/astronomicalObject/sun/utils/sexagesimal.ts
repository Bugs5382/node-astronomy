import { Degrees, Radian } from "@/astronomicalObject/sun/types";
import { modf } from "@/astronomicalObject/sun/utils/modf";
import { round } from "@/astronomicalObject/sun/utils/round";

export class Angle {
  private angle: Radian = 0;

  /**
   *
   * @param angleOrNeg
   * @param d
   * @param m
   * @param s
   */
  constructor(angleOrNeg: boolean, d: number, m: number, s: number) {
    this._setDMS(angleOrNeg, d, m, s);
  }

  /**
   *
   */
  public rad(): Radian {
    return this.angle;
  }

  /**
   *
   */
  public deg(): Degrees {
    return (this.angle * 180) / Math.PI;
  }

  /**
   *
   */
  public toDMS(): [boolean, number, number, number] {
    return this._degToDMS(this.deg());
  }

  /**
   *
   * @param precision
   */
  public toString(precision: number = 2): string {
    const [neg, d, m, sRaw] = this.toDMS();
    const s = round(sRaw, precision).toString().replace(/^0\./, ".");
    return `${neg ? "-" : ""}${d}°${m}′${s}″`;
  }

  /**
   *
   * @param precision
   */
  public toDegString(precision: number = 4): string {
    const [i, f] = modf(this.deg());
    const s = round(f, precision).toString().replace(/^0\./, ".");
    return `${i}°${s}`;
  }

  /**
   *
   * @param neg
   * @param d
   * @param m
   * @param s
   * @private
   */
  private _DMSToDeg(neg: boolean, d: number, m: number, s: number): number {
    const total = ((d * 60 + m) * 60 + s) / 3600;
    return neg ? -total : total;
  }

  /**
   *
   * @param angle
   * @private
   */
  private _setAngle(angle: number): this {
    this.angle = angle;
    return this;
  }

  /**
   *
   * @param deg
   * @private
   */
  private _degToDMS(deg: number): [boolean, number, number, number] {
    const neg = deg < 0;
    deg = Math.abs(deg);
    const [d, frac] = modf(deg);
    const [m, fracMin] = modf(frac * 60);
    const s = round(fracMin * 60); // optional: round to avoid floating-point imprecision
    return [neg, d, m, s];
  }

  /**
   *
   * @param neg
   * @param d
   * @param m
   * @param s
   * @private
   */
  private _setDMS(
    neg: boolean = false,
    d: number = 0,
    m: number = 0,
    s: number = 0.0,
  ): this {
    this.angle = (this._DMSToDeg(neg, d, m, s) * Math.PI) / 180;
    return this;
  }
}
