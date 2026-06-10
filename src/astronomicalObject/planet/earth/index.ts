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
import {
  getEccentricityOfOrbit,
  getObliquityOfEcliptic,
} from "@/astrometry/earth/orbit";
import Planet from "@/astronomicalObject/planet";
import { IPlanetProperties } from "@/astronomicalObject/planet/properties";
import { IHeliocentricPosition } from "@/astronomicalObject/planet/types";

/**
 * Earth — repurposed as a holder for orbital information about our own
 * planet. Earth deliberately does NOT have a `PlanetTimes` form (rise/
 * set/alt-az from Earth's own surface looking at Earth is undefined).
 *
 * Use this class when you want to know things like:
 * - Earth–Sun distance right now (heliocentric radius).
 * - Eccentricity of Earth's orbit on a given date.
 * - Obliquity of the ecliptic on a given date (varies slowly with time).
 * - Where Earth is in its orbit (heliocentric ecliptic position).
 *
 * @since 0.2.0
 * @example
 * ```ts
 * const earth = new Earth({ time: new Date("2026-04-30T22:00:00Z") });
 * earth.eccentricity();          // ≈ 0.0167
 * earth.obliquityOfEcliptic();   // ≈ 23.44° at J2000
 * earth.distanceFromSun();       // ~1 AU
 * earth.heliocentricPosition();  // { longitude, latitude, radius }
 * ```
 */
export class Earth extends Planet {
  /**
   * Build an Earth snapshot. No observer parameters — Earth's
   * methods are about Earth's *orbit*, not where Earth is in your
   * sky.
   *
   * @since 0.2.0
   * @param properties - Optional `time` (defaults to `new Date()`).
   */
  constructor(properties?: Omit<IPlanetProperties, "planet">) {
    super({ ...properties, planet: "earth" });
  }

  /**
   * Earth's distance from the Sun in AU at the supplied (or snapshot)
   * instant. Equivalent to `heliocentricPosition(date).radius`.
   *
   * Typical values: ≈ 0.983 AU at perihelion (early January) and
   * ≈ 1.017 AU at aphelion (early July).
   *
   * @since 0.2.0
   * @param date - Optional override.
   */
  distanceFromSun(date?: Date): number {
    return this.heliocentricPosition(date).radius;
  }

  /**
   * Eccentricity of Earth's orbit on the supplied (or snapshot) date.
   * Currently `≈ 0.0167`, decreasing slowly over millennia.
   *
   * @since 0.2.0
   * @param date - Optional override.
   */
  eccentricity(date?: Date): number {
    return getEccentricityOfOrbit(date ?? this.time);
  }

  /**
   * Heliocentric ecliptic position of Earth.
   *
   * @since 0.2.0
   * @param date - Optional override.
   */
  override heliocentricPosition(date?: Date): IHeliocentricPosition {
    return super.heliocentricPosition(date);
  }

  /**
   * Obliquity of the ecliptic — angle between Earth's equatorial plane
   * and the ecliptic — on the supplied (or snapshot) date. Currently
   * `≈ 23.44°`, decreasing very slowly.
   *
   * @since 0.2.0
   * @param date - Optional override.
   */
  obliquityOfEcliptic(date?: Date): number {
    return getObliquityOfEcliptic(date ?? this.time);
  }
}

export default Earth;
