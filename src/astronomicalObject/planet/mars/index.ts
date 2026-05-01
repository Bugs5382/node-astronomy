import Planet from "@/astronomicalObject/planet";
import { IPlanetProperties } from "@/astronomicalObject/planet/properties";

/**
 * Mars. See {@link Planet} for the method surface.
 *
 * @since 0.2.0
 */
export class Mars extends Planet {
  /** @since 0.2.0 */
  constructor(properties?: Omit<IPlanetProperties, "planet">) {
    super({ ...properties, planet: "mars" });
  }
}

export default Mars;
