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
import type { FeatureCollection } from "geojson";

import type { ConstellationName } from "@/astrometry/constellations/types";

import { IAstronomicalObject } from "@/astronomicalObject";

/**
 * Snapshot-level constellation shape.
 *
 * @since 0.2.0
 */
export type IConstellation = IAstronomicalObject;

/**
 * Equatorial coordinate (RA / Dec, degrees).
 *
 * @since 0.2.0
 */
export interface IConstellationEquatorialCoordinate {
  /** Declination in degrees, `[-90, 90]`. */
  dec: number;
  /** Right ascension in degrees, `[0, 360)`. */
  ra: number;
}

/**
 * Constellation feature (GeoJSON `FeatureCollection`) shape, re-exported
 * from astrometry / GeoJSON.
 *
 * @since 0.2.0
 */
export type IConstellationFeature = FeatureCollection;

/**
 * Alt/az horizontal coordinate.
 *
 * @since 0.2.0
 */
export interface IConstellationHorizontalCoordinate {
  /** Altitude in degrees above the horizon. */
  altitude: number;
  /** Azimuth in degrees clockwise from north. */
  azimuth: number;
}

/**
 * Convenience re-export of astrometry's `ConstellationName` so consumers
 * don't have to depend on it directly.
 *
 * @since 0.2.0
 */
export type IConstellationName = ConstellationName;
