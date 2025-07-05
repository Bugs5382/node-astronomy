import { beforeAll, describe, expect, test } from "vitest";
import { Stars } from "../src/astronomicalObject/celestial/stars";

describe("stars tests", () => {
  let stars: Stars;
  beforeAll(async () => {
    // create the stars
    stars = new Stars();
  });

  describe("sanity checks", () => {
    test("... the instance ... stars", () => {
      expect(stars).toBeInstanceOf(Stars);
    });
  });
});
