import { NamedStar } from "@/astronomicalObject/celestial/stars/data";
import { IStar } from "@/astronomicalObject/celestial/stars/types";

/**
 * Constructor input for {@link Star}.
 *
 * @since 0.2.0
 */
export interface IStarProperties extends IStar {
  /** Common name from the curated catalog. */
  star: NamedStar;
}

/**
 * Constructor input for {@link StarTimes}.
 *
 * @since 0.2.0
 */
export interface IStarTimesProperties extends IStarProperties {
  /** Observer latitude in decimal degrees. */
  latitude: number;
  /** Observer longitude in decimal degrees. */
  longitude: number;
  /** Optional IANA timezone for `*Tz` formatting; defaults to UTC. */
  timezone?: string;
}
