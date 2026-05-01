import Planet from "@/astronomicalObject/planet";
import { IPlanetProperties } from "@/astronomicalObject/planet/properties";

/**
 * Mercury — innermost planet. See {@link Planet} for the method surface.
 *
 * @since 0.2.0
 */
export class Mercury extends Planet {
  /** @since 0.2.0 */
  constructor(properties?: Omit<IPlanetProperties, "planet">) {
    super({ ...properties, planet: "mercury" });
  }
}

export default Mercury;
