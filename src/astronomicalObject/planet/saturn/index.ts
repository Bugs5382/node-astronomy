import Planet from "@/astronomicalObject/planet";
import { IPlanetProperties } from "@/astronomicalObject/planet/properties";

/**
 * Saturn. See {@link Planet} for the method surface.
 *
 * @since 0.2.0
 */
export class Saturn extends Planet {
  /** @since 0.2.0 */
  constructor(properties?: Omit<IPlanetProperties, "planet">) {
    super({ ...properties, planet: "saturn" });
  }
}

export default Saturn;
