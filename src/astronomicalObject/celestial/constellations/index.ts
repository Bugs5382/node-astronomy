/*
MIT License

Copyright (c) __YEAR__ __AUTHOR__

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
import {
  constellations as ASTROMETRY_CONSTELLATIONS,
  getConstellation,
} from "@/astrometry/constellations";
import {
  resolveConstellationName,
  suggestConstellationNames,
} from "@/astrometry/constellations/aliases";
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
   * Accepts either:
   * - A string with a canonical IAU Latin name (any case, e.g.
   *   `"Orion"`, `"orion"`, `"ORION"`), an IAU 3-letter abbreviation
   *   (e.g. `"Ori"`, `"UMa"`), or an asterism / English alias (e.g.
   *   `"big dipper"`, `"northern cross"`, `"plough"`).
   * - The original `{ constellation, time? }` object form.
   *
   * Unknown input throws with a "did you mean…?" suggestion drawn from
   * the canonical names + alias table.
   *
   * @since 0.2.0
   */
  constructor(input: string);
  constructor(properties: IConstellationProperties);
  constructor(input: IConstellationProperties | string) {
    const normalised: IConstellationProperties =
      typeof input === "string"
        ? { constellation: resolveOrThrow(input) }
        : { ...input, constellation: resolveOrThrow(input.constellation) };
    super(normalised.constellation, normalised);
    const data = ASTROMETRY_CONSTELLATIONS.get(normalised.constellation);
    if (!data) {
      throw new Error(
        `Unknown constellation: ${String(normalised.constellation)}`,
      );
    }
    this.constellationName = data.name;
    this.abbreviation = data.abbreviation;
    this.meaning = data.meaning;
    const centroid = CONSTELLATION_CENTROIDS.get(normalised.constellation) ?? {
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

function resolveOrThrow(input: string): IConstellationName {
  const resolved = resolveConstellationName(input);
  if (resolved) return resolved as IConstellationName;
  const suggestions = suggestConstellationNames(input);
  const hint =
    suggestions.length > 0 ? ` Did you mean: ${suggestions.join(", ")}?` : "";
  throw new Error(`Unknown constellation: ${input}.${hint}`);
}

export default Constellation;
