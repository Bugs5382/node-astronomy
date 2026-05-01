import {
  AzimuthWindow,
  TDirection,
} from "@/astronomicalObject/celestial/constellations/types";
import { normalizeDegrees360 } from "@/util/refraction";

/**
 * Width of the window emitted when the consumer passes a single compass
 * point (e.g. `'N'` → ±45° around 0°).
 *
 * @internal
 */
const COMPASS_POINT_HALF_WIDTH_DEG = 45;

/**
 * Canonical centre azimuth for each compass alias the parser accepts.
 * Both short (`'N'`) and long (`'north'`) forms map here.
 *
 * @internal
 */
const COMPASS_AZIMUTH: Record<string, number> = {
  e: 90,
  east: 90,
  n: 0,
  ne: 45,
  north: 0,
  "north-east": 45,
  "north-west": 315,
  nw: 315,
  s: 180,
  se: 135,
  south: 180,
  "south-east": 135,
  "south-west": 225,
  sw: 225,
  w: 270,
  west: 270,
};

/**
 * Hardcoded canonical pairs for opposing cardinal directions. These are
 * exactly 180° apart, so the "shorter arc" rule is ambiguous — we pick
 * conventions that match how a user reading a horizontal site header
 * left-to-right typically thinks about the sky:
 *
 * - `west-east` is the **southern** half-dome (a south-facing observer
 *   reads west on the left and east on the right).
 * - `east-west` is the **northern** half-dome (mirror of the above).
 * - `north-south` is the **eastern** half (an east-facing observer
 *   reads north on the left and south on the right).
 * - `south-north` is the **western** half (mirror of `north-south`).
 *
 * @internal
 */
const CARDINAL_PAIR_WINDOWS: Record<string, AzimuthWindow> = {
  // E (90) sweeping through N (0/360) to W (270): wraps through 0°.
  "east-west": { azimuthMax: 90, azimuthMin: 270 },
  // N (0) sweeping through E (90) to S (180): no wrap.
  "north-south": { azimuthMax: 180, azimuthMin: 0 },
  // S (180) sweeping through W (270) back to N (0/360): wraps through 0°.
  "south-north": { azimuthMax: 0, azimuthMin: 180 },
  // W (270) sweeping through S (180) to E (90): no wrap.
  "west-east": { azimuthMax: 270, azimuthMin: 90 },
};

/**
 * Parse a {@link TDirection} into a normalised {@link AzimuthWindow}.
 *
 * Rules:
 *  - Single compass point (`'N'`, `'NE'`, ...) → ±45° around its azimuth.
 *  - Antipodal cardinal pair (`'west-east'`, `'east-west'`,
 *    `'north-south'`, `'south-north'`) → use the explicit table above.
 *  - Other kebab pairs → sweep along the shorter compass arc.
 *  - Explicit `{ azimuthMin, azimuthMax }` → returned as-is, with both
 *    components normalised to `[0, 360)`.
 *
 * @since 0.2.0
 * @param direction - The user-supplied direction.
 * @returns Normalised azimuth window, or `undefined` if the input
 *   cannot be parsed.
 */
export function directionToAzimuthWindow(
  direction: TDirection,
): AzimuthWindow | undefined {
  if (typeof direction === "object") {
    return {
      azimuthMax: normalizeDegrees360(direction.azimuthMax),
      azimuthMin: normalizeDegrees360(direction.azimuthMin),
    };
  }
  const trimmed = direction.trim().toLowerCase();
  if (!trimmed.includes("-")) {
    const center = compassAzimuth(trimmed);
    if (center === undefined) return undefined;
    return {
      azimuthMax: normalizeDegrees360(center + COMPASS_POINT_HALF_WIDTH_DEG),
      azimuthMin: normalizeDegrees360(center - COMPASS_POINT_HALF_WIDTH_DEG),
    };
  }
  // Antipodal cardinal pairs use the hardcoded table (handles ambiguous
  // 180° sweeps). Accept short and long forms.
  const cardinal = CARDINAL_PAIR_WINDOWS[trimmed];
  if (cardinal) return cardinal;
  const longForm = trimmed
    .replaceAll(/\bw\b/g, "west")
    .replaceAll(/\be\b/g, "east")
    .replaceAll(/\bn\b/g, "north")
    .replaceAll(/\bs\b/g, "south");
  const cardinalLong = CARDINAL_PAIR_WINDOWS[longForm];
  if (cardinalLong) return cardinalLong;

  // Otherwise fall back to shorter-arc parsing.
  const lastDash = trimmed.lastIndexOf("-");
  const lhs = trimmed.slice(0, lastDash);
  const rhs = trimmed.slice(lastDash + 1);
  const firstAttempt = pairToWindow(lhs, rhs);
  if (firstAttempt) return firstAttempt;
  const firstDash = trimmed.indexOf("-");
  return pairToWindow(
    trimmed.slice(0, firstDash),
    trimmed.slice(firstDash + 1),
  );
}

/**
 * Whether a given azimuth (degrees, in `[0, 360)`) falls inside the
 * supplied window. Wrap-aware: if `azimuthMax < azimuthMin`, the window
 * is interpreted as the arc from `azimuthMin` going clockwise through
 * 360° to `azimuthMax`.
 *
 * @since 0.2.0
 * @param azimuthDeg - Azimuth in degrees, `[0, 360)`.
 * @param window - Azimuth window to test against.
 */
export function isInWindow(azimuthDeg: number, window: AzimuthWindow): boolean {
  const az = normalizeDegrees360(azimuthDeg);
  const min = normalizeDegrees360(window.azimuthMin);
  const max = normalizeDegrees360(window.azimuthMax);
  if (min === max) return true; // full sweep
  if (min < max) return az >= min && az <= max;
  // Wraps through 0°.
  return az >= min || az <= max;
}

/**
 * Resolve a single compass alias to its centre azimuth in degrees.
 * Returns `undefined` if the alias isn't recognised.
 *
 * @internal
 */
function compassAzimuth(alias: string): number | undefined {
  return COMPASS_AZIMUTH[alias.toLowerCase()];
}

/**
 * Given two compass aliases, return an azimuth window that sweeps from
 * the first to the second along the shorter compass arc.
 *
 * Example: `('west', 'east')` returns `{ azimuthMin: 270, azimuthMax: 90 }`
 * with the wrapping-through-180° convention. `('east', 'west')` returns
 * `{ azimuthMin: 90, azimuthMax: 270 }` (going through 0°).
 *
 * @internal
 */
function pairToWindow(from: string, to: string): AzimuthWindow | undefined {
  const fromAz = compassAzimuth(from);
  const toAz = compassAzimuth(to);
  if (fromAz === undefined || toAz === undefined) return undefined;
  const direction = shorterDirection(fromAz, toAz);
  if (direction === "cw") {
    // Sweep from fromAz clockwise (increasing) to toAz. This may wrap
    // past 360 — `azimuthMax < azimuthMin` is interpreted as wrapping
    // by `isInWindow`, so we keep the literal min/max here.
    return { azimuthMax: toAz, azimuthMin: fromAz };
  }
  // Counter-clockwise sweep from fromAz back through smaller azimuths
  // to toAz. Encoding-wise this is identical to the clockwise sweep
  // from toAz to fromAz, so we report (min: toAz, max: fromAz) which
  // makes the window "everything between toAz and fromAz going through
  // the smaller side".
  return { azimuthMax: fromAz, azimuthMin: toAz };
}

/**
 * Decide which way to sweep from `fromAz` to `toAz` (clockwise vs
 * counterclockwise) based on the *shorter* arc on the compass. Returns
 * `"cw"` when going clockwise (azimuth increasing through 360 if needed)
 * is shorter, `"ccw"` otherwise.
 *
 * @internal
 */
function shorterDirection(fromAz: number, toAz: number): "ccw" | "cw" {
  let cwSpan = (toAz - fromAz + 360) % 360;
  // If the two points are diametrically opposite, default to clockwise.
  if (cwSpan === 0) cwSpan = 360;
  return cwSpan <= 180 ? "cw" : "ccw";
}
