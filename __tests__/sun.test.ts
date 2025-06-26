import { beforeAll, describe, expect, test } from "vitest";

import { Sun } from "../src/astronomicalObject/sun";

describe("sun tests", () => {
  let sun: Sun;
  beforeAll(async () => {
    // create the sun
    sun = new Sun({ time: new Date("2017-07-02") });
  });

  describe("sanity checks", () => {
    test("... the instance ... sun", () => {
      expect(sun).toBeInstanceOf(Sun);
    });
  });
});
