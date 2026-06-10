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
