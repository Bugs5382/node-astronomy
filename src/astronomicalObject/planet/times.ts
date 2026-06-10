/*
MIT License

Copyright (c) 2026 Shane Froebel

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

import {
  isBodyAboveHorizon,
  isBodyCircumpolar,
} from "@/astrometry/transit/circumpolar";
import { getBodyNextRise, getBodyNextSet } from "@/astrometry/transit/riseSet";
import { type TransitInstance } from "@/astrometry/types";
import AstronomicalObject from "@/astronomicalObject";
import { planetGeocentricEcliptic } from "@/astronomicalObject/planet";
import { ObservablePlanetName } from "@/astronomicalObject/planet/enum";
import { IPlanetTimesProperties } from "@/astronomicalObject/planet/properties";
import {
  IPlanetArcSample,
  IPlanetEquatorialCoordinate,
  IPlanetPeak,
  IPlanetTimeResultProperties,
} from "@/astronomicalObject/planet/types";
import {
  convertEclipticToEquatorial,
  convertEquatorialToHorizontal,
  type EclipticCoordinate,
  type GeographicCoordinate,
} from "@/util/coordinates";
import {
  bennettRefractionDegrees,
  normalizeDegrees360,
} from "@/util/refraction";

const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXX";
const DEFAULT_ARC_SAMPLES = 60;
const DEFAULT_DAILY_TRACK_SAMPLES = 144;

/**
 * Observer-aware view of a single planet — alt/az, rise/set, arc/track.
 *
 * Use this with any planet *except* Earth (which has no meaningful
 * rise/set from itself).
 *
 * @since 0.2.0
 * @example
 * ```ts
 * import { PlanetTimes } from "node-astronomy";
 *
 * const mars = new PlanetTimes({
 *   planet: "mars",
 *   latitude: 40.7128,
 *   longitude: -74.0060,
 *   timezone: "America/New_York",
 *   time: new Date("2026-04-30T22:00:00Z"),
 * });
 *
 * mars.position();
 * mars.nextRise();
 * mars.arc({ samples: 60 });
 * ```
 */
export class PlanetTimes extends AstronomicalObject {
  /** Observer latitude in decimal degrees. */
  readonly latitude: number;
  /** Observer longitude in decimal degrees. */
  readonly longitude: number;
  /** Which planet this snapshot represents. */
  readonly planet: ObservablePlanetName;
  /** IANA timezone for `*Tz` formatting. */
  readonly timezone: string;
  private readonly observer: GeographicCoordinate;

  /**
   * Build a PlanetTimes snapshot.
   *
   * @since 0.2.0
   * @param properties - `planet`, `latitude`, `longitude`, optional
   *   `time`/`timezone`.
   */
  constructor(properties: IPlanetTimesProperties) {
    super(properties.planet, properties);
    this.planet = properties.planet;
    this.latitude = properties.latitude;
    this.longitude = properties.longitude;
    this.timezone = properties.timezone || "UTC";
    this.observer = { latitude: this.latitude, longitude: this.longitude };
  }

  /**
   * The planet's geometric altitude in degrees above the horizon.
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
   * Sample the planet's altitude/azimuth across the visible window.
   * Default `from` is the next rise, default `to` is the following set,
   * default `samples` is 60. Returns `[]` for circumpolar planets — use
   * {@link dailyTrack}.
   *
   * @since 0.2.0
   */
  arc(options?: {
    from?: Date;
    samples?: number;
    to?: Date;
  }): IPlanetArcSample[] {
    const samples = options?.samples ?? DEFAULT_ARC_SAMPLES;
    const reference = this.time;
    let from: Date | undefined = options?.from;
    let to: Date | undefined = options?.to;
    if (!from) {
      const eq = this.equatorialCoordinate(reference);
      const rise = getBodyNextRise(reference, this.observer, {
        dec: eq.dec,
        ra: eq.ra,
      });
      from = rise === false ? undefined : rise.datetime;
    }
    if (!to) {
      const setSearchAnchor = from ?? reference;
      const eq = this.equatorialCoordinate(setSearchAnchor);
      const set = getBodyNextSet(setSearchAnchor, this.observer, {
        dec: eq.dec,
        ra: eq.ra,
      });
      to =
        typeof set === "boolean"
          ? undefined
          : (set as TransitInstance).datetime;
    }
    if (!from || !to || to <= from) return [];
    return this.sampleWindow(from, to, samples);
  }

  /**
   * The planet's azimuth in degrees clockwise from north.
   *
   * @since 0.2.0
   */
  azimuthAt(date: Date): number {
    return this.position(date).azimuth;
  }

  /**
   * 24-hour evenly-spaced sample loop starting from the snapshot's
   * `time`. Useful for circumpolar planets.
   *
   * @since 0.2.0
   */
  dailyTrack(options?: { samples?: number }): IPlanetArcSample[] {
    const samples = options?.samples ?? DEFAULT_DAILY_TRACK_SAMPLES;
    const start = this.time;
    return this.sampleWindow(
      start,
      new Date(start.getTime() + 24 * 3_600_000),
      samples,
    );
  }

  /**
   * Whether the planet is currently above the horizon for the observer.
   *
   * @since 0.2.0
   */
  isAboveHorizon(date?: Date): boolean {
    const t = date ?? this.time;
    const eq = this.equatorialCoordinate(t);
    return isBodyAboveHorizon(t, this.observer, { dec: eq.dec, ra: eq.ra });
  }

  /**
   * Whether the planet's declination makes it circumpolar at this
   * observer's latitude.
   *
   * @since 0.2.0
   */
  isCircumpolar(date?: Date): boolean {
    const eq = this.equatorialCoordinate(date ?? this.time);
    return isBodyCircumpolar(this.observer, { dec: eq.dec, ra: eq.ra });
  }

  /**
   * Next rise after `date` (or snapshot `time`). `undefined` if the
   * planet is circumpolar.
   *
   * @since 0.2.0
   */
  nextRise(date?: Date): IPlanetTimeResultProperties {
    const t = date ?? this.time;
    const eq = this.equatorialCoordinate(t);
    const result = getBodyNextRise(t, this.observer, {
      dec: eq.dec,
      ra: eq.ra,
    });
    if (result === false) return undefined;
    return this.transitInstanceToInterval(result, t);
  }

  /**
   * Next set after `date` (or snapshot `time`).
   *
   * @since 0.2.0
   */
  nextSet(date?: Date): IPlanetTimeResultProperties {
    const t = date ?? this.time;
    const eq = this.equatorialCoordinate(t);
    const result = getBodyNextSet(t, this.observer, { dec: eq.dec, ra: eq.ra });
    if (typeof result === "boolean") return undefined;
    return this.transitInstanceToInterval(result, t);
  }

  /**
   * Highest-altitude sample of the planet's currently visible arc.
   *
   * @since 0.2.0
   */
  peak(date?: Date): IPlanetPeak | undefined {
    const samples = this.arc({ from: date, samples: 60 });
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
   */
  position(date?: Date): { altitude: number; azimuth: number } {
    const t = date ?? this.time;
    const eq = this.equatorialCoordinate(t);
    const horizontal = convertEquatorialToHorizontal(t, this.observer, {
      dec: eq.dec,
      ra: eq.ra,
    });
    return { altitude: horizontal.alt, azimuth: horizontal.az };
  }

  /**
   * Resolve the planet's geocentric equatorial coordinate at `date`,
   * dispatching Pluto to its custom ephemeris.
   *
   * @internal
   */
  private equatorialCoordinate(date: Date): IPlanetEquatorialCoordinate {
    const ecliptic = planetGeocentricEcliptic(this.planet, date);
    const astrometryEcliptic: EclipticCoordinate = {
      β: ecliptic.latitude,
      λ: ecliptic.longitude,
    };
    const eq = convertEclipticToEquatorial(date, astrometryEcliptic);
    return { dec: eq.dec, ra: normalizeDegrees360(eq.ra) };
  }

  /**
   * Sample alt/az between `from` and `to` at `samples` evenly-spaced
   * points (inclusive at both ends when samples > 1).
   *
   * @internal
   */
  private sampleWindow(
    from: Date,
    to: Date,
    samples: number,
  ): IPlanetArcSample[] {
    const span = to.getTime() - from.getTime();
    const result: IPlanetArcSample[] = [];
    for (let index = 0; index < samples; index++) {
      const fraction = samples === 1 ? 0 : index / (samples - 1);
      const at = new Date(from.getTime() + fraction * span);
      const eq = this.equatorialCoordinate(at);
      const horizontal = convertEquatorialToHorizontal(at, this.observer, {
        dec: eq.dec,
        ra: eq.ra,
      });
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
  ): IPlanetTimeResultProperties {
    return {
      from: instance.datetime,
      fromTz: formatInTimeZone(instance.datetime, this.timezone, ISO_FORMAT),
      seconds: differenceInSeconds(instance.datetime, anchor),
      to: instance.datetime,
      toTz: formatInTimeZone(instance.datetime, this.timezone, ISO_FORMAT),
    };
  }
}

export default PlanetTimes;
