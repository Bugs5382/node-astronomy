import { differenceInSeconds } from "date-fns";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";

import { getSolarEquatorialCoordinate } from "@/astrometry/sun/equatorial";
import { getGeneralizedSolarTransit } from "@/astrometry/sun/transit";
import { Twilight } from "@/astrometry/types";
import Sun from "@/astronomicalObject/sun";
import { TwilightExtended } from "@/astronomicalObject/sun/enum";
import { ISunTimesProperties } from "@/astronomicalObject/sun/properties";
import {
  ISunPosition,
  ISunTimeResultProperties,
  ISunTimes,
  TConverted,
  TPolarRegion,
  TSolarNoon,
  TTwilightBandExtended,
  TTwilightBlock,
} from "@/astronomicalObject/sun/types";
import {
  convertEquatorialToHorizontal,
  type GeographicCoordinate,
} from "@/util/coordinates";
import { bennettRefractionDegrees } from "@/util/refraction";

const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXX";

/**
 * Default sampling step for the band scan when none is supplied. The
 * snapshot is precise to ±`stepSeconds` seconds at every band edge.
 *
 * @since 0.2.0
 */
const DEFAULT_STEP_SECONDS = 1;

/**
 * Snapshot of every sun event for one civil day at a given observer
 * location.
 *
 * Constructing a `SunTimes` runs a one-shot scan of the sun's altitude
 * across the local civil day at `stepSeconds` resolution and segments the
 * result into named bands (night, astronomical/nautical/civil twilights,
 * golden hour, day). All accessor methods (`sunrise`, `civilDawn`,
 * `solarNoon`, ...) are O(1) lookups against that pre-computed snapshot.
 *
 * @since 0.1.0
 * @example
 * ```ts
 * const sunTimes = new SunTimes({
 *   latitude: 40.6676,
 *   longitude: -73.9851,
 *   timezone: "America/New_York",
 *   time: new Date("1982-05-03T00:00:00Z"),
 * });
 * sunTimes.sunrise()?.fromTz; // "1982-05-02T05:53:44-04:00"
 * sunTimes.solarNoon()?.dateTz; // "1982-05-02T12:52:48-04:00"
 * ```
 */
export class SunTimes extends Sun implements ISunTimes {
  /**
   * UTC instant marking the end of the snapshot's civil day in the supplied
   * timezone. Half-open: `coversDate` returns false at this exact instant.
   *
   * @since 0.2.0
   */
  readonly end: Date;
  /**
   * `"midnight-sun"` if the sun never sets during this civil day,
   * `"polar-night"` if it never rises, `undefined` otherwise.
   *
   * @since 0.2.0
   */
  readonly polarRegion?: TPolarRegion;
  /**
   * UTC instant marking the start of the snapshot's civil day (local
   * midnight in the supplied timezone).
   *
   * @since 0.2.0
   */
  readonly start: Date;
  /**
   * Step (seconds) used when scanning the day for band transitions.
   *
   * @since 0.2.0
   */
  readonly stepSeconds: number;
  /**
   * Ordered, contiguous list of named time blocks covering `[start, end)`.
   * Each block has `from`, `to`, `seconds`, and a `name` like
   * `"sun_morning"`, `"day"`, `"astronomical_evening"`, etc.
   *
   * @since 0.1.0
   */
  readonly timeBlocks: TTwilightBlock[];

  private readonly bands: TTwilightBandExtended[];
  private readonly converted: TConverted[];
  private readonly latitude: number;
  private readonly longitude: number;
  private readonly observer: GeographicCoordinate;
  private readonly timezone: string;

  /**
   * Build a snapshot of the sun's day at the supplied observer.
   *
   * @since 0.1.0
   * @param properties - Latitude, longitude, optional `time`/`timezone`/
   *   `stepSeconds`.
   */
  constructor(properties: ISunTimesProperties) {
    const timezone = properties.timezone || "UTC";
    const input = properties.time ? new Date(properties.time) : new Date();
    const startDateString = formatInTimeZone(input, timezone, "yyyy-MM-dd");
    const start = fromZonedTime(`${startDateString}T00:00:00`, timezone);
    // Step ~25h forward (safely past any DST jump), then snap to the next
    // civil midnight. This makes the snapshot exactly one local day, even
    // when the day is 23 or 25 hours due to DST transitions.
    const endDateString = formatInTimeZone(
      new Date(start.getTime() + 25 * 3_600_000),
      timezone,
      "yyyy-MM-dd",
    );
    const end = fromZonedTime(`${endDateString}T00:00:00`, timezone);

    super({ ...properties, time: start });

    this.timezone = timezone;
    this.latitude = properties.latitude;
    this.longitude = properties.longitude;
    this.observer = { latitude: this.latitude, longitude: this.longitude };
    this.start = start;
    this.end = end;
    this.stepSeconds = properties.stepSeconds ?? DEFAULT_STEP_SECONDS;

    this.bands = this.getBands(start, end, this.observer, this.stepSeconds);

    this.converted = this.bands.map((p) => ({
      interval: {
        from: p.interval.from,
        fromTz: toZonedTime(p.interval.from, this.timezone),
        to: p.interval.to,
        toTz: toZonedTime(p.interval.to, this.timezone),
      },
      name: p.name,
    }));

    this.polarRegion = this.detectPolarRegion(this.bands);
    this.timeBlocks = this.getTimes();
  }

  /**
   * The sun's *geometric* altitude (degrees above the horizon) at the
   * supplied instant for this snapshot's observer location. Negative
   * values mean the sun is below the horizon. This value does NOT include
   * atmospheric refraction; call {@link apparentAltitudeAt} for that.
   *
   * @since 0.2.0
   * @param date - The UTC instant to evaluate.
   * @returns Geometric altitude in degrees.
   */
  altitudeAt(date: Date): number {
    const eq = getSolarEquatorialCoordinate(date);
    return convertEquatorialToHorizontal(date, this.observer, eq).alt;
  }

  /**
   * The sun's *apparent* altitude — geometric altitude plus an atmospheric
   * refraction correction from Bennett's model — at the supplied instant.
   *
   * Use this when you need the altitude an observer actually sees through
   * a real atmosphere. Note: the band thresholds in this class
   * (`-0.833°`, `-0.27°`) are NOAA-style refraction-aware sunrise/sunset
   * boundaries calibrated to the *apparent* altitude crossing zero, but
   * the values returned by `altitudeAt` are geometric. So
   * `altitudeAt(sunrise) ≈ -0.833°` while
   * `apparentAltitudeAt(sunrise) ≈ 0°`.
   *
   * @since 0.2.0
   * @param date - The UTC instant to evaluate.
   * @returns Apparent altitude in degrees.
   */
  apparentAltitudeAt(date: Date): number {
    const geometric = this.altitudeAt(date);
    return geometric + bennettRefractionDegrees(geometric);
  }

  /** @since 0.1.0 */
  astronomicalDawn(): ISunTimeResultProperties {
    return this.formatLocalInterval("astronomical_morning");
  }

  /** @since 0.1.0 */
  astronomicalDusk(): ISunTimeResultProperties {
    return this.formatLocalInterval("astronomical_evening");
  }

  /** @since 0.1.0 */
  astronomicalDuskToMidnight(): ISunTimeResultProperties {
    return this.formatLocalInterval("to_midnight_evening");
  }

  /**
   * The sun's azimuth (degrees clockwise from north) at the supplied
   * instant for this snapshot's observer location.
   *
   * @since 0.2.0
   * @param date - The UTC instant to evaluate.
   * @returns Azimuth in degrees, 0–360 (north = 0, east = 90).
   */
  azimuthAt(date: Date): number {
    const eq = getSolarEquatorialCoordinate(date);
    return convertEquatorialToHorizontal(date, this.observer, eq).az;
  }

  /** @since 0.1.0 */
  civilDawn(): ISunTimeResultProperties {
    return this.formatLocalInterval("civil_morning");
  }

  /** @since 0.1.0 */
  civilDusk(): ISunTimeResultProperties {
    return this.formatLocalInterval("civil_evening");
  }

  /**
   * Returns true when the supplied instant falls within this snapshot's
   * civil day (`[start, end)` — half-open).
   *
   * @since 0.2.0
   * @param date - The UTC instant to test.
   */
  coversDate(date: Date): boolean {
    const t = date.getTime();
    return t >= this.start.getTime() && t < this.end.getTime();
  }

  /** @since 0.1.0 */
  day(): ISunTimeResultProperties {
    return this.formatLocalInterval("day");
  }

  /** @since 0.1.0 */
  goldenHourAM(): ISunTimeResultProperties {
    return this.formatLocalInterval("goldenhour_morning");
  }

  /** @since 0.1.0 */
  goldenHourPM(): ISunTimeResultProperties {
    return this.formatLocalInterval("goldenhour_evening");
  }

  /** @since 0.1.0 */
  midnightToAstronomicalDawn(): ISunTimeResultProperties {
    return this.formatLocalInterval("from_midnight_morning");
  }

  /** @since 0.1.0 */
  nauticalDawn(): ISunTimeResultProperties {
    return this.formatLocalInterval("nautical_morning");
  }

  /** @since 0.1.0 */
  nauticalDusk(): ISunTimeResultProperties {
    return this.formatLocalInterval("nautical_evening");
  }

  /**
   * Both altitude and azimuth at the supplied instant. Altitude is
   * *geometric* (matches {@link altitudeAt}); call {@link apparentAltitudeAt}
   * separately if you need refraction.
   *
   * @since 0.2.0
   * @param date - The UTC instant to evaluate.
   */
  positionAt(date: Date): ISunPosition {
    const eq = getSolarEquatorialCoordinate(date);
    const { alt, az } = convertEquatorialToHorizontal(date, this.observer, eq);
    return { altitude: alt, azimuth: az };
  }

  /**
   * The sun's meridian-crossing time for this snapshot.
   *
   * Returned as a `Date` (UTC) and a localised ISO-8601 string in the
   * snapshot's timezone. Defined astronomically even in polar regions —
   * a {@link polarRegion} flag of `"polar-night"` does not nullify
   * `solarNoon()`; the sun simply transits below the horizon. Returns
   * `undefined` only if the underlying ephemeris fails (rare; surfaces
   * astrometry's own polar-edge numerical issues).
   *
   * @since 0.1.0
   */
  solarNoon(): TSolarNoon | undefined {
    // `getGeneralizedSolarTransit` runs in system-tz-clean Julian-day math,
    // unlike `getSolarTransit` which mutates the input date via setHours()
    // (system-local) and would shift the result by 24h on non-UTC systems.
    const { noon } = getGeneralizedSolarTransit(this.start, this.observer);

    /* v8 ignore next */
    if (!noon) return undefined;

    return {
      date: noon,
      dateTz: formatInTimeZone(noon, this.timezone, ISO_FORMAT),
    };
  }

  /** @since 0.1.0 */
  sunrise(): ISunTimeResultProperties {
    return this.formatLocalInterval("sun_morning");
  }

  /** @since 0.1.0 */
  sunset(): ISunTimeResultProperties {
    return this.formatLocalInterval("sun_evening");
  }

  /**
   * Detect a polar regime by inspecting the band names produced by the
   * altitude scan.
   *
   * - `"midnight-sun"`: the day's bands are *only* sun-up bands
   *   (`Day`/`GoldenHour`/`Sun`). The sun never crosses below the horizon.
   * - `"polar-night"`: the day's bands are *only* below-horizon bands
   *   (`Civil`/`Nautical`/`Astronomical`/`Night`). The sun never crosses
   *   above the horizon. The `Sun` band straddles the horizon, so its
   *   absence on a no-sun-up day is part of the signal.
   * - `undefined`: at least one true sunrise/sunset transition occurred.
   *
   * @since 0.2.0
   * @internal
   */
  private detectPolarRegion(
    bands: TTwilightBandExtended[],
  ): TPolarRegion | undefined {
    const hasSunUp = bands.some(
      (b) => b.name === Twilight.Day || b.name === TwilightExtended.GoldenHour,
    );
    const hasSunDown = bands.some(
      (b) =>
        b.name === Twilight.Civil ||
        b.name === Twilight.Nautical ||
        b.name === Twilight.Astronomical ||
        b.name === Twilight.Night,
    );
    const hasCrossing = bands.some((b) => b.name === TwilightExtended.Sun);

    if (hasCrossing) return undefined;
    if (hasSunUp && !hasSunDown) return "midnight-sun";
    if (hasSunDown && !hasSunUp) return "polar-night";
    return undefined;
  }

  private formatLocalInterval(blockName: string): ISunTimeResultProperties {
    const { interval, seconds } =
      this.timeBlocks.find((b) => b.name === blockName) ?? {};

    /* v8 ignore next */
    if (!interval) return undefined;
    /* v8 ignore next */
    if (!seconds) return undefined;

    return {
      from: interval.from,
      fromTz: formatInTimeZone(interval.from, this.timezone, ISO_FORMAT),
      seconds,
      to: interval.to,
      toTz: formatInTimeZone(interval.to, this.timezone, ISO_FORMAT),
    };
  }

  /**
   * Twilight band classification by sun altitude.
   *
   * Thresholds use NOAA-style refraction-aware sunrise/sunset boundaries
   * so the visible sun-disk transition lines up with what an observer
   * sees:
   * - `Civil → Sun` at `-0.833°`: NOAA sunrise — sun's upper limb at
   *   horizon.
   * - `Sun → GoldenHour` at `-0.27°`: lower limb at horizon — disk fully
   *   clear.
   *
   * @since 0.1.0
   * @internal
   */
  private getAltitude(altitude: number) {
    switch (true) {
      case altitude < -18: {
        return Twilight.Night;
      }
      case altitude < -12: {
        return Twilight.Astronomical;
      }
      case altitude < -6: {
        return Twilight.Nautical;
      }
      case altitude < -0.833: {
        return Twilight.Civil;
      }
      case altitude < -0.27: {
        return TwilightExtended.Sun;
      }
      case altitude < 6: {
        return TwilightExtended.GoldenHour;
      }
      default: {
        return Twilight.Day;
      }
    }
  }

  /**
   * Scan the day at `stepSeconds` resolution and emit contiguous twilight
   * bands. Each emitted band carries `[from, to)` UTC instants and a
   * `Twilight | TwilightExtended` name.
   *
   * @since 0.1.0
   * @param dayStart - UTC instant for the start of the snapshot's local day.
   * @param dayEnd - UTC instant for the end of the snapshot's local day.
   * @param observer - Lat/long of the observer.
   * @param stepSeconds - Sampling step in seconds.
   * @internal
   */
  private getBands(
    dayStart: Date,
    dayEnd: Date,
    observer: GeographicCoordinate,
    stepSeconds: number,
  ): TTwilightBandExtended[] {
    let from = new Date(dayStart);

    const bands: TTwilightBandExtended[] = [];

    // Get the altitude of the sun at the day's start instant:
    const sun = getSolarEquatorialCoordinate(from);
    const { alt } = convertEquatorialToHorizontal(from, observer, sun);

    // Get the twilight band for that altitude.
    // N.B. The band at local midnight is not necessarily Night (e.g.
    // high-latitude summer where civil/nautical twilight crosses midnight).
    let twilight = this.getAltitude(alt);

    // Start the first band at dayStart:
    let start = new Date(from);

    // Loop through the day in steps of stepSeconds:
    while (from < dayEnd) {
      const sun = getSolarEquatorialCoordinate(from);

      const { alt } = convertEquatorialToHorizontal(from, observer, sun);

      const currentTwilight = this.getAltitude(alt);

      if (currentTwilight !== twilight) {
        const to = new Date(from);

        bands.push({
          interval: {
            from: start,
            to,
          },
          name: twilight,
        });

        twilight = currentTwilight;
        start = to;
      }

      from = new Date(from.getTime() + stepSeconds * 1000);
    }

    bands.push({
      interval: {
        from: start,
        to: dayEnd,
      },
      name: twilight,
    });

    return bands;
  }

  /**
   * Stamp each band with its public block name and duration.
   *
   * The first and last blocks always wear `from_midnight_morning` and
   * `to_midnight_evening`, regardless of the underlying band. This
   * preserves the {@link midnightToAstronomicalDawn} /
   * {@link astronomicalDuskToMidnight} contract at high latitudes where
   * the local-midnight band may be a twilight rather than `Night`.
   *
   * @since 0.1.0
   * @internal
   */
  private getTimes(): TTwilightBlock[] {
    const result: TTwilightBlock[] = [];
    const noonHour = 12;
    const lastIndex = this.converted.length - 1;
    // When the whole day is a single band (midnight sun / polar night),
    // tag it `from_midnight_morning` so callers can still index it; the
    // `polarRegion` flag tells them which regime they're in.
    const hasSingleBlock = this.converted.length === 1;

    for (let index = 0; index < this.converted.length; index++) {
      const block = this.converted[index];
      const from = block.interval.from;
      const to = block.interval.to;
      const name = block.name;

      // First block of the day → "from_midnight_morning", regardless of
      // whether the underlying band is Night or some twilight (high-lat
      // summer can put civil/nautical twilight at local midnight).
      if (index === 0) {
        result.push({
          interval: { from, to },
          name: "from_midnight_morning",
          seconds: differenceInSeconds(to, from),
        });
        // For a single-block day, also stop here — there is no "last"
        // block distinct from the first.
        if (hasSingleBlock) continue;
        continue;
      }

      // Last block of the day → "to_midnight_evening", same rationale.
      if (index === lastIndex) {
        result.push({
          interval: { from, to },
          name: "to_midnight_evening",
          seconds: differenceInSeconds(to, from),
        });
        continue;
      }

      if (name.toLowerCase() === "day") {
        result.push({
          interval: { from, to },
          name: "day",
          seconds: differenceInSeconds(to, from),
        });
        continue;
      }

      // Add morning/evening suffix based on the wall-clock hour in the
      // supplied timezone (not the system timezone).
      const hourInZone = Number(formatInTimeZone(from, this.timezone, "H"));
      const suffix = hourInZone < noonHour ? "_morning" : "_evening";

      result.push({
        interval: { from, to },
        name: (name + suffix).toLowerCase(),
        seconds: differenceInSeconds(to, from),
      });
    }

    return result;
  }
}
