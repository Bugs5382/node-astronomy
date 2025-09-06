import { beforeAll, describe, expect, test } from "vitest";

import { SunTimes } from "../src/astronomicalObject/sun";

let sunTimes: SunTimes;
beforeAll(async () => {
  // create the times of the sun
  sunTimes = new SunTimes({
    time: new Date("1982-05-03T00:00:00-00:00"),
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

    test("... make sure all times equal 1 day (86400 seconds)", async () => {
      const totalSeconds = sunTimes
        .getTimes()
        .reduce((sum, block) => sum + block.seconds, 0);
      expect(totalSeconds).toBe(86400);
    });

    test("... solor noon", async () => {
      expect(sunTimes.solarNoon()).toBe("1982-05-02T12:52:48-04:00");
    });
  });

  describe("time blocks", () => {
    test("... astronomicalDawn", async () => {
      expect(sunTimes.astronomicalDawn()!.from).toBe(
        "1982-05-02T04:08:28-04:00",
      );
      expect(sunTimes.astronomicalDawn()!.to).toBe("1982-05-02T04:47:44-04:00");
      expect(sunTimes.astronomicalDawn()!.seconds).toEqual(2356);
    });
  });
});
