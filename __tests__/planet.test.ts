import { beforeAll, describe, expect, test } from "vitest";
import { Planet } from "../src/astronomicalObject/planet";

describe("planet tests", () => {
  let planet: Planet;
  beforeAll(async () => {
    // create the planet
    planet = new Planet();
  });

  describe("sanity checks", () => {
    test("... the instance ... planet", () => {
      expect(planet).toBeInstanceOf(Planet);
    });
  });
});
