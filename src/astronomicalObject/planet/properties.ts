import {
  ObservablePlanetName,
  PlanetName,
} from "@/astronomicalObject/planet/enum";
import { IPlanet } from "@/astronomicalObject/planet/types";

/**
 * Constructor input for the base {@link Planet} class. The `planet` key
 * is what the per-planet subclasses (Mars, Jupiter, ...) pre-fill.
 *
 * @since 0.2.0
 */
export interface IPlanetProperties extends IPlanet {
  /**
   * Which planet this snapshot represents.
   * @since 0.2.0
   */
  planet?: PlanetName;
}

/**
 * Constructor input for {@link PlanetTimes}.
 *
 * @since 0.2.0
 */
export interface IPlanetTimesProperties extends IPlanet {
  /**
   * Observer latitude in decimal degrees (positive north).
   * @since 0.2.0
   */
  latitude: number;
  /**
   * Observer longitude in decimal degrees (positive east).
   * @since 0.2.0
   */
  longitude: number;
  /**
   * Which planet to evaluate. Earth is not allowed — it has no
   * meaningful rise/set from itself.
   * @since 0.2.0
   */
  planet: ObservablePlanetName;
  /**
   * IANA timezone name for output formatting. Defaults to UTC.
   * @default "UTC"
   * @since 0.2.0
   */
  timezone?: string;
}
