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
