/**
 * Typed re-exports of the vendored constellation data.
 *
 * @since 0.2.0
 */

import {
  constellations as constellationsData,
  getConstellation as getConstellationRaw,
} from "@/astrometry/constellations/data";
import {
  type Constellation,
  type ConstellationName,
} from "@/astrometry/constellations/types";
import { type EquatorialCoordinate } from "@/util/coordinates";

/**
 * Static IAU constellation data, keyed by canonical name.
 *
 * @since 0.2.0
 */
export const constellations: ReadonlyMap<ConstellationName, Constellation> =
  constellationsData as ReadonlyMap<ConstellationName, Constellation>;

/**
 * Reverse lookup: which constellation contains the supplied equatorial
 * coordinate?
 *
 * Returns `undefined` if the coordinate falls outside every IAU
 * boundary (rare — the 88 polygons tile the sphere with only sliver
 * overlaps near boundaries).
 *
 * @since 0.2.0
 */
export function getConstellation(
  target: EquatorialCoordinate,
): Constellation | undefined {
  return getConstellationRaw(target) as Constellation | undefined;
}

export {
  type Constellation,
  type ConstellationName,
} from "@/astrometry/constellations/types";
