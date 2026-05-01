import Planet from "@/astronomicalObject/planet";
import { IPlanetProperties } from "@/astronomicalObject/planet/properties";

/**
 * Pluto. See {@link Planet} for the method surface.
 *
 * Pluto's position is computed via a hand-rolled Keplerian propagator
 * from J2000 mean elements (see `pluto/ephemeris.ts`). Accuracy target:
 * ≈ arc-minute level over 1900–2100. For sub-arcsecond precision use a
 * higher-order solution (Meeus Ch 37 or JPL Horizons).
 *
 * @since 0.2.0
 */
export class Pluto extends Planet {
  /** @since 0.2.0 */
  constructor(properties?: Omit<IPlanetProperties, "planet">) {
    super({ ...properties, planet: "pluto" });
  }
}

export default Pluto;
