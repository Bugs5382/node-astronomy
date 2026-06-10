/*
MIT License

Copyright (c) __YEAR__ __AUTHOR__

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
import { getLunarDistance } from "@/astrometry/moon/distance";
import { getLunarEquatorialCoordinate } from "@/astrometry/moon/equatorial";
import {
  getNextFullMoon,
  getNextNewMoon,
  isBlueMoon,
  isFullMoon,
  isNewMoon,
} from "@/astrometry/moon/events";
import {
  getLunarAge,
  getLunarIllumination,
  getLunarPhase,
  getLunarPhaseAngle,
} from "@/astrometry/moon/phase";
import AstronomicalObject from "@/astronomicalObject";
import { MoonPhase } from "@/astronomicalObject/moon/enum";
import { IMoonProperties } from "@/astronomicalObject/moon/properties";
import { IEquatorialCoordinate, IMoon } from "@/astronomicalObject/moon/types";
import { normalizeDegrees360 } from "@/util/refraction";

/**
 * Snapshot of the moon at a moment in time. Observer-free — every method
 * either takes an explicit `Date` or falls back to `this.time`.
 *
 * For observer-aware queries (rise/set, alt/az, arc, peak, topocentric
 * angular diameter), use {@link MoonTimes}.
 *
 * @since 0.2.0
 * @example
 * ```ts
 * const moon = new Moon({ time: new Date("2026-04-30T22:00:00Z") });
 * moon.phase();         // e.g. "Waxing Gibbous"
 * moon.illumination();  // 0..1
 * moon.distance();      // km
 * moon.age();           // days since new
 * ```
 */
export class Moon extends AstronomicalObject implements IMoon {
  /**
   * Build a Moon snapshot.
   *
   * @since 0.2.0
   * @param properties - Optional `time` (default: `new Date()`).
   */
  constructor(properties?: IMoonProperties) {
    super("moon", properties);
  }

  /**
   * Days elapsed since the most recent new moon at the supplied or
   * snapshot instant.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   * @returns Lunar age in days, in the range [0, 29.53].
   */
  age(date?: Date): number {
    return getLunarAge(date ?? this.time).age;
  }

  /**
   * Geocentric distance from Earth's centre to the moon's centre.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   * @returns Distance in kilometres (typical range ~356_500–406_700 km).
   *   Astrometry returns metres, so we divide by 1000 here for the more
   *   conventional unit; document any consumer change.
   */
  distance(date?: Date): number {
    return getLunarDistance(date ?? this.time) / 1000;
  }

  /**
   * The moon's geocentric equatorial coordinate (RA / Dec). RA is
   * normalised to `[0, 360)` degrees (astrometry can return signed
   * values).
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   * @returns `{ ra, dec }` in degrees.
   */
  equatorialCoordinate(date?: Date): IEquatorialCoordinate {
    const eq = getLunarEquatorialCoordinate(date ?? this.time);
    return { dec: eq.dec, ra: normalizeDegrees360(eq.ra) };
  }

  /**
   * Fraction of the moon's visible disk that is illuminated. Astrometry
   * returns a percentage (`0..100`); we divide by 100 for the more
   * conventional fractional form.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   * @returns A number in `[0, 1]` (0 = new, 1 = full).
   */
  illumination(date?: Date): number {
    return getLunarIllumination(date ?? this.time) / 100;
  }

  /**
   * Whether the moon is currently inside the "blue moon" window.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  isBlue(date?: Date): boolean {
    return isBlueMoon(date ?? this.time);
  }

  /**
   * Whether the moon is currently at full phase (within astrometry's
   * tolerance).
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  isFull(date?: Date): boolean {
    return isFullMoon(date ?? this.time);
  }

  /**
   * Whether the moon is currently at new phase (within astrometry's
   * tolerance).
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  isNew(date?: Date): boolean {
    return isNewMoon(date ?? this.time);
  }

  /**
   * UTC instant of the next full moon at or after the supplied date.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  nextFullMoon(date?: Date): Date {
    return getNextFullMoon(date ?? this.time);
  }

  /**
   * UTC instant of the next new moon at or after the supplied date.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  nextNewMoon(date?: Date): Date {
    return getNextNewMoon(date ?? this.time);
  }

  /**
   * The named lunar phase (New, WaxingCrescent, ..., WaningCrescent).
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  phase(date?: Date): MoonPhase {
    return getLunarPhase(date ?? this.time) as MoonPhase;
  }

  /**
   * Sun-Earth-Moon angle in degrees. 0° = new (sun-side), 180° = full.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  phaseAngle(date?: Date): number {
    return getLunarPhaseAngle(date ?? this.time);
  }
}

export default Moon;
