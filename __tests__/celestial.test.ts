import { beforeAll, describe, expect, test } from "vitest";

import { Celestial } from "../src/astronomicalObject/celestial";

describe("celestial tests", () => {
  let celestial: Celestial;
  beforeAll(async () => {
    // create the celestial
    celestial = new Celestial();
  });

  describe("sanity checks", () => {
    test("... the instance ... celestial", () => {
      expect(celestial).toBeInstanceOf(Celestial);
    });
  });
});
