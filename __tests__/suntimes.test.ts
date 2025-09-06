import { beforeAll, describe, expect, test } from "vitest";

import { SunTimes } from "../src/astronomicalObject/sun";

let sunTimes: SunTimes;
beforeAll(async () => {
  // create the times of the sun
  sunTimes = new SunTimes({
    latitude: 40.6676,
    longitude: -73.9851,
    timezone: "America/New_York",
  });
});

describe("sunTimes tests", () => {
  describe("sanity checks", () => {
    test("... the instance ... sunTimes", () => {
      expect(sunTimes).toBeInstanceOf(SunTimes);
    });
  });
});
