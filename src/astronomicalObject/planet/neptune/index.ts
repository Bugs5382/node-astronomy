import Planet from "@/astronomicalObject/planet";
import { IPlanetProperties } from "@/astronomicalObject/planet/properties";

/**
 * Neptune. See {@link Planet} for the method surface.
 *
 * @since 0.2.0
 */
export class Neptune extends Planet {
  /** @since 0.2.0 */
  constructor(properties?: Omit<IPlanetProperties, "planet">) {
    super({ ...properties, planet: "neptune" });
  }
}

export default Neptune;
