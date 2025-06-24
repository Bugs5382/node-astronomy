import { describe, expect, test } from "vitest";
import {
  EPOCH_J1900,
  EPOCH_J1950,
  EPOCH_J2000,
  EPOCH_J2100,
  LIGHT_SPEED_KM_PER_SEC,
  STANDARD_ALTITUDE_MOON_CENTER_REFRACTION,
  STANDARD_ALTITUDE_PLANET_REFRACTION,
} from "../src/constants";

/**
 * These are tested to make sure no one messes or changes the code.
 */
describe("constants", () => {
  describe("EPOCH", () => {
    test("EPOCH_J1900 is 2415020. ", () => {
      expect(EPOCH_J1900).toEqual(2415020.0);
    });
    test("EPOCH_J1950 is 2433282.5", () => {
      expect(EPOCH_J1950).toEqual(2433282.5);
    });
    test("EPOCH_J2000 is 2451545.0", () => {
      expect(EPOCH_J2000).toEqual(2451545.0);
    });
    test("EPOCH_J2100 is 2415020.0", () => {
      expect(EPOCH_J2100).toEqual(2488070.0);
    });
  });

  test("LIGHT_SPEED_KM_PER_SEC is 299_792.458", () => {
    expect(LIGHT_SPEED_KM_PER_SEC).toEqual(299_792.458);
  });

  describe("STANDARD ALTITUDE", () => {
    test("STANDARD_ALTITUDE_MOON_CENTER_REFRACTION is 0.125", () => {
      expect(STANDARD_ALTITUDE_MOON_CENTER_REFRACTION).toEqual(0.125);
    });
    test("STANDARD_ALTITUDE_PLANET_REFRACTION is -0.5667 ", () => {
      expect(STANDARD_ALTITUDE_PLANET_REFRACTION).toEqual(-0.5667);
    });
  });
});
