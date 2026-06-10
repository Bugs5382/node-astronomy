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
import { differenceInSeconds } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import { getLunarAngularDiameter } from "@/astrometry/moon/distance";
import { getLunarEquatorialCoordinate } from "@/astrometry/moon/equatorial";
import {
  isBodyAboveHorizon,
  isBodyCircumpolar,
} from "@/astrometry/transit/circumpolar";
import { getBodyNextRise, getBodyNextSet } from "@/astrometry/transit/riseSet";
import { type TransitInstance } from "@/astrometry/types";
import Moon from "@/astronomicalObject/moon";
import { IMoonTimesProperties } from "@/astronomicalObject/moon/properties";
import {
  IHorizontalCoordinate,
  IMoonAngularDiameter,
  IMoonArcSample,
  IMoonPeak,
  IMoonTimeResultProperties,
} from "@/astronomicalObject/moon/types";
import {
  convertEquatorialToHorizontal,
  type GeographicCoordinate,
} from "@/util/coordinates";
import { bennettRefractionDegrees } from "@/util/refraction";

const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXX";

/** Default number of evenly-spaced samples returned by `arc()`. */
const DEFAULT_ARC_SAMPLES = 60;
/** Default number of samples for the 24h `dailyTrack()` loop. */
const DEFAULT_DAILY_TRACK_SAMPLES = 144;

/**
 * Observer-aware moon snapshot — exposes alt/az, rise/set, arc/track,
 * peak, and topocentric angular diameter.
 *
 * The moon's nightly path varies meaningfully (declination drifts
 * ~5°/day across the lunar month), so {@link arc} is the recommended way
 * to render the moon's actual track over a night, rather than relying on
 * a single peak point.
 *
 * @since 0.2.0
 * @example
 * ```ts
 * const moon = new MoonTimes({
 *   latitude: 40.7128,
 *   longitude: -74.0060,
 *   timezone: "America/New_York",
 *   time: new Date("2026-04-30T22:00:00Z"),
 * });
 * moon.position();         // { altitude, azimuth }
 * moon.nextRise();         // { from, fromTz, ... }
 * moon.arc({ samples: 60 });
 * ```
 */
export class MoonTimes extends Moon {
  /** Observer elevation in metres above sea level. */
  readonly elevation: number;
  /** Observer latitude in decimal degrees. */
  readonly latitude: number;
  /** Observer longitude in decimal degrees. */
  readonly longitude: number;
  /** IANA timezone for `*Tz` formatting. */
  readonly timezone: string;
  /** Observer in astrometry's coordinate shape. */
  private readonly observer: GeographicCoordinate;

  /**
   * Build a MoonTimes snapshot.
   *
   * @since 0.2.0
   * @param properties - Latitude, longitude, optional `time`/`timezone`/
   *   `elevation`.
   */
  constructor(properties: IMoonTimesProperties) {
    super(properties);
    this.latitude = properties.latitude;
    this.longitude = properties.longitude;
    this.elevation = properties.elevation ?? 0;
    this.timezone = properties.timezone || "UTC";
    this.observer = { latitude: this.latitude, longitude: this.longitude };
  }

  /**
   * The moon's *geometric* altitude (degrees above horizon) at the
   * supplied instant for this snapshot's observer. Negative when below.
   * No atmospheric refraction; call {@link apparentAltitudeAt} for that.
   *
   * @since 0.2.0
   * @param date - The UTC instant to evaluate.
   * @returns Geometric altitude in degrees.
   */
  altitudeAt(date: Date): number {
    const eq = getLunarEquatorialCoordinate(date);
    return convertEquatorialToHorizontal(date, this.observer, eq).alt;
  }

  /**
   * Both geocentric and topocentric apparent angular diameter of the
   * moon, in degrees. Topocentric uses the observer's lat/long/elevation.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  angularDiameter(date?: Date): IMoonAngularDiameter {
    const t = date ?? this.time;
    return {
      geocentric: getLunarAngularDiameter(t),
      topocentric: getLunarAngularDiameter(t, {
        ...this.observer,
        elevation: this.elevation,
      }),
    };
  }

  /**
   * The moon's *apparent* altitude — geometric altitude plus
   * Bennett-model atmospheric refraction.
   *
   * @since 0.2.0
   * @param date - The UTC instant to evaluate.
   * @returns Apparent altitude in degrees.
   */
  apparentAltitudeAt(date: Date): number {
    const geometric = this.altitudeAt(date);
    return geometric + bennettRefractionDegrees(geometric);
  }

  /**
   * Sample the moon's altitude/azimuth across an interval. Default
   * window is `nextRise()` → following `nextSet()`; default sample
   * count is `60`. Each sample's `date` is monotonically increasing.
   *
   * For circumpolar moons (the moon never sets — rare but happens at
   * extreme latitudes when the moon's declination matches), this returns
   * an empty array; use {@link dailyTrack} instead.
   *
   * @since 0.2.0
   * @param options - `samples`, `from`, `to`. Omitted fields default to
   *   the visible-arc window.
   * @returns Array of `{ date, altitude, azimuth }` samples.
   */
  arc(options?: {
    from?: Date;
    samples?: number;
    to?: Date;
  }): IMoonArcSample[] {
    const samples = options?.samples ?? DEFAULT_ARC_SAMPLES;
    const reference = this.time;
    const explicitFrom = options?.from;
    const explicitTo = options?.to;

    let from: Date | undefined = explicitFrom;
    let to: Date | undefined = explicitTo;
    if (!from || !to) {
      const rise = getBodyNextRise(
        reference,
        this.observer,
        getLunarEquatorialCoordinate(reference),
      );
      if (!from) {
        from = rise === false ? undefined : rise.datetime;
      }
      const setSearchAnchor = from ?? reference;
      const set = getBodyNextSet(
        setSearchAnchor,
        this.observer,
        getLunarEquatorialCoordinate(setSearchAnchor),
      );
      if (!to) {
        to =
          typeof set === "boolean"
            ? undefined
            : (set as TransitInstance).datetime;
      }
    }

    if (!from || !to || to <= from) return [];

    const span = to.getTime() - from.getTime();
    const result: IMoonArcSample[] = [];
    for (let index = 0; index < samples; index++) {
      const fraction = samples === 1 ? 0 : index / (samples - 1);
      const at = new Date(from.getTime() + fraction * span);
      const eq = getLunarEquatorialCoordinate(at);
      const horizontal = convertEquatorialToHorizontal(at, this.observer, eq);
      result.push({
        altitude: horizontal.alt,
        azimuth: horizontal.az,
        date: at,
      });
    }
    return result;
  }

  /**
   * The moon's azimuth (degrees clockwise from north) at the supplied
   * instant.
   *
   * @since 0.2.0
   * @param date - The UTC instant to evaluate.
   */
  azimuthAt(date: Date): number {
    const eq = getLunarEquatorialCoordinate(date);
    return convertEquatorialToHorizontal(date, this.observer, eq).az;
  }

  /**
   * 24-hour evenly-spaced sample loop starting from the snapshot's
   * `time`. Useful when {@link arc} returns empty (circumpolar moon).
   *
   * @since 0.2.0
   * @param options - `samples` (default 144 = every 10 minutes).
   */
  dailyTrack(options?: { samples?: number }): IMoonArcSample[] {
    const samples = options?.samples ?? DEFAULT_DAILY_TRACK_SAMPLES;
    const start = this.time;
    const span = 24 * 3_600_000;
    const result: IMoonArcSample[] = [];
    for (let index = 0; index < samples; index++) {
      const fraction = samples === 1 ? 0 : index / (samples - 1);
      const at = new Date(start.getTime() + fraction * span);
      const eq = getLunarEquatorialCoordinate(at);
      const horizontal = convertEquatorialToHorizontal(at, this.observer, eq);
      result.push({
        altitude: horizontal.alt,
        azimuth: horizontal.az,
        date: at,
      });
    }
    return result;
  }

  /**
   * Whether the moon is currently above the horizon for the observer.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  isAboveHorizon(date?: Date): boolean {
    const t = date ?? this.time;
    const eq = getLunarEquatorialCoordinate(t);
    return isBodyAboveHorizon(t, this.observer, eq);
  }

  /**
   * Whether the moon's declination makes it circumpolar (never sets) at
   * the observer's latitude. For most temperate observers, this is
   * almost always `false`; at very high latitudes the moon can be
   * circumpolar for several days.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  isCircumpolar(date?: Date): boolean {
    const eq = getLunarEquatorialCoordinate(date ?? this.time);
    return isBodyCircumpolar(this.observer, eq);
  }

  /**
   * The moon's next rise after the supplied (or snapshot) instant. Uses
   * astrometry's `getBodyNextRise` with the moon's RA/Dec.
   *
   * @since 0.2.0
   * @param date - Optional anchor; defaults to this snapshot's `time`.
   * @returns `{ from, fromTz, ... }` or `undefined` if the moon is
   *   circumpolar (never rises because it never sets).
   */
  nextRise(date?: Date): IMoonTimeResultProperties {
    const t = date ?? this.time;
    const eq = getLunarEquatorialCoordinate(t);
    const result = getBodyNextRise(t, this.observer, eq);
    if (result === false) return undefined;
    return this.transitInstanceToInterval(result, t);
  }

  /**
   * The moon's next set after the supplied (or snapshot) instant.
   *
   * @since 0.2.0
   * @param date - Optional anchor; defaults to this snapshot's `time`.
   */
  nextSet(date?: Date): IMoonTimeResultProperties {
    const t = date ?? this.time;
    const eq = getLunarEquatorialCoordinate(t);
    const result = getBodyNextSet(t, this.observer, eq);
    if (typeof result === "boolean") return undefined;
    return this.transitInstanceToInterval(result, t);
  }

  /**
   * Highest-altitude point of the moon's currently visible arc. For a
   * fully-below-horizon snapshot, returns `undefined`.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  peak(date?: Date): IMoonPeak | undefined {
    const samples = this.arc({
      from: date,
      samples: 60,
    });
    if (samples.length === 0) return undefined;
    let best = samples[0];
    for (const sample of samples) {
      if (sample.altitude > best.altitude) best = sample;
    }
    if (best.altitude < 0) return undefined;
    return {
      altitude: best.altitude,
      azimuth: best.azimuth,
      date: best.date,
      dateTz: formatInTimeZone(best.date, this.timezone, ISO_FORMAT),
    };
  }

  /**
   * Both altitude and azimuth at the supplied instant.
   *
   * @since 0.2.0
   * @param date - Optional override; defaults to this snapshot's `time`.
   */
  position(date?: Date): IHorizontalCoordinate {
    const t = date ?? this.time;
    const eq = getLunarEquatorialCoordinate(t);
    const horizontal = convertEquatorialToHorizontal(t, this.observer, eq);
    return { altitude: horizontal.alt, azimuth: horizontal.az };
  }

  /**
   * Convert astrometry's `TransitInstance` rise/set result into our
   * public `IMoonTimeResultProperties` shape. Caller must have already
   * narrowed boolean results away.
   *
   * @internal
   */
  private transitInstanceToInterval(
    instance: TransitInstance,
    anchor: Date,
  ): IMoonTimeResultProperties {
    return {
      from: instance.datetime,
      fromTz: formatInTimeZone(instance.datetime, this.timezone, ISO_FORMAT),
      seconds: differenceInSeconds(instance.datetime, anchor),
      to: instance.datetime,
      toTz: formatInTimeZone(instance.datetime, this.timezone, ISO_FORMAT),
    };
  }
}

export default MoonTimes;
