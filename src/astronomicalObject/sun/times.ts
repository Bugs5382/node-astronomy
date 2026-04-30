import {
  convertEquatorialToHorizontal,
  GeographicCoordinate,
  getGeneralizedSolarTransit,
  getSolarEquatorialCoordinate,
  Twilight,
} from "@observerly/astrometry";
import { differenceInSeconds } from "date-fns";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";

import Sun from "@/astronomicalObject/sun";
import { TwilightExtended } from "@/astronomicalObject/sun/enum";
import { ISunTimesProperties } from "@/astronomicalObject/sun/properties";
import {
  ISunPosition,
  ISunTimeResultProperties,
  ISunTimes,
  TConverted,
  TSolarNoon,
  TTwilightBandExtended,
  TTwilightBlock,
} from "@/astronomicalObject/sun/types";

const ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXX";

export class SunTimes extends Sun implements ISunTimes {
  /**
   * Default Parameters for Step Seconds
   * @since 1.0.0
   */
  defaultParameters = { stepSeconds: 10 };
  /**
   * UTC instant marking the end of the snapshot's civil day in the supplied
   * timezone. Half-open: `coversDate` returns false at this exact instant.
   * @since 0.2.0
   */
  readonly end: Date;
  /**
   * UTC instant marking the start of the snapshot's civil day (local midnight
   * in the supplied timezone).
   * @since 0.2.0
   */
  readonly start: Date;
  /**
   * @since 1.0.0
   */
  timeBlocks: TTwilightBlock[];
  /**
   * @since 0.1.0
   * @private
   */
  private readonly bands: TTwilightBandExtended[];
  /**
   * @since 0.1.0
   * @private
   */
  private readonly converted: TConverted[];
  /**
   * @since 0.1.0
   * @private
   */
  private readonly latitude: number;
  /**
   * @since 0.1.0
   * @private
   */
  private readonly longitude: number;
  /**
   * @since 0.2.0
   * @private
   */
  private readonly observer: GeographicCoordinate;

  /**
   * @since 0.1.0
   * @private
   */
  private readonly timezone: string;

  /**
   * @since 0.1.0
   * @param properties
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

    this.bands = this.getBands(start, end, this.observer, { stepSeconds: 1 });

    this.converted = this.bands.map((p) => ({
      interval: {
        from: p.interval.from,
        fromTz: toZonedTime(p.interval.from, this.timezone),
        to: p.interval.to,
        toTz: toZonedTime(p.interval.to, this.timezone),
      },
      name: p.name,
    }));

    this.timeBlocks = this.getTimes();
  }

  /**
   * The sun's altitude (degrees above the horizon) at the supplied instant
   * for this snapshot's observer location. Negative values mean the sun is
   * below the horizon.
   * @since 0.2.0
   * @param date
   */
  altitudeAt(date: Date): number {
    const eq = getSolarEquatorialCoordinate(date);
    return convertEquatorialToHorizontal(date, this.observer, eq).alt;
  }

  /**
   * @since 0.1.0
   */
  astronomicalDawn(): ISunTimeResultProperties {
    return this.formatLocalInterval("astronomical_morning");
  }

  /**
   * @since 0.1.0
   */
  astronomicalDusk(): ISunTimeResultProperties {
    return this.formatLocalInterval("astronomical_evening");
  }

  /**
   * @since 0.1.0
   */
  astronomicalDuskToMidnight(): ISunTimeResultProperties {
    return this.formatLocalInterval("to_midnight_evening");
  }

  /**
   * The sun's azimuth (degrees clockwise from north) at the supplied instant
   * for this snapshot's observer location.
   * @since 0.2.0
   * @param date
   */
  azimuthAt(date: Date): number {
    const eq = getSolarEquatorialCoordinate(date);
    return convertEquatorialToHorizontal(date, this.observer, eq).az;
  }

  /**
   * @since 0.1.0
   */
  civilDawn(): ISunTimeResultProperties {
    return this.formatLocalInterval("civil_morning");
  }

  /**
   * @since 0.1.0
   */
  civilDusk(): ISunTimeResultProperties {
    return this.formatLocalInterval("civil_evening");
  }

  /**
   * Returns true when the supplied instant falls within this snapshot's
   * civil day (`[start, end)` — half-open).
   * @since 0.2.0
   * @param date
   */
  coversDate(date: Date): boolean {
    const t = date.getTime();
    return t >= this.start.getTime() && t < this.end.getTime();
  }

  /**
   * @since 0.1.0
   */
  day(): ISunTimeResultProperties {
    return this.formatLocalInterval("day");
  }

  /**
   * @since 0.1.0
   */
  goldenHourAM(): ISunTimeResultProperties {
    return this.formatLocalInterval("goldenhour_morning");
  }

  /**
   * @since 0.1.0
   */
  goldenHourPM(): ISunTimeResultProperties {
    return this.formatLocalInterval("goldenhour_evening");
  }

  /**
   * @since 0.1.0
   */
  midnightToAstronomicalDawn(): ISunTimeResultProperties {
    return this.formatLocalInterval("from_midnight_morning");
  }

  /**
   * @since 0.1.0
   */
  nauticalDawn(): ISunTimeResultProperties {
    return this.formatLocalInterval("nautical_morning");
  }

  /**
   * @since 0.1.0
   */
  nauticalDusk(): ISunTimeResultProperties {
    return this.formatLocalInterval("nautical_evening");
  }

  /**
   * Both altitude and azimuth at the supplied instant.
   * @since 0.2.0
   * @param date
   */
  positionAt(date: Date): ISunPosition {
    const eq = getSolarEquatorialCoordinate(date);
    const { alt, az } = convertEquatorialToHorizontal(date, this.observer, eq);
    return { altitude: alt, azimuth: az };
  }

  /**
   * Solar Noon
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

  /**
   * @since 0.1.0
   */
  sunrise(): ISunTimeResultProperties {
    return this.formatLocalInterval("sun_morning");
  }

  /**
   * @since 0.1.0
   */
  sunset(): ISunTimeResultProperties {
    return this.formatLocalInterval("sun_evening");
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
   * Thresholds use NOAA-style refraction-aware sunrise/sunset boundaries so
   * the visible sun-disk transition lines up with what an observer sees:
   * - `Civil → Sun` at -0.833°: NOAA sunrise — sun's upper limb at horizon.
   * - `Sun → GoldenHour` at -0.27°: lower limb at horizon — disk fully clear.
   *
   * @since 0.1.0
   * @param altitude
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
   * Get Time Blocks
   * This is a customized function of @observerly/astrometry to work with this package.
   * @since 0.1.0
   * @param dayStart UTC instant for the start of the snapshot's local day.
   * @param dayEnd UTC instant for the end of the snapshot's local day.
   * @param observer
   * @param parameters
   */
  private getBands(
    dayStart: Date,
    dayEnd: Date,
    observer: GeographicCoordinate,
    parameters: { stepSeconds?: number } = this.defaultParameters,
  ): TTwilightBandExtended[] {
    const { stepSeconds = 10 } = parameters;

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
   * All times returned.
   * @since 0.1.0
   */
  private getTimes(): TTwilightBlock[] {
    const result: TTwilightBlock[] = [];
    const noonHour = 12;

    for (let index = 0; index < this.converted.length; index++) {
      const block = this.converted[index];
      const from = block.interval.from;
      const to = block.interval.to;

      const name = block.name;

      // First Night: midnight to Astronomical Dawn
      if (index === 0 && name.toLowerCase() === "night") {
        result.push({
          interval: { from, to },
          name: "from_midnight_morning",
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

      // Last Night: to midnight
      if (
        index === this.converted.length - 1 &&
        name.toLowerCase() === "night"
      ) {
        result.push({
          interval: { from, to },
          name: "to_midnight_evening",
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
