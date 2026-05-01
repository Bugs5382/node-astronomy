import AstronomicalObject from "@/astronomicalObject";
import { ISun, ISunProperties } from "@/astronomicalObject/sun/types";

/**
 * Snapshot of the sun bound to a single moment in time.
 *
 * `Sun` is the lightweight base for `SunTimes`. By itself it carries no
 * observer location and therefore exposes no rise/set or altitude data —
 * use `SunTimes` for those. The class extends `AstronomicalObject` so the
 * `name` and `time` fields follow the same convention as every other body
 * in the package.
 *
 * @since 0.1.0
 * @example
 * ```ts
 * const sun = new Sun({ time: new Date("1982-05-03T00:00:00Z") });
 * sun.time; // 1982-05-03T00:00:00.000Z
 * ```
 */
export class Sun extends AstronomicalObject implements ISun {
  /**
   * Build the Sun snapshot.
   *
   * @since 0.1.0
   * @param properties - Optional `time` (default: `new Date()`).
   */
  constructor(properties?: ISunProperties) {
    super("sun", properties);
  }
}

export default Sun;
