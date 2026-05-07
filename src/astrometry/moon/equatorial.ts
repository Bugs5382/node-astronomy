/**
 * Lunar equatorial position.
 *
 * Vendored from `@observerly/astrometry`'s `moon.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * Note that astrometry's `getLunarEquatorialCoordinate` performs the
 * ecliptic→equatorial rotation inline (rather than calling
 * `convertEclipticToEquatorial`). The two paths are mathematically
 * equivalent; we keep the inline form here so the port stays
 * bit-for-bit faithful to upstream.
 *
 * @since 0.2.0
 */

import { getLunarEclipticCoordinate } from "@/astrometry/moon/ecliptic";
import {
  radiansToDegrees as deg,
  degreesToRadians as rad,
} from "@/util/angles";
import { type EquatorialCoordinate } from "@/util/coordinates";
import { getObliquityOfTheEcliptic } from "@/util/time";

/**
 * Lunar geocentric equatorial coordinate at `date`.
 *
 * @since 0.2.0
 */
export function getLunarEquatorialCoordinate(date: Date): EquatorialCoordinate {
  const { β, λ } = getLunarEclipticCoordinate(date);
  const ε = rad(getObliquityOfTheEcliptic(date));
  const ra = deg(
    Math.atan2(
      Math.sin(rad(λ)) * Math.cos(ε) - Math.tan(rad(β)) * Math.sin(ε),
      Math.cos(rad(λ)),
    ),
  );
  const dec = deg(
    Math.asin(
      Math.sin(rad(β)) * Math.cos(ε) +
        Math.cos(rad(β)) * Math.sin(ε) * Math.sin(rad(λ)),
    ),
  );
  return { dec, ra };
}
