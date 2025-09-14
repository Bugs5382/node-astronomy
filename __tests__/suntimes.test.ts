import { beforeAll, describe, expect, test } from "vitest";

import { SunTimes } from "../src";

let sunTimes: SunTimes;
beforeAll(async () => {
  // create the times of the sun
  sunTimes = new SunTimes({
    latitude: 40.6676,
    longitude: -73.9851,
    time: new Date("1982-05-03T00:00:00-00:00"),
  });
});

describe("sunTimes tests", () => {
  describe("sanity checks", () => {
    test("... the instance ... sunTimes", () => {
      expect(sunTimes).toBeInstanceOf(SunTimes);
    });

    test("... the instance ... sunTimes, no time", () => {
      const sunTimes_NoTime = new SunTimes({
        latitude: 40.6676,
        longitude: -73.9851,
      });
      expect(sunTimes_NoTime).toBeInstanceOf(SunTimes);
    });

    test("... the instance ... sunTimes, with timezone", () => {
      const sunTimes_NoTime = new SunTimes({
        latitude: 40.6676,
        longitude: -73.9851,
        timezone: "America/New_York",
      });
      expect(sunTimes_NoTime).toBeInstanceOf(SunTimes);
    });

    test("... make sure all times equal 1 day (86400 seconds)", async () => {
      const totalSeconds = sunTimes.timeBlocks.reduce(
        (sum, block) => sum + block.seconds,
        0,
      );
      expect(totalSeconds).toBe(86_400);
    });

    test("... solar noon", async () => {
      expect(sunTimes.solarNoon()).toBe("1982-05-02T12:52:48-04:00");
    });
  });

  describe("time blocks", () => {
    test("... midnightToAstronomicalDawn", async () => {
      expect(sunTimes.midnightToAstronomicalDawn()!.fromTz).toBe(
        "1982-05-02T00:00:00-04:00",
      );
      expect(sunTimes.midnightToAstronomicalDawn()!.toTz).toBe(
        "1982-05-02T04:08:28-04:00",
      );
      expect(sunTimes.midnightToAstronomicalDawn()!.seconds).toEqual(14_908);
    });
    test("... astronomicalDawn", async () => {
      expect(sunTimes.astronomicalDawn()!.fromTz).toBe(
        "1982-05-02T04:08:28-04:00",
      );
      expect(sunTimes.astronomicalDawn()!.toTz).toBe(
        "1982-05-02T04:47:44-04:00",
      );
      expect(sunTimes.astronomicalDawn()!.seconds).toEqual(2356);
    });
    test("... nauticalDawn", async () => {
      expect(sunTimes.nauticalDawn()!.fromTz).toBe("1982-05-02T04:47:44-04:00");
      expect(sunTimes.nauticalDawn()!.toTz).toBe("1982-05-02T05:24:00-04:00");
      expect(sunTimes.nauticalDawn()!.seconds).toEqual(2176);
    });
    test("... civilDawn", async () => {
      expect(sunTimes.civilDawn()!.fromTz).toBe("1982-05-02T05:24:00-04:00");
      expect(sunTimes.civilDawn()!.toTz).toBe("1982-05-02T05:35:39-04:00");
      expect(sunTimes.civilDawn()!.seconds).toEqual(699);
    });
    test("... sunrise", async () => {
      expect(sunTimes.sunrise()!.fromTz).toBe("1982-05-02T05:35:39-04:00");
      expect(sunTimes.sunrise()!.toTz).toBe("1982-05-02T05:59:00-04:00");
      expect(sunTimes.sunrise()!.seconds).toEqual(1401);
    });

    test("... morning golden hour", async () => {
      expect(sunTimes.goldenHourAM()!.fromTz).toBe("1982-05-02T05:59:00-04:00");
      expect(sunTimes.goldenHourAM()!.toTz).toBe("1982-05-02T06:31:38-04:00");
      expect(sunTimes.goldenHourAM()!.seconds).toEqual(1958);
    });

    test("... day time", async () => {
      expect(sunTimes.day()!.fromTz).toBe("1982-05-02T06:31:38-04:00");
      expect(sunTimes.day()!.toTz).toBe("1982-05-02T19:14:47-04:00");
      expect(sunTimes.day()!.seconds).toEqual(45_789);
    });

    test("... evening golden hour", async () => {
      expect(sunTimes.goldenHourPM()!.fromTz).toBe("1982-05-02T19:14:47-04:00");
      expect(sunTimes.goldenHourPM()!.toTz).toBe("1982-05-02T19:47:31-04:00");
      expect(sunTimes.goldenHourPM()!.seconds).toEqual(1964);
    });

    test("... sunset", async () => {
      expect(sunTimes.sunset()!.fromTz).toBe("1982-05-02T19:47:31-04:00");
      expect(sunTimes.sunset()!.toTz).toBe("1982-05-02T20:10:56-04:00");
      expect(sunTimes.sunset()!.seconds).toEqual(1405);
    });
    test("... civilDusk", async () => {
      expect(sunTimes.civilDusk()!.fromTz).toBe("1982-05-02T20:10:56-04:00");
      expect(sunTimes.civilDusk()!.toTz).toBe("1982-05-02T20:22:38-04:00");
      expect(sunTimes.civilDusk()!.seconds).toEqual(702);
    });
    test("... nauticalDusk", async () => {
      expect(sunTimes.nauticalDusk()!.fromTz).toBe("1982-05-02T20:22:38-04:00");
      expect(sunTimes.nauticalDusk()!.toTz).toBe("1982-05-02T20:59:05-04:00");
      expect(sunTimes.nauticalDusk()!.seconds).toEqual(2187);
    });
    test("... astronomicalDusk", async () => {
      expect(sunTimes.astronomicalDawn()!.fromTz).toBe(
        "1982-05-02T04:08:28-04:00",
      );
      expect(sunTimes.astronomicalDusk()!.toTz).toBe(
        "1982-05-02T21:38:36-04:00",
      );
      expect(sunTimes.astronomicalDusk()!.seconds).toEqual(2371);
    });
    test("... astronomicalDuskToMidnight", async () => {
      expect(sunTimes.astronomicalDawn()!.fromTz).toBe(
        "1982-05-02T04:08:28-04:00",
      );
      expect(sunTimes.astronomicalDuskToMidnight()!.toTz).toBe(
        "1982-05-03T00:00:00-04:00",
      );
      expect(sunTimes.astronomicalDuskToMidnight()!.seconds).toEqual(8484);
    });
  });
});
