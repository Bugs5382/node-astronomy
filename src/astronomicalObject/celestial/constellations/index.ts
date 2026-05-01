import {
  constellations as ASTROMETRY_CONSTELLATIONS,
  getConstellation,
} from "@observerly/astrometry";

import AstronomicalObject from "@/astronomicalObject";
import { CONSTELLATION_CENTROIDS } from "@/astronomicalObject/celestial/constellations/centroids";
import { IConstellationProperties } from "@/astronomicalObject/celestial/constellations/properties";
import {
  IConstellation,
  IConstellationEquatorialCoordinate,
  IConstellationFeature,
  IConstellationName,
} from "@/astronomicalObject/celestial/constellations/types";

/**
 * Snapshot of one of the 88 IAU constellations.
 *
 * Constellation data is static — the boundaries don't move on human
 * timescales. The class exposes the IAU name, abbreviation, meaning,
 * boundary GeoJSON, and pre-computed centroid (RA / Dec).
 *
 * @since 0.2.0
 * @example
 * ```ts
 * const orion = new Constellation({ constellation: "Orion" });
 * orion.abbreviation; // "Ori"
 * orion.centroid;     // { ra: ~83°, dec: ~3° }
 * ```
 */
export class Constellation
  extends AstronomicalObject
  implements IConstellation
{
  /** Abbreviated IAU designation, e.g. `"Ori"` for Orion. */
  readonly abbreviation: string;
  /** Pre-computed centroid of the constellation's boundary, in degrees. */
  readonly centroid: IConstellationEquatorialCoordinate;
  /** IAU constellation name, e.g. `"Orion"`. */
  readonly constellationName: IConstellationName;
  /** English meaning of the constellation's name. */
  readonly meaning: string;

  /**
   * Build a Constellation snapshot.
   *
   * @since 0.2.0
   * @param properties - `constellation` (required) and optional `time`.
   */
  constructor(properties: IConstellationProperties) {
    super(properties.constellation, properties);
    const data = ASTROMETRY_CONSTELLATIONS.get(properties.constellation);
    if (!data) {
      throw new Error(
        `Unknown constellation: ${String(properties.constellation)}`,
      );
    }
    this.constellationName = data.name;
    this.abbreviation = data.abbreviation;
    this.meaning = data.meaning;
    const centroid = CONSTELLATION_CENTROIDS.get(properties.constellation) ?? {
      dec: 0,
      ra: 0,
    };
    this.centroid = centroid;
  }

  /**
   * Raw GeoJSON `FeatureCollection` representing the constellation's IAU
   * boundary.
   *
   * @since 0.2.0
   */
  feature(): IConstellationFeature {
    const data = ASTROMETRY_CONSTELLATIONS.get(this.constellationName);
    if (!data) {
      throw new Error(
        `Unknown constellation: ${String(this.constellationName)}`,
      );
    }
    return data.feature;
  }
}

/**
 * Reverse lookup: given an equatorial coordinate, return the
 * constellation that contains it (per the Nancy Roman lookup table that
 * astrometry ships).
 *
 * @since 0.2.0
 * @param target - `{ ra, dec }` in degrees.
 * @returns A new `Constellation` snapshot, or `undefined` if the
 *   coordinate is not inside any IAU boundary.
 */
export function findConstellationAt(
  target: IConstellationEquatorialCoordinate,
): Constellation | undefined {
  const result = getConstellation({ dec: target.dec, ra: target.ra });
  if (!result) return undefined;
  return new Constellation({ constellation: result.name });
}

export default Constellation;
