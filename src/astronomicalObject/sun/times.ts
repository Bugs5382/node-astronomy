import { TwilightExtended } from "@/astronomicalObject/sun/enum";
import { ISunTimesProps } from "@/astronomicalObject/sun/props";
import { Sun } from "@/astronomicalObject/sun/sun";
import {
  ISunTimeResultProp,
  ISunTimes,
  TTwilightBandExtended,
  TTwilightBlock,
} from "@/astronomicalObject/sun/types";
import { formatLocal } from "@/helpers/timeFormat";
import {
  convertEquatorialToHorizontal,
  GeographicCoordinate,
  getSolarEquatorialCoordinate,
  getSolarTransit,
  Twilight,
} from "@observerly/astrometry";
import { differenceInSeconds } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export class SunTimes extends Sun implements ISunTimes {
  /**
   * @since 0.1.0
   * @private
   */
  private readonly longitude: number;
  /**
   * @since 0.1.0
   * @private
   */
  private readonly latitude: number;
  /**
   * @since 0.1.0
   * @private
   */
  private readonly timezone: string;
  /**
   * @since 0.1.0
   * @private
   */
  private readonly bands: TTwilightBandExtended[];
  /**
   * @since 0.1.0
   * @private
   */
  private readonly converted: {
    name: Twilight | TwilightExtended;
    interval: { from: Date; to: Date };
  }[];
  /**
   *
   */
  timeBlocks: TTwilightBlock[];

  /**
   * @since 0.1.0
   * @param props
   */
  constructor(props: ISunTimesProps) {
    const timeAtMidnight = props.time ? new Date(props.time) : new Date();
    timeAtMidnight.setHours(0, 0, 0, 0);

    super({ ...props, time: timeAtMidnight });

    this.timezone = props.timezone || "UTC";
    this.latitude = props.latitude;
    this.longitude = props.longitude;

    this.bands = this.getBands(
      timeAtMidnight,
      { latitude: this.latitude, longitude: this.longitude },
      { stepSeconds: 1 },
    );

    this.converted = this.bands.map((p) => ({
      name: p.name,
      interval: {
        from: toZonedTime(p.interval.from, this.timezone),
        to: toZonedTime(p.interval.to, this.timezone),
      },
    }));

    this.timeBlocks = this.getTimes();
  }

  /**
   * @since 0.1.0
   */
  midnightToAstronomicalDawn(): ISunTimeResultProp {
    return this.formatLocalInterval("from_midnight_morning");
  }

  /**
   * @since 0.1.0
   */
  astronomicalDawn(): ISunTimeResultProp {
    return this.formatLocalInterval("astronomical_morning");
  }

  /**
   * @since 0.1.0
   */
  nauticalDawn(): ISunTimeResultProp {
    return this.formatLocalInterval("nautical_morning");
  }

  /**
   * @since 0.1.0
   */
  civilDawn(): ISunTimeResultProp {
    return this.formatLocalInterval("civil_morning");
  }

  /**
   * @since 0.1.0
   */
  sunrise(): ISunTimeResultProp {
    return this.formatLocalInterval("sun_morning");
  }

  /**
   * @since 0.1.0
   */
  sunset(): ISunTimeResultProp {
    return this.formatLocalInterval("sun_evening");
  }

  /**
   * @since 0.1.0
   */
  civilDusk(): ISunTimeResultProp {
    return this.formatLocalInterval("civil_evening");
  }

  /**
   * @since 0.1.0
   */
  nauticalDusk(): ISunTimeResultProp {
    return this.formatLocalInterval("nautical_evening");
  }

  /**
   * @since 0.1.0
   */
  astronomicalDusk(): ISunTimeResultProp {
    return this.formatLocalInterval("astronomical_evening");
  }

  /**
   * @since 0.1.0
   */
  astronomicalDuskToMidnight(): ISunTimeResultProp {
    return this.formatLocalInterval("to_midnight_evening");
  }

  /**
   * Solar Noon
   * @since 0.1.0
   */
  solarNoon(): string | null {
    const { noon } = getSolarTransit(
      this.time,
      {
        latitude: this.latitude,
        longitude: this.longitude,
      },
      0,
    );

    if (!noon) return null;

    return formatLocal(noon);
  }

  private formatLocalInterval(blockName: string): ISunTimeResultProp {
    const { interval, seconds } =
      this.timeBlocks.find((b) => b.name === blockName) ?? {};

    if (!interval) return null;
    if (!seconds) return null;

    return {
      from: formatLocal(interval.from),
      to: formatLocal(interval.to),
      seconds,
    };
  }

  /**
   * Get Time Blocks
   * @description This is a customized function of @observerly/astrometry to work with this package.
   * @since 0.1.0
   * @param datetime
   * @param observer
   * @param params
   */
  private getBands(
    datetime: Date,
    observer: GeographicCoordinate,
    params: { stepSeconds?: number } = {
      stepSeconds: 10,
    },
  ): TTwilightBandExtended[] {
    const { stepSeconds = 10 } = params;

    // Set the time to midnight:
    const midnight = new Date(
      datetime.getFullYear(),
      datetime.getMonth(),
      datetime.getDate(),
    );

    // Set the end time to midnight the next day:
    const end = new Date(midnight.getTime() + 86400000);

    // Copy of midnight to avoid modifying the original date:
    let from = new Date(midnight.getTime());

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
    let start = new Date(from.getTime());

    // Loop through the day in steps of stepSeconds:
    while (from < end) {
      const sun = getSolarEquatorialCoordinate(from);

      const { alt } = convertEquatorialToHorizontal(from, observer, sun);

      const currentTwilight = this.getAltitude(alt);

      if (currentTwilight !== twilight) {
        const to = new Date(from.getTime());

        bands.push({
          name: twilight,
          interval: {
            from: start,
            to,
          },
        });

        twilight = currentTwilight;
        start = to;
      }

      from = new Date(from.getTime() + stepSeconds * 1000);
    }

    bands.push({
      name: twilight,
      interval: {
        from: start,
        to: end,
      },
    });

    return bands;
  }

  /**
   *
   * @since 0.1.0
   * @param altitude
   */
  private getAltitude(altitude: number) {
    switch (true) {
      case altitude < -18:
        return Twilight.Night;
      case altitude < -12:
        return Twilight.Astronomical;
      case altitude < -6:
        return Twilight.Nautical;
      case altitude < -4:
        return Twilight.Civil;
      case altitude < 0.1:
        return TwilightExtended.Sun;
      case altitude < 0:
        return TwilightExtended.BlueHour;
      case altitude < 6:
        return TwilightExtended.GoldenHour;
      default:
        return Twilight.Day;
    }
  }

  /**
   * All times returned.
   * @since 0.1.0
   */
  private getTimes(): TTwilightBlock[] {
    const result: TTwilightBlock[] = [];
    const noonHour = 12;

    for (let i = 0; i < this.converted.length; i++) {
      const block = this.converted[i];
      const from = block.interval.from;
      const to = block.interval.to;

      const name = block.name;

      // First Night: midnight to Astronomical Dawn
      if (i === 0 && name.toLowerCase() === "night") {
        result.push({
          name: "from_midnight_morning",
          interval: { from, to },
          seconds: differenceInSeconds(to, from),
        });
        continue;
      }

      if (name.toLowerCase() === "day") {
        result.push({
          name: "day",
          interval: { from, to },
          seconds: differenceInSeconds(to, from),
        });
        continue;
      }

      // Last Night: to midnight
      if (i === this.converted.length - 1 && name.toLowerCase() === "night") {
        result.push({
          name: "to_midnight_evening",
          interval: { from, to },
          seconds: differenceInSeconds(to, from),
        });
        continue;
      }

      // Add morning/evening suffix
      const hour = from.getHours();
      const suffix = hour < noonHour ? "_morning" : "_evening";

      result.push({
        name: (name + suffix).toLowerCase(),
        interval: { from, to },
        seconds: differenceInSeconds(to, from),
      });
    }

    return result;
  }
}
