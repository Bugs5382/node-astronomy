import { ISunTimesProps } from "@/astronomicalObject/sun/props";
import { Sun } from "@/astronomicalObject/sun/sun";
import { ISunTimes } from "@/astronomicalObject/sun/types";
import {
  getTwilightBandsForDay,
  Twilight,
  TwilightBand,
} from "@observerly/astrometry";
import { toZonedTime } from "date-fns-tz";

export class SunTimes extends Sun implements ISunTimes {
  private readonly longitude: number;
  private readonly latitude: number;
  private readonly timezone: string;
  private readonly bands: TwilightBand[];
  private readonly converted: {
    name: Twilight;
    interval: { from: Date; to: Date };
  }[];

  constructor(props: ISunTimesProps) {
    const timeAtMidnight = props.time ? new Date(props.time) : new Date();
    timeAtMidnight.setHours(0, 0, 0, 0);

    super({ ...props, name: "SunTimes", time: timeAtMidnight });

    this.timezone = props.timezone || "UTC";
    this.latitude = props.latitude;
    this.longitude = props.longitude;

    this.bands = getTwilightBandsForDay(
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

    console.log(this.converted);
  }
}
