import {
  convertEquatorialToHorizontal,
  GeographicCoordinate,
} from "@observerly/astrometry";

import Constellation from "@/astronomicalObject/celestial/constellations";
import { CONSTELLATION_CENTROIDS } from "@/astronomicalObject/celestial/constellations/centroids";
import {
  directionToAzimuthWindow,
  isInWindow,
} from "@/astronomicalObject/celestial/constellations/direction";
import {
  IConstellationVisibilityProperties,
  IVisibleConstellationsQuery,
} from "@/astronomicalObject/celestial/constellations/properties";
import {
  IConstellationHorizontalCoordinate,
  IConstellationName,
  TDirection,
} from "@/astronomicalObject/celestial/constellations/types";

/**
 * Observer-aware view of one constellation. Tells you whether the
 * constellation's centroid is currently above the horizon and inside
 * the supplied direction window.
 *
 * @since 0.2.0
 * @example
 * ```ts
 * const v = new ConstellationVisibility({
 *   constellation: "Orion",
 *   latitude: 40.7128,
 *   longitude: -74.0060,
 *   direction: "west-east",   // southern half-dome
 *   time: new Date("2026-01-15T03:00:00Z"),
 * });
 * v.isVisible();   // boolean — above horizon AND in direction window
 * v.centerAltAz(); // { altitude, azimuth }
 * ```
 */
export class ConstellationVisibility extends Constellation {
  /** Optional direction filter. */
  readonly direction?: TDirection;
  /** Observer latitude in decimal degrees. */
  readonly latitude: number;
  /** Observer longitude in decimal degrees. */
  readonly longitude: number;
  private readonly observer: GeographicCoordinate;

  /**
   * Build a ConstellationVisibility snapshot.
   *
   * @since 0.2.0
   */
  constructor(properties: IConstellationVisibilityProperties) {
    super(properties);
    this.latitude = properties.latitude;
    this.longitude = properties.longitude;
    this.direction = properties.direction;
    this.observer = { latitude: this.latitude, longitude: this.longitude };
  }

  /**
   * Constellation centroid in alt/az for the snapshot's observer and
   * the supplied (or snapshot) instant.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  centerAltAz(date?: Date): IConstellationHorizontalCoordinate {
    const t = date ?? this.time;
    const horizontal = convertEquatorialToHorizontal(t, this.observer, {
      dec: this.centroid.dec,
      ra: this.centroid.ra,
    });
    return { altitude: horizontal.alt, azimuth: horizontal.az };
  }

  /**
   * Whether the constellation's centroid is above the observer's
   * horizon at the supplied (or snapshot) instant.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  isAboveHorizon(date?: Date): boolean {
    return this.centerAltAz(date).altitude > 0;
  }

  /**
   * Whether the constellation is "visible to the user" — above the
   * horizon AND inside the configured direction window.
   *
   * If `direction` is unset, this is equivalent to `isAboveHorizon`.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  isVisible(date?: Date): boolean {
    const altAz = this.centerAltAz(date);
    if (altAz.altitude <= 0) return false;
    if (!this.direction) return true;
    const window = directionToAzimuthWindow(this.direction);
    if (!window) return true; // unparseable direction → no filter
    return isInWindow(altAz.azimuth, window);
  }
}

/**
 * Top-level helper: list every constellation whose centroid is above
 * the observer's horizon at the given time, optionally filtered by a
 * compass direction.
 *
 * The returned list contains plain `Constellation` snapshots (not
 * `ConstellationVisibility`) so callers can render their static data.
 *
 * @since 0.2.0
 * @param query - Observer / time / optional direction filter.
 * @returns `Constellation` snapshots, in arbitrary order.
 */
export function visibleConstellations(
  query: IVisibleConstellationsQuery,
): Constellation[] {
  const observer: GeographicCoordinate = {
    latitude: query.latitude,
    longitude: query.longitude,
  };
  const time = query.time ?? new Date();
  const window = query.direction
    ? directionToAzimuthWindow(query.direction)
    : undefined;

  const result: Constellation[] = [];
  for (const [name, centroid] of CONSTELLATION_CENTROIDS) {
    const horizontal = convertEquatorialToHorizontal(time, observer, {
      dec: centroid.dec,
      ra: centroid.ra,
    });
    if (horizontal.alt <= 0) continue;
    if (window && !isInWindow(horizontal.az, window)) continue;
    result.push(
      new Constellation({ constellation: name as IConstellationName }),
    );
  }
  return result;
}

export default ConstellationVisibility;
