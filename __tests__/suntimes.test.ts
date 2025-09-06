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
      const totalSeconds = sunTimes.timeBlocks.reduce(
        (sum, block) => sum + block.seconds,
        0,
      );
      expect(totalSeconds).toBe(86400);
    });

    test("... solar noon", async () => {
      expect(sunTimes.solarNoon()).toBe("1982-05-02T12:52:48-04:00");
    });
  });

  describe("time blocks", () => {
    test("... midnightToAstronomicalDawn", async () => {
      expect(sunTimes.midnightToAstronomicalDawn()!.from).toBe(
        "1982-05-02T00:00:00-04:00",
      );
      expect(sunTimes.midnightToAstronomicalDawn()!.to).toBe(
        "1982-05-02T04:08:28-04:00",
      );
      expect(sunTimes.midnightToAstronomicalDawn()!.seconds).toEqual(14908);
    });
    test("... astronomicalDawn", async () => {
      expect(sunTimes.astronomicalDawn()!.from).toBe(
        "1982-05-02T04:08:28-04:00",
      );
      expect(sunTimes.astronomicalDawn()!.to).toBe("1982-05-02T04:47:44-04:00");
      expect(sunTimes.astronomicalDawn()!.seconds).toEqual(2356);
    });
    test("... nauticalDawn", async () => {
      expect(sunTimes.nauticalDawn()!.from).toBe("1982-05-02T04:47:44-04:00");
      expect(sunTimes.nauticalDawn()!.to).toBe("1982-05-02T05:24:00-04:00");
      expect(sunTimes.nauticalDawn()!.seconds).toEqual(2176);
    });
    test("... civilDawn", async () => {
      expect(sunTimes.civilDawn()!.from).toBe("1982-05-02T05:24:00-04:00");
      expect(sunTimes.civilDawn()!.to).toBe("1982-05-02T05:35:39-04:00");
      expect(sunTimes.civilDawn()!.seconds).toEqual(699);
    });
    test("... civilDusk", async () => {
      expect(sunTimes.civilDusk()!.from).toBe("1982-05-02T20:10:56-04:00");
      expect(sunTimes.civilDusk()!.to).toBe("1982-05-02T20:22:38-04:00");
      expect(sunTimes.civilDusk()!.seconds).toEqual(702);
    });
    test("... nauticalDusk", async () => {
      expect(sunTimes.nauticalDusk()!.from).toBe("1982-05-02T20:22:38-04:00");
      expect(sunTimes.nauticalDusk()!.to).toBe("1982-05-02T20:59:05-04:00");
      expect(sunTimes.nauticalDusk()!.seconds).toEqual(2187);
    });
    test("... astronomicalDusk", async () => {
      expect(sunTimes.astronomicalDawn()!.from).toBe(
        "1982-05-02T04:08:28-04:00",
      );
      expect(sunTimes.astronomicalDusk()!.to).toBe("1982-05-02T21:38:36-04:00");
      expect(sunTimes.astronomicalDusk()!.seconds).toEqual(2371);
    });
    test("... astronomicalDuskToMidnight", async () => {
      expect(sunTimes.astronomicalDawn()!.from).toBe(
        "1982-05-02T04:08:28-04:00",
      );
      expect(sunTimes.astronomicalDuskToMidnight()!.to).toBe(
        "1982-05-03T00:00:00-04:00",
      );
      expect(sunTimes.astronomicalDuskToMidnight()!.seconds).toEqual(8484);
    });
  });
});
