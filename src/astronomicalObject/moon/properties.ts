import { IMoon } from "@/astronomicalObject/moon/types";

/**
 * Constructor input for {@link Moon}.
 *
 * @since 0.2.0
 */
export type IMoonProperties = IMoon;

/**
 * Constructor input for {@link MoonTimes}.
 *
 * @since 0.2.0
 */
export interface IMoonTimesProperties extends IMoonProperties {
  /**
   * Observer elevation in metres above sea level. Used by
   * `angularDiameter()` for the topocentric correction. Defaults to `0`.
   * @default 0
   * @since 0.2.0
   */
  elevation?: number;
  /**
   * Observer latitude in decimal degrees (positive north, negative south).
   * @since 0.2.0
   */
  latitude: number;
  /**
   * Observer longitude in decimal degrees (positive east, negative west).
   * @since 0.2.0
   */
  longitude: number;
  /**
   * IANA timezone for output formatting (e.g. `"America/New_York"`).
   * Does NOT affect calculations — only how `*Tz` strings render.
   * @default "UTC"
   * @since 0.2.0
   */
  timezone?: string;
}
