/**
 * Body visibility predicates.
 *
 * Vendored from `@observerly/astrometry`'s `transit.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import {
  convertEquatorialToHorizontal,
  type EquatorialCoordinate,
  type GeographicCoordinate,
  type HorizontalCoordinate,
} from "@/util/coordinates";

/**
 * Whether a body is above `horizon` (degrees) for `observer` at the
 * supplied instant. Accepts either an equatorial or horizontal target;
 * if equatorial, performs the conversion at the supplied time.
 *
 * @since 0.2.0
 */
export function isBodyAboveHorizon(
  date: Date,
  observer: GeographicCoordinate,
  target: EquatorialCoordinate | HorizontalCoordinate,
  horizon = 0,
): boolean {
  let altitude = Number.NEGATIVE_INFINITY;
  if (isEquatorial(target)) {
    altitude = convertEquatorialToHorizontal(date, observer, target).alt;
  } else if (isHorizontal(target)) {
    altitude = target.alt;
  }
  return altitude > horizon;
}

/**
 * Whether a body with declination `target.dec` is circumpolar
 * (never sets) for an observer at `observer.latitude`, given a
 * `horizon` altitude offset (degrees).
 *
 * @since 0.2.0
 */
export function isBodyCircumpolar(
  observer: GeographicCoordinate,
  target: EquatorialCoordinate,
  horizon = 0,
): boolean {
  const { latitude } = observer;
  const { dec } = target;
  return latitude >= horizon ? latitude + dec > 90 : latitude + dec < -90;
}

/**
 * Whether a body with declination `target.dec` is *visible at all*
 * (i.e. its diurnal arc reaches above the horizon) for an observer at
 * `observer.latitude`.
 *
 * @since 0.2.0
 */
export function isBodyVisible(
  observer: GeographicCoordinate,
  target: EquatorialCoordinate,
  horizon = 0,
): boolean {
  const { latitude } = observer;
  const { dec } = target;
  return 90 - Math.abs(latitude - dec) > horizon;
}

function isEquatorial(t: unknown): t is EquatorialCoordinate {
  return (
    typeof t === "object" &&
    t !== null &&
    typeof (t as { dec: unknown }).dec === "number" &&
    typeof (t as { ra: unknown }).ra === "number"
  );
}

function isHorizontal(t: unknown): t is HorizontalCoordinate {
  return (
    typeof t === "object" &&
    t !== null &&
    typeof (t as { alt: unknown }).alt === "number" &&
    typeof (t as { az: unknown }).az === "number"
  );
}
