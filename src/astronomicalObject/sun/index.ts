import AstronomicalObject from "@/astronomicalObject";
import { ISun, ISunProperties } from "@/astronomicalObject/sun/types";

/**
 * Create the Sun Object
 * @since 0.1.0
 */
export class Sun extends AstronomicalObject implements ISun {
  private sunTime: Date;

  /**
   * Build Sun Object
   * @since 0.1.0
   * @param properties
   */
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
