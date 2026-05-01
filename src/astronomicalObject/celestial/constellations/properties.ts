import {
  IConstellation,
  IConstellationName,
  TDirection,
} from "@/astronomicalObject/celestial/constellations/types";

/**
 * Constructor input for {@link Constellation}.
 *
 * @since 0.2.0
 */
export interface IConstellationProperties extends IConstellation {
  /** IAU constellation name, e.g. `"Orion"`. */
  constellation: IConstellationName;
}

/**
 * Constructor input for {@link ConstellationVisibility}.
 *
 * @since 0.2.0
 */
export interface IConstellationVisibilityProperties extends IConstellationProperties {
  /**
   * Optional direction filter — single compass point, kebab-pair range,
   * or explicit `{ azimuthMin, azimuthMax }` window.
   *
   * If omitted, only horizon visibility is checked (no azimuth filter).
   * @since 0.2.0
   */
  direction?: TDirection;
  /** Observer latitude in decimal degrees. */
  latitude: number;
  /** Observer longitude in decimal degrees. */
  longitude: number;
}

/**
 * Constructor input for the top-level `visibleConstellations` helper.
 *
 * @since 0.2.0
 */
export interface IVisibleConstellationsQuery {
  /** Optional direction filter — see {@link TDirection}. */
  direction?: TDirection;
  /** Observer latitude in decimal degrees. */
  latitude: number;
  /** Observer longitude in decimal degrees. */
  longitude: number;
  /** Optional UTC instant; defaults to `new Date()`. */
  time?: Date;
}
