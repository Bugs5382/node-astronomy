import {
  convertEquatorialToHorizontal,
  GeographicCoordinate,
  getSolarEquatorialCoordinate,
  getSolarTransit,
  Twilight,
} from "@observerly/astrometry";
import { differenceInSeconds } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import Sun from "@/astronomicalObject/sun";
import { TwilightExtended } from "@/astronomicalObject/sun/enum";
import { ISunTimesProperties } from "@/astronomicalObject/sun/properties";
import {
  ISunTimeResultProperties,
  ISunTimes,
  TConverted,
  TTwilightBandExtended,
  TTwilightBlock,
} from "@/astronomicalObject/sun/types";
import { formatLocal } from "@/helpers/timeFormat";

export class SunTimes extends Sun implements ISunTimes {
  /**
   * Default Parameters for Step Seconds
   * @since 1.0.0
   */
  defaultParameters = { stepSeconds: 10 };
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
   * @since 0.1.0
   * @private
   */
  private readonly timezone: string;

  /**
   * @since 0.1.0
   * @param properties
   */
  constructor(properties: ISunTimesProperties) {
    const timeAtMidnight = properties.time
      ? new Date(properties.time)
      : new Date();
    timeAtMidnight.setHours(0, 0, 0, 0);

    super({ ...properties, time: timeAtMidnight });

    this.timezone = properties.timezone || "UTC";
    this.latitude = properties.latitude;
    this.longitude = properties.longitude;

    this.bands = this.getBands(
      timeAtMidnight,
      { latitude: this.latitude, longitude: this.longitude },
      { stepSeconds: 1 },
    );

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
   * Solar Noon
   * @since 0.1.0
   */
  solarNoon(): string | undefined {
    const { noon } = getSolarTransit(
      this.time,
      {
        latitude: this.latitude,
        longitude: this.longitude,
      },
      0,
    );

    /* v8 ignore next */
    if (!noon) return undefined;

    return formatLocal(noon);
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
      fromTz: formatLocal(interval.from),
      seconds,
      to: interval.to,
      toTz: formatLocal(interval.to),
    };
  }

  /**
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
      case altitude < -4: {
        return Twilight.Civil;
      }
      case altitude < 0.1: {
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
   * @param datetime
   * @param observer
   * @param parameters
   */
  private getBands(
    datetime: Date,
    observer: GeographicCoordinate,
    parameters: { stepSeconds?: number } = this.defaultParameters,
  ): TTwilightBandExtended[] {
    const { stepSeconds = 10 } = parameters;

    // Set the time to midnight:
    const midnight = new Date(
      datetime.getFullYear(),
      datetime.getMonth(),
      datetime.getDate(),
    );

    // Set the end time to midnight the next day:
    const end = new Date(midnight.getTime() + 86_400_000);

    // Copy of midnight to avoid modifying the original date:
    let from = new Date(midnight);

    const bands: TTwilightBandExtended[] = [];

    // Get the solar equatorial coordinates for the target date:
    const sun = getSolarEquatorialCoordinate(from);

    // Get the altitude of the sun at midnight UTC:
    const { alt } = convertEquatorialToHorizontal(from, observer, sun);

    // Get the twilight band for the altitude of the sun at midnight UTC.
    // N.B. As we are in UTC timezone, the twilight band at midnight is
    // not necessarily Night.
    let twilight = this.getAltitude(alt);

    // Start the first band at midnight:
    let start = new Date(from);

    // Loop through the day in steps of stepSeconds:
    while (from < end) {
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
        to: end,
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

      // Add morning/evening suffix
      const hour = from.getHours();
      const suffix = hour < noonHour ? "_morning" : "_evening";

      result.push({
        interval: { from, to },
        name: (name + suffix).toLowerCase(),
        seconds: differenceInSeconds(to, from),
      });
    }

    return result;
  }
}
