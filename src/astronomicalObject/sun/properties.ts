import { ISunProperties } from "@/astronomicalObject/sun/types";

/**
 * Constructor input for {@link SunTimes}.
 *
 * @since 0.1.0
 */
export interface ISunTimesProperties extends ISunProperties {
  /**
   * Observer latitude in decimal degrees (positive north, negative south).
   *
   * @since 0.1.0
   */
  latitude: number;
  /**
   * Observer longitude in decimal degrees (positive east, negative west).
   *
   * @since 0.1.0
   */
  longitude: number;
  /**
   * Sampling step in seconds for the internal twilight-band scan.
   *
   * Lowering this slows construction but does not improve accuracy past
   * `1` (the band-edge resolution is already ±`stepSeconds` seconds, so
   * `1` is the precision floor). Raise it to e.g. `60` if you only need
   * minute-level boundaries and want a much faster constructor.
   *
   * @default 1
   * @since 0.2.0
   */
  stepSeconds?: number;
  /**
   * IANA timezone name used to anchor the snapshot's civil day
   * (e.g. `"America/New_York"`). The snapshot covers the local civil day
   * that contains `time`; without this, the day is anchored to UTC.
   *
   * @default "UTC"
   * @since 0.1.0
   */
  timezone?: string;
}
