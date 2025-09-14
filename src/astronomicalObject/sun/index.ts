import AstronomicalObject from "@/astronomicalObject";
import { ISun, ISunProperties } from "@/astronomicalObject/sun/types";

export class Sun extends AstronomicalObject implements ISun {
  private sunTime: Date;

  constructor(properties?: ISunProperties) {
    super("sun", properties);

    this.sunTime = new Date(
      Date.UTC(
        this.time.getUTCFullYear(),
        this.time.getUTCMonth(),
        this.time.getUTCDate(),
      ),
    );
  }
}

export default Sun;
