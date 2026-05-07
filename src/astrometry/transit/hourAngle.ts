/**
 * Body rise/set hour-angle helpers.
 *
 * Vendored from `@observerly/astrometry`'s `transit.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import {
  radiansToDegrees as deg,
  degreesToRadians as rad,
} from "@/util/angles";
import {
  type EquatorialCoordinate,
  type GeographicCoordinate,
} from "@/util/coordinates";

/**
 * Geometry check: does this body rise and set at `observer.latitude`?
 *
 * Returns the intermediate `Ar = sin(δ) / cos(φ)` and
 * `H1 = tan(φ) · tan(δ)` values when the body does cross the horizon,
 * or `false` when it's circumpolar / always-below.
 *
 * @since 0.2.0
 */
export function doesBodyRiseOrSet(
  observer: GeographicCoordinate,
  target: EquatorialCoordinate,
): { Ar: number; H1: number } | false {
  const { latitude } = observer;
  const { dec } = target;
  const Ar = Math.sin(rad(dec)) / Math.cos(rad(latitude));
  if (Math.abs(Ar) > 1) return false;
  const H1 = Math.tan(rad(latitude)) * Math.tan(rad(dec));
  if (Math.abs(H1) > 1) return false;
  return { Ar, H1 };
}

/**
 * Compute the body's rise/set Local Sidereal Times and corresponding
 * azimuths at `observer.latitude`.
 *
 * Returns `{ LSTr, LSTs, R, S }`:
 * - `LSTr` — Local Sidereal Time of rise (decimal hours `[0, 24)`)
 * - `LSTs` — Local Sidereal Time of set (decimal hours `[0, 24)`)
 * - `R`    — azimuth of rise, degrees clockwise from north
 * - `S`    — azimuth of set, degrees clockwise from north
 *
 * Returns `undefined` when the body is circumpolar or never rises.
 *
 * @since 0.2.0
 */
export function getBodyTransit(
  observer: GeographicCoordinate,
  target: EquatorialCoordinate,
):
  | {
      LSTr: number;
      LSTs: number;
      R: number;
      S: number;
    }
  | undefined {
  const raHours = target.ra / 15;
  const decision = doesBodyRiseOrSet(observer, target);
  if (!decision) return undefined;
  const { Ar, H1 } = decision;
  const halfDayHours = deg(Math.acos(-H1)) / 15;
  const azimuthRise = deg(Math.acos(Ar));
  const azimuthSet = 360 - azimuthRise;
  let LSTr = 24 + raHours - halfDayHours;
  if (LSTr > 24) LSTr -= 24;
  let LSTs = raHours + halfDayHours;
  if (LSTs > 24) LSTs -= 24;
  return {
    LSTr,
    LSTs,
    R: azimuthRise,
    S: azimuthSet,
  };
}
