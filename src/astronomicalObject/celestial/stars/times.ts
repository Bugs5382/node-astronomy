import {
  convertEquatorialToHorizontal,
  GeographicCoordinate,
  getBodyNextRise,
  getBodyNextSet,
  isBodyAboveHorizon,
  isBodyCircumpolar,
  TransitInstance,
} from "@observerly/astrometry";
import { differenceInSeconds } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import Star from "@/astronomicalObject/celestial/stars";
import { IStarTimesProperties } from "@/astronomicalObject/celestial/stars/properties";
import {
  IStarArcSample,
  IStarTimeResultProperties,
} from "@/astronomicalObject/celestial/stars/types";
import { bennettRefractionDegrees } from "@/util/refraction";

const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXX";
const DEFAULT_ARC_SAMPLES = 60;
const DEFAULT_DAILY_TRACK_SAMPLES = 144;

/**
 * Observer-aware view of a single named star — alt/az, rise/set,
 * arc/track, peak.
 *
 * For circumpolar stars (e.g. Polaris from northern temperate
 * latitudes), `nextRise()` and `nextSet()` return `undefined` and
 * `arc()` returns `[]`. Use {@link dailyTrack} to sample the star's
 * 24-hour path in that case.
 *
 * @since 0.2.0
 * @example
 * ```ts
 * const polaris = new StarTimes({
 *   star: "Polaris",
 *   latitude: 40.7128,
 *   longitude: -74.0060,
 *   timezone: "America/New_York",
 *   time: new Date("2026-04-30T22:00:00Z"),
 * });
 * polaris.isCircumpolar(); // true at NYC
 * polaris.position();      // { altitude ≈ 40°, azimuth ≈ 0° }
 * ```
 */
export class StarTimes extends Star {
  /** Observer latitude in decimal degrees. */
  readonly latitude: number;
  /** Observer longitude in decimal degrees. */
  readonly longitude: number;
  /** IANA timezone for `*Tz` formatting. */
  readonly timezone: string;
  private readonly observer: GeographicCoordinate;

  /**
   * Build a StarTimes snapshot.
   *
   * @since 0.2.0
   * @param properties - `star`, `latitude`, `longitude`, optional
   *   `time`/`timezone`.
   */
  constructor(properties: IStarTimesProperties) {
    super(properties);
    this.latitude = properties.latitude;
    this.longitude = properties.longitude;
    this.timezone = properties.timezone || "UTC";
    this.observer = { latitude: this.latitude, longitude: this.longitude };
  }

  /**
   * Geometric altitude in degrees above the horizon.
   *
   * @since 0.2.0
   */
  altitudeAt(date: Date): number {
    return this.position(date).altitude;
  }

  /**
   * Apparent altitude — geometric plus Bennett refraction.
   *
   * @since 0.2.0
   */
  apparentAltitudeAt(date: Date): number {
    const geometric = this.altitudeAt(date);
    return geometric + bennettRefractionDegrees(geometric);
  }

  /**
   * Sample the star's altitude/azimuth across its visible window.
   * Default `from` is the next rise, `to` is the following set, and
   * `samples` is 60. Returns `[]` for circumpolar stars — use
   * {@link dailyTrack}.
   *
   * @since 0.2.0
   */
  arc(options?: {
    from?: Date;
    samples?: number;
    to?: Date;
  }): IStarArcSample[] {
    const samples = options?.samples ?? DEFAULT_ARC_SAMPLES;
    const reference = this.time;
    let from: Date | undefined = options?.from;
    let to: Date | undefined = options?.to;
    if (!from) {
      const rise = getBodyNextRise(
        reference,
        this.observer,
        this.equatorialCoordinate(),
      );
      from = rise === false ? undefined : rise.datetime;
    }
    if (!to) {
      const setSearchAnchor = from ?? reference;
      const set = getBodyNextSet(
        setSearchAnchor,
        this.observer,
        this.equatorialCoordinate(),
      );
      to =
        typeof set === "boolean"
          ? undefined
          : (set as TransitInstance).datetime;
    }
    if (!from || !to || to <= from) return [];
    return this.sampleWindow(from, to, samples);
  }

  /**
   * Azimuth in degrees clockwise from north.
   *
   * @since 0.2.0
   */
  azimuthAt(date: Date): number {
    return this.position(date).azimuth;
  }

  /**
   * 24-hour evenly-spaced sample loop starting from the snapshot's
   * `time`. Use this for circumpolar stars where {@link arc} returns
   * `[]`.
   *
   * @since 0.2.0
   */
  dailyTrack(options?: { samples?: number }): IStarArcSample[] {
    const samples = options?.samples ?? DEFAULT_DAILY_TRACK_SAMPLES;
    const start = this.time;
    return this.sampleWindow(
      start,
      new Date(start.getTime() + 24 * 3_600_000),
      samples,
    );
  }

  /**
   * Whether the star is currently above the observer's horizon.
   *
   * @since 0.2.0
   */
  isAboveHorizon(date?: Date): boolean {
    const t = date ?? this.time;
    return isBodyAboveHorizon(t, this.observer, this.equatorialCoordinate());
  }

  /**
   * Whether the star's declination makes it circumpolar at the
   * observer's latitude (always above the horizon, never sets).
   * Returns `true` for Polaris from any northern-hemisphere observer
   * with `latitude > ~1°`.
   *
   * @since 0.2.0
   */
  isCircumpolar(): boolean {
    return isBodyCircumpolar(this.observer, this.equatorialCoordinate());
  }

  /**
   * Next rise after `date` (or snapshot `time`). `undefined` for
   * circumpolar stars.
   *
   * @since 0.2.0
   */
  nextRise(date?: Date): IStarTimeResultProperties {
    const t = date ?? this.time;
    const result = getBodyNextRise(
      t,
      this.observer,
      this.equatorialCoordinate(),
    );
    if (result === false) return undefined;
    return this.transitInstanceToInterval(result, t);
  }

  /**
   * Next set after `date` (or snapshot `time`). `undefined` for
   * circumpolar stars.
   *
   * @since 0.2.0
   */
  nextSet(date?: Date): IStarTimeResultProperties {
    const t = date ?? this.time;
    const result = getBodyNextSet(
      t,
      this.observer,
      this.equatorialCoordinate(),
    );
    if (typeof result === "boolean") return undefined;
    return this.transitInstanceToInterval(result, t);
  }

  /**
   * Both altitude and azimuth at the supplied instant.
   *
   * @since 0.2.0
   */
  position(date?: Date): { altitude: number; azimuth: number } {
    const t = date ?? this.time;
    const horizontal = convertEquatorialToHorizontal(
      t,
      this.observer,
      this.equatorialCoordinate(),
    );
    return { altitude: horizontal.alt, azimuth: horizontal.az };
  }

  /**
   * Sample alt/az between `from` and `to` at `samples` evenly-spaced
   * points.
   *
   * @internal
   */
  private sampleWindow(
    from: Date,
    to: Date,
    samples: number,
  ): IStarArcSample[] {
    const span = to.getTime() - from.getTime();
    const result: IStarArcSample[] = [];
    for (let index = 0; index < samples; index++) {
      const fraction = samples === 1 ? 0 : index / (samples - 1);
      const at = new Date(from.getTime() + fraction * span);
      const horizontal = convertEquatorialToHorizontal(
        at,
        this.observer,
        this.equatorialCoordinate(),
      );
      result.push({
        altitude: horizontal.alt,
        azimuth: horizontal.az,
        date: at,
      });
    }
    return result;
  }

  /**
   * Convert astrometry's `TransitInstance` into our public result shape.
   *
   * @internal
   */
  private transitInstanceToInterval(
    instance: TransitInstance,
    anchor: Date,
  ): IStarTimeResultProperties {
    return {
      from: instance.datetime,
      fromTz: formatInTimeZone(instance.datetime, this.timezone, ISO_FORMAT),
      seconds: differenceInSeconds(instance.datetime, anchor),
      to: instance.datetime,
      toTz: formatInTimeZone(instance.datetime, this.timezone, ISO_FORMAT),
    };
  }
}

export default StarTimes;
