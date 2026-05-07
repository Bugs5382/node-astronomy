import {
  IConstellation,
  IConstellationName,
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
  /** Observer latitude in decimal degrees. */
  latitude: number;
  /** Observer longitude in decimal degrees. */
  longitude: number;
  /** Optional UTC instant; defaults to `new Date()`. */
  time?: Date;
}
