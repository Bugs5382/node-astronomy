/*
MIT License

Copyright (c) 2026 Shane Froebel

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
import type { Geometry, Position } from "geojson";

import { constellations as ASTROMETRY_CONSTELLATIONS } from "@/astrometry/constellations";
import { IConstellationName } from "@/astronomicalObject/celestial/constellations/types";

/**
 * Pre-computed centroid for each IAU constellation.
 *
 * The centroid is the unit-vector centroid of every coordinate that
 * appears in the constellation's GeoJSON `feature.geometry`. Using unit
 * vectors handles the right-ascension wrap-around (some constellations
 * straddle RA = 0°, which would break a naive arithmetic mean).
 *
 * Computed once at module load time and frozen — astrometry's
 * constellation data is static.
 *
 * @since 0.2.0
 */
export const CONSTELLATION_CENTROIDS: ReadonlyMap<
  IConstellationName,
  { dec: number; ra: number }
> = (() => {
  const result = new Map<IConstellationName, { dec: number; ra: number }>();
  for (const [name, constellation] of ASTROMETRY_CONSTELLATIONS) {
    const centroid = featureCollectionCentroid(constellation.feature.features);
    result.set(name, centroid);
  }
  return result;
})();

/**
 * Iterate every `Position` (`[longitude, latitude, ...]` ≡ `[ra, dec]`
 * in our ecliptic GeoJSON) inside a Geometry and call the callback.
 *
 * @internal
 */
function eachPosition(
  geometry: Geometry,
  callback: (position: Position) => void,
): void {
  switch (geometry.type) {
    case "GeometryCollection": {
      for (const inner of geometry.geometries) eachPosition(inner, callback);
      return;
    }
    case "LineString":
    case "MultiPoint": {
      for (const position of geometry.coordinates) callback(position);
      return;
    }
    case "MultiLineString":
    case "Polygon": {
      for (const ring of geometry.coordinates) {
        for (const position of ring) callback(position);
      }
      return;
    }
    case "MultiPolygon": {
      for (const polygon of geometry.coordinates) {
        for (const ring of polygon) {
          for (const position of ring) callback(position);
        }
      }
      return;
    }
    case "Point": {
      callback(geometry.coordinates);
      return;
    }
    // No default
  }
}

/**
 * Compute the unit-vector centroid of every coordinate in a feature
 * collection's geometries.
 *
 * @internal
 */
function featureCollectionCentroid(features: { geometry: Geometry }[]): {
  dec: number;
  ra: number;
} {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  let count = 0;
  for (const feature of features) {
    eachPosition(feature.geometry, ([longitude, latitude]) => {
      const lonRad = (longitude * Math.PI) / 180;
      const latRad = (latitude * Math.PI) / 180;
      sumX += Math.cos(latRad) * Math.cos(lonRad);
      sumY += Math.cos(latRad) * Math.sin(lonRad);
      sumZ += Math.sin(latRad);
      count++;
    });
  }
  if (count === 0) return { dec: 0, ra: 0 };
  const x = sumX / count;
  const y = sumY / count;
  const z = sumZ / count;
  let ra = (Math.atan2(y, x) * 180) / Math.PI;
  if (ra < 0) ra += 360;
  const dec = (Math.atan2(z, Math.hypot(x, y)) * 180) / Math.PI;
  return { dec, ra };
}
