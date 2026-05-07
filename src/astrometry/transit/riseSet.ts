/**
 * Body rise / set search.
 *
 * Vendored from `@observerly/astrometry`'s `transit.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import {
  isBodyCircumpolar,
  isBodyVisible,
} from "@/astrometry/transit/circumpolar";
import { getBodyTransit } from "@/astrometry/transit/hourAngle";
import { type TransitInstance } from "@/astrometry/types";
import {
  type EquatorialCoordinate,
  type GeographicCoordinate,
} from "@/util/coordinates";
import {
  convertGreenwichSiderealTimeToUniversalTime,
  convertLocalSiderealTimeToGreenwichSiderealTime,
} from "@/util/time";

/**
 * Next UTC rise of `target` for `observer` at or after `date`.
 *
 * Returns `false` for circumpolar bodies that never set (since the rise
 * is undefined in that case the upstream contract is "always above —
 * `true`"; we follow it bit-for-bit). Returns `false` again when the
 * body is permanently below the horizon. Otherwise returns a
 * `TransitInstance` with the next-rise UTC datetime.
 *
 * Search strategy: compute today's transit window; if rise has already
 * happened, recurse one day forward. Maximum recursion depth is bounded
 * by the diurnal-arc geometry (always either succeeds or returns false).
 *
 * @since 0.2.0
 */
export function getBodyNextRise(
  date: Date,
  observer: GeographicCoordinate,
  target: EquatorialCoordinate,
  horizon = 0,
): false | TransitInstance {
  const tomorrow = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() + 1,
      0,
      0,
      0,
      0,
    ),
  );
  if (isBodyCircumpolar(observer, target, horizon)) return false;
  if (!isBodyVisible(observer, target, horizon)) return false;
  const transit = getBodyTransit(observer, target);
  if (!transit) return getBodyNextRise(tomorrow, observer, target, horizon);
  const LSTr = transit.LSTr;
  const GSTr = convertLocalSiderealTimeToGreenwichSiderealTime(LSTr, observer);
  const utcRise = convertGreenwichSiderealTimeToUniversalTime(GSTr, date);
  if (utcRise.getTime() < date.getTime()) {
    return getBodyNextRise(tomorrow, observer, target, horizon);
  }
  return {
    az: transit.R,
    datetime: utcRise,
    GST: GSTr,
    LST: LSTr,
  };
}

/**
 * Next UTC set of `target` for `observer` at or after `date`.
 *
 * Returns `true` for circumpolar bodies (matching upstream contract:
 * always above the horizon ⇒ no future "set"). Returns `false` for
 * always-below bodies. Otherwise returns a `TransitInstance`.
 *
 * @since 0.2.0
 */
export function getBodyNextSet(
  date: Date,
  observer: GeographicCoordinate,
  target: EquatorialCoordinate,
  horizon = 0,
): boolean | TransitInstance {
  const tomorrow = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate() + 1,
      0,
      0,
      0,
      0,
    ),
  );
  if (isBodyCircumpolar(observer, target, horizon)) return true;
  if (!isBodyVisible(observer, target, horizon)) return false;
  const transit = getBodyTransit(observer, target);
  if (!transit) return getBodyNextSet(tomorrow, observer, target, horizon);
  const LSTs = transit.LSTs;
  const GSTs = convertLocalSiderealTimeToGreenwichSiderealTime(LSTs, observer);
  const utcSet = convertGreenwichSiderealTimeToUniversalTime(GSTs, date);
  if (utcSet < date) {
    return getBodyNextSet(tomorrow, observer, target, horizon);
  }
  return {
    az: transit.S,
    datetime: utcSet,
    GST: GSTs,
    LST: LSTs,
  };
}
