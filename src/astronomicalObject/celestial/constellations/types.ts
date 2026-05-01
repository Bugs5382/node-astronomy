import type { ConstellationName } from "@observerly/astrometry";
import type { FeatureCollection } from "geojson";

import { IAstronomicalObject } from "@/astronomicalObject";

/**
 * Explicit azimuth window. If `azimuthMax < azimuthMin` the window is
 * interpreted as wrapping through 360°.
 *
 * @since 0.2.0
 */
export interface AzimuthWindow {
  /** Azimuth in degrees clockwise from north, in `[0, 360)`. */
  azimuthMax: number;
  /** Azimuth in degrees clockwise from north, in `[0, 360)`. */
  azimuthMin: number;
}

/**
 * Compass-point alias for `direction` properties.
 *
 * @since 0.2.0
 */
export type CompassPoint = "E" | "N" | "NE" | "NW" | "S" | "SE" | "SW" | "W";

/**
 * Hyphenated compass range, e.g. `'west-east'`.
 *
 * The parser interprets a kebab pair as "sweep from `<a>` to `<b>` along
 * the shorter arc on the compass". So `'west-east'` is the *southern*
 * half-dome (the short way from W to E goes through S = 180°), and
 * `'east-west'` is the *northern* half-dome.
 *
 * Any pair of valid compass points is accepted; the parser tolerates
 * either upper- or lower-case input via {@link CompassRange}.
 *
 * @since 0.2.0
 */
export type CompassRange =
  `${"east" | "north-east" | "north-west" | "north" | "south-east" | "south-west" | "south" | "west" | CompassPoint | Lowercase<CompassPoint>}-${"east" | "north-east" | "north-west" | "north" | "south-east" | "south-west" | "south" | "west" | CompassPoint | Lowercase<CompassPoint>}`;

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

/**
 * Direction filter for constellation visibility queries.
 *
 * @since 0.2.0
 */
export type TDirection = AzimuthWindow | CompassPoint | CompassRange;
