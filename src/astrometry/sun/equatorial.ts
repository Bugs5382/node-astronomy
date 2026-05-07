/**
 * Solar equatorial position.
 *
 * @since 0.2.0
 */

import { getSolarEclipticCoordinate } from "@/astrometry/sun/ecliptic";
import {
  convertEclipticToEquatorial,
  type EquatorialCoordinate,
} from "@/util/coordinates";

/**
 * Solar geocentric equatorial coordinate at `date`. Returns
 * `{ ra, dec }` in degrees with RA in `[0, 360)`.
 *
 * @since 0.2.0
 */
export function getSolarEquatorialCoordinate(date: Date): EquatorialCoordinate {
  return convertEclipticToEquatorial(date, getSolarEclipticCoordinate(date));
}
