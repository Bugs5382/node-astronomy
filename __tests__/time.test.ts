import { beforeAll, describe, expect, test } from "vitest";

import { TimeOfInterest } from "../src";

describe("time tests", () => {
  let time: TimeOfInterest;
  beforeAll(async () => {
    // create the sun
    time = new TimeOfInterest({ time: new Date("2017-07-02") });
  });

  describe("sanity checks", () => {
    test("... the instance ... time", () => {
      expect(time).toBeInstanceOf(TimeOfInterest);
    });
  });
});
