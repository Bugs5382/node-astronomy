import { AstronomicalObject, IAstronomicalObject } from "@/astronomicalObject";

/**
 * Base class for celestial objects beyond our solar system — stars,
 * constellations, deep-sky objects. Just an `AstronomicalObject` with
 * the name pre-set to `"celestial"`. Subclasses can override.
 *
 * @since 0.1.0
 */
export class Celestial extends AstronomicalObject {
  /**
   * Build a Celestial snapshot.
   *
   * @since 0.1.0
   * @param properties - Optional `time`/`name`.
   */
  constructor(properties?: IAstronomicalObject) {
    super(properties?.name ?? "celestial", properties);
  }
}

export default Celestial;
