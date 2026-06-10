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
/**
 * Angle utilities. All functions are dependency-free and side-effect-free.
 *
 * @since 0.2.0
 */

const RAD_PER_DEG = Math.PI / 180;
const DEG_PER_RAD = 180 / Math.PI;

/**
 * Clamp a declination-style angle to `[-90, 90]` by reflecting through
 * the poles. Mirrors the convention used by the underlying ecliptic →
 * equatorial transform: a value greater than 90° reflects to `180 - x`,
 * and a value less than -90° reflects to `-180 - x`.
 *
 * @since 0.2.0
 */
export function clampDeclination(degrees: number): number {
  if (degrees > 90) return 180 - degrees;
  if (degrees < -90) return -180 - degrees;
  return degrees;
}

/**
 * Convert an angle from degrees to radians.
 *
 * @since 0.2.0
 */
export function degreesToRadians(degrees: number): number {
  return degrees * RAD_PER_DEG;
}

/**
 * Normalise a right-ascension or longitude value to `[0, 360)` degrees.
 *
 * @param degrees - Input angle in degrees, any sign or magnitude.
 * @returns Equivalent angle in `[0, 360)`.
 * @since 0.2.0
 */
export function normalizeDegrees360(degrees: number): number {
  const result = degrees % 360;
  return result < 0 ? result + 360 : result;
}

/**
 * Convert an angle from radians to degrees.
 *
 * @since 0.2.0
 */
export function radiansToDegrees(radians: number): number {
  return radians * DEG_PER_RAD;
}
