import { ISunTimesProps } from "@/astronomicalObject/sun/props";
import { Sun } from "@/astronomicalObject/sun/sun";
import { ISunTimes } from "@/astronomicalObject/sun/types";
import {
  convertEquatorialToHorizontal,
  GeographicCoordinate,
  getSolarEquatorialCoordinate,
  Interval,
  Twilight,
} from "@observerly/astrometry";
import { toZonedTime } from "date-fns-tz";

export enum TwilightExtended {
  /**
   *
   * BlueHour - The time just before sunrise or just after sunset, when the sun is
   * approximately between -4 and 0 degrees below the horizon.
   *
   */
  BlueHour = "BlueHour",
  /**
   *
   * GoldenHour - The time shortly after sunrise or shortly before sunset, when the sun
   * is just above the horizon (0 to ~6 degrees).
   *
   */
  GoldenHour = "GoldenHour",
}

type TwilightBandExtended = {
  name: Twilight | TwilightExtended;
  interval: Interval;
};

export class SunTimes extends Sun implements ISunTimes {
  private readonly longitude: number;
  private readonly latitude: number;
  private readonly timezone: string;
  private readonly bands: TwilightBandExtended[];
  private readonly converted: {
    name: Twilight | TwilightExtended;
    interval: { from: Date; to: Date };
  }[];

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

  }

  /**
   *
   * @param datetime
   * @param observer
   * @param params
   */
  getBands(
    datetime: Date,
    observer: GeographicCoordinate,
    params: { stepSeconds?: number } = {
      stepSeconds: 10,
    },
  ): TwilightBandExtended[] {
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

    const bands: TwilightBandExtended[] = [];

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
   * @param altitude
   */
  getAltitude(altitude: number) {
    switch (true) {
      case altitude < -18:
        return Twilight.Night;
      case altitude < -12:
        return Twilight.Astronomical;
      case altitude < -6:
        return Twilight.Nautical;
      case altitude < -4:
        return Twilight.Civil;
      case altitude < 0:
        return TwilightExtended.BlueHour;
      case altitude < 6:
        return TwilightExtended.GoldenHour;
      default:
        return Twilight.Day;
    }
  }
}
