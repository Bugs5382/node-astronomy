import Constellation from "@/astronomicalObject/celestial/constellations";
import { CONSTELLATION_CENTROIDS } from "@/astronomicalObject/celestial/constellations/centroids";
import {
  IConstellationVisibilityProperties,
  IVisibleConstellationsQuery,
} from "@/astronomicalObject/celestial/constellations/properties";
import {
  IConstellationHorizontalCoordinate,
  IConstellationName,
} from "@/astronomicalObject/celestial/constellations/types";
import {
  convertEquatorialToHorizontal,
  type GeographicCoordinate,
} from "@/util/coordinates";

/**
 * Observer-aware view of one constellation. Tells you whether the
 * constellation's centroid is currently above the horizon and where it
 * sits in the sky as alt/az.
 *
 * Compass-direction filtering is intentionally not part of this API —
 * the consuming app should compute that from the alt/az we return.
 *
 * @since 0.2.0
 * @example
 * ```ts
 * const v = new ConstellationVisibility({
 *   constellation: "Orion",
 *   latitude: 40.7128,
 *   longitude: -74.0060,
 *   time: new Date("2026-01-15T03:00:00Z"),
 * });
 * v.isVisible();   // boolean — above horizon
 * v.centerAltAz(); // { altitude, azimuth }
 * ```
 */
export class ConstellationVisibility extends Constellation {
  /** Observer latitude in decimal degrees. */
  readonly latitude: number;
  /** Observer longitude in decimal degrees. */
  readonly longitude: number;
  private readonly observer: GeographicCoordinate;

  /**
   * Build a ConstellationVisibility snapshot.
   *
   * Two call forms:
   * - `new ConstellationVisibility(name, { latitude, longitude, time? })`
   *   — friendly: pass the constellation name (canonical, abbreviation,
   *   or alias like `"big dipper"`) as the first argument.
   * - `new ConstellationVisibility({ constellation, latitude, longitude, time? })`
   *   — original object form (still works).
   *
   * @since 0.2.0
   */
  constructor(
    name: string,
    observer: Omit<IConstellationVisibilityProperties, "constellation">,
  );
  constructor(properties: IConstellationVisibilityProperties);
  constructor(
    input: IConstellationVisibilityProperties | string,
    observer?: Omit<IConstellationVisibilityProperties, "constellation">,
  ) {
    const properties: IConstellationVisibilityProperties =
      typeof input === "string"
        ? {
            constellation:
              input as IConstellationVisibilityProperties["constellation"],
            ...(observer as Omit<
              IConstellationVisibilityProperties,
              "constellation"
            >),
          }
        : input;
    super(properties);
    this.latitude = properties.latitude;
    this.longitude = properties.longitude;
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
   * Whether the constellation is visible to the observer — i.e. above
   * the horizon at the supplied (or snapshot) instant. Equivalent to
   * `isAboveHorizon` and kept as a separate method for API symmetry
   * with other observer-aware classes.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  isVisible(date?: Date): boolean {
    return this.isAboveHorizon(date);
  }
}

/**
 * Top-level helper: list every constellation whose centroid is above
 * the observer's horizon at the given time.
 *
 * The returned list contains plain `Constellation` snapshots (not
 * `ConstellationVisibility`) so callers can render their static data.
 *
 * @since 0.2.0
 * @param query - Observer / time.
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

  const result: Constellation[] = [];
  for (const [name, centroid] of CONSTELLATION_CENTROIDS) {
    const horizontal = convertEquatorialToHorizontal(time, observer, {
      dec: centroid.dec,
      ra: centroid.ra,
    });
    if (horizontal.alt <= 0) continue;
    result.push(
      new Constellation({ constellation: name as IConstellationName }),
    );
  }
  return result;
}

export default ConstellationVisibility;
