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
 * Bennett's atmospheric-refraction model with a horizon clamp.
 *
 * Given a body's *geometric* altitude (degrees above horizon, ignoring the
 * atmosphere), returns the refraction correction in degrees that an
 * observer at sea level under standard conditions perceives. Adding the
 * result to the geometric altitude yields the apparent altitude.
 *
 * Formula (Bennett 1982):
 *   R = cot(h + 7.31 / (h + 4.4))  [arcminutes]
 * where `h` is the geometric altitude in degrees. The formula has a
 * singularity at `h = -4.4°` and produces unphysical negative values
 * below roughly `h = -2°`, so this wrapper clamps the result to `0` when
 * `h < -2°`. That's the right physical answer too — once a body is well
 * below the horizon, atmospheric refraction stops being meaningful for
 * apparent-position purposes.
 *
 * Accuracy: ≈ 0.07′ across the entire visible sky (h ≥ 0).
 *
 * @param geometricAltitudeDeg - Geometric altitude in degrees.
 * @returns Refraction correction in degrees (always ≥ 0).
 * @since 0.2.0
 */
export function bennettRefractionDegrees(geometricAltitudeDeg: number): number {
  if (geometricAltitudeDeg < -2) return 0;
  const radPerDeg = Math.PI / 180;
  const inner =
    (geometricAltitudeDeg + 7.31 / (geometricAltitudeDeg + 4.4)) * radPerDeg;
  const arcminutes = 1 / Math.tan(inner);
  // The formula can still go slightly negative just above the clamp;
  // guard the final value so callers never see a negative correction.
  return Math.max(0, arcminutes / 60);
}

export { normalizeDegrees360 } from "@/util/angles";
