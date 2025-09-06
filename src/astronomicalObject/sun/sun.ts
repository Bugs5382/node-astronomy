import { AstronomicalObject } from "@/astronomicalObject";
import { ISun, ISunProps } from "@/astronomicalObject/sun/types";

export class Sun extends AstronomicalObject implements ISun {
  private sunTime: Date;

  constructor(props?: ISunProps) {
    super("sun", props);

    this.sunTime = new Date(
      Date.UTC(
        this.time.getUTCFullYear(),
        this.time.getUTCMonth(),
        this.time.getUTCDate(),
      ),
    );
  }
}
