import Planet from "@/astronomicalObject/planet";
import { IPlanetProperties } from "@/astronomicalObject/planet/properties";

/**
 * Jupiter. See {@link Planet} for the method surface.
 *
 * @since 0.2.0
 */
export class Jupiter extends Planet {
  /** @since 0.2.0 */
  constructor(properties?: Omit<IPlanetProperties, "planet">) {
    super({ ...properties, planet: "jupiter" });
  }
}

export default Jupiter;
