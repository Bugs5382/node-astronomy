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
