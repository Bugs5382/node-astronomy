import { beforeAll, describe, expect, test } from "vitest";
import { Earth } from "../src/astronomicalObject/planet/earth";

describe("earth tests", () => {
  let earth: Earth;
  beforeAll(async () => {
    // create the earth
    earth = new Earth();
  });

  describe("sanity checks", () => {
    test("... the instance ... earth", () => {
      expect(earth).toBeInstanceOf(Earth);
    });
  });
});
