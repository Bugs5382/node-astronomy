import { differenceInSeconds } from "date-fns";
import { beforeAll, describe, expect, test } from "vitest";

import { SunTimes } from "../src";

let sunTimes: SunTimes;
beforeAll(async () => {
  // Pin timezone so tests don't depend on the system timezone.
  // 1982-05-03 00:00 UTC === 1982-05-02 20:00 EDT, so the snapshot
  // covers EDT 1982-05-02.
  sunTimes = new SunTimes({
    latitude: 40.6676,
    longitude: -73.9851,
    time: new Date("1982-05-03T00:00:00-00:00"),
    timezone: "America/New_York",
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

    test("... start and end span exactly the local civil day", () => {
      // EDT 1982-05-02 00:00 (UTC-4) to 1982-05-03 00:00 EDT
      expect(sunTimes.start).toStrictEqual(
        new Date("1982-05-02T04:00:00.000Z"),
      );
      expect(sunTimes.end).toStrictEqual(new Date("1982-05-03T04:00:00.000Z"));
    });

    test("... time blocks total the civil day length", () => {
      const totalSeconds = sunTimes.timeBlocks.reduce(
        (sum, block) => sum + block.seconds,
        0,
      );
      expect(totalSeconds).toBe(
        differenceInSeconds(sunTimes.end, sunTimes.start),
      );
      // 1982-05-02 EDT is not a DST-transition day, so it's exactly 24h.
      expect(totalSeconds).toBe(86_400);
    });

    test("... solar noon", async () => {
      expect(sunTimes.solarNoon()!.date).toStrictEqual(
        new Date("1982-05-02T16:52:48.582Z"),
      );
      // Output formatted in the supplied timezone.
      expect(sunTimes.solarNoon()!.dateTz).toBe("1982-05-02T12:52:48-04:00");
    });
  });

  describe("time blocks", () => {
    test("... midnightToAstronomicalDawn", async () => {
      expect(sunTimes.midnightToAstronomicalDawn()!.from).toStrictEqual(
        new Date("1982-05-02T04:00:00.000Z"),
      );
      expect(sunTimes.midnightToAstronomicalDawn()!.to).toStrictEqual(
        new Date("1982-05-02T08:08:28.000Z"),
      );
      expect(sunTimes.midnightToAstronomicalDawn()!.seconds).toEqual(14_908);
    });
    test("... astronomicalDawn", async () => {
      expect(sunTimes.astronomicalDawn()!.from).toStrictEqual(
        new Date("1982-05-02T04:08:28-04:00"),
      );
      expect(sunTimes.astronomicalDawn()!.to).toStrictEqual(
        new Date("1982-05-02T04:47:44-04:00"),
      );
      expect(sunTimes.astronomicalDawn()!.seconds).toEqual(2356);
    });
    test("... nauticalDawn", async () => {
      expect(sunTimes.nauticalDawn()!.from).toStrictEqual(
        new Date("1982-05-02T04:47:44-04:00"),
      );
      expect(sunTimes.nauticalDawn()!.to).toStrictEqual(
        new Date("1982-05-02T05:24:00-04:00"),
      );
      expect(sunTimes.nauticalDawn()!.seconds).toEqual(2176);
    });
    test("... civilDawn (-6° to -0.833°)", async () => {
      expect(sunTimes.civilDawn()!.from).toStrictEqual(
        new Date("1982-05-02T05:24:00-04:00"),
      );
      expect(sunTimes.civilDawn()!.to).toStrictEqual(
        new Date("1982-05-02T05:53:44-04:00"),
      );
      expect(sunTimes.civilDawn()!.seconds).toEqual(1784);
    });
    test("... sunrise (-0.833° to -0.27°, NOAA-style disk transition)", async () => {
      expect(sunTimes.sunrise()!.from).toStrictEqual(
        new Date("1982-05-02T05:53:44-04:00"),
      );
      expect(sunTimes.sunrise()!.to).toStrictEqual(
        new Date("1982-05-02T05:56:55-04:00"),
      );
      expect(sunTimes.sunrise()!.seconds).toEqual(191);
    });

    test("... morning golden hour", async () => {
      expect(sunTimes.goldenHourAM()!.from).toStrictEqual(
        new Date("1982-05-02T05:56:55-04:00"),
      );
      expect(sunTimes.goldenHourAM()!.to).toStrictEqual(
        new Date("1982-05-02T06:31:38-04:00"),
      );
      expect(sunTimes.goldenHourAM()!.seconds).toEqual(2083);
    });

    test("... day time", async () => {
      expect(sunTimes.day()!.from).toStrictEqual(
        new Date("1982-05-02T06:31:38-04:00"),
      );
      expect(sunTimes.day()!.to).toStrictEqual(
        new Date("1982-05-02T19:14:47-04:00"),
      );
      expect(sunTimes.day()!.seconds).toEqual(45_789);
    });

    test("... evening golden hour", async () => {
      expect(sunTimes.goldenHourPM()!.from).toStrictEqual(
        new Date("1982-05-02T19:14:47-04:00"),
      );
      expect(sunTimes.goldenHourPM()!.to).toStrictEqual(
        new Date("1982-05-02T19:49:36-04:00"),
      );
      expect(sunTimes.goldenHourPM()!.seconds).toEqual(2089);
    });

    test("... sunset (-0.27° to -0.833°, NOAA-style disk transition)", async () => {
      expect(sunTimes.sunset()!.from).toStrictEqual(
        new Date("1982-05-02T19:49:36-04:00"),
      );
      expect(sunTimes.sunset()!.to).toStrictEqual(
        new Date("1982-05-02T19:52:47-04:00"),
      );
      expect(sunTimes.sunset()!.seconds).toEqual(191);
    });
    test("... civilDusk (-0.833° to -6°)", async () => {
      expect(sunTimes.civilDusk()!.from).toStrictEqual(
        new Date("1982-05-02T19:52:47-04:00"),
      );
      expect(sunTimes.civilDusk()!.to).toStrictEqual(
        new Date("1982-05-02T20:22:38-04:00"),
      );
      expect(sunTimes.civilDusk()!.seconds).toEqual(1791);
    });
    test("... nauticalDusk", async () => {
      expect(sunTimes.nauticalDusk()!.from).toStrictEqual(
        new Date("1982-05-02T20:22:38-04:00"),
      );
      expect(sunTimes.nauticalDusk()!.to).toStrictEqual(
        new Date("1982-05-02T20:59:05-04:00"),
      );
      expect(sunTimes.nauticalDusk()!.seconds).toEqual(2187);
    });
    test("... astronomicalDusk", async () => {
      expect(sunTimes.astronomicalDusk()!.from).toStrictEqual(
        new Date("1982-05-02T20:59:05-04:00"),
      );
      expect(sunTimes.astronomicalDusk()!.to).toStrictEqual(
        new Date("1982-05-02T21:38:36-04:00"),
      );
      expect(sunTimes.astronomicalDusk()!.seconds).toEqual(2371);
    });
    test("... astronomicalDuskToMidnight", async () => {
      expect(sunTimes.astronomicalDuskToMidnight()!.from).toStrictEqual(
        new Date("1982-05-02T21:38:36-04:00"),
      );
      expect(sunTimes.astronomicalDuskToMidnight()!.to).toStrictEqual(
        new Date("1982-05-03T00:00:00-04:00"),
      );
      expect(sunTimes.astronomicalDuskToMidnight()!.seconds).toEqual(8484);
    });

    test("... bands are contiguous (each block's `to` is next block's `from`)", () => {
      for (let index = 1; index < sunTimes.timeBlocks.length; index++) {
        expect(sunTimes.timeBlocks[index].interval.from).toStrictEqual(
          sunTimes.timeBlocks[index - 1].interval.to,
        );
      }
    });
  });

  describe("sun position", () => {
    test("... altitudeAt at sunrise.from is near NOAA threshold (-0.833°)", () => {
      const alt = sunTimes.altitudeAt(sunTimes.sunrise()!.from);
      expect(alt).toBeGreaterThan(-0.85);
      expect(alt).toBeLessThan(-0.8);
    });

    test("... altitudeAt is highest at solar noon", () => {
      const peak = sunTimes.altitudeAt(sunTimes.solarNoon()!.date);
      const morning = sunTimes.altitudeAt(new Date("1982-05-02T13:00:00.000Z"));
      const evening = sunTimes.altitudeAt(new Date("1982-05-02T22:00:00.000Z"));
      expect(peak).toBeGreaterThan(morning);
      expect(peak).toBeGreaterThan(evening);
      // At ~40.7°N on May 2, the noon altitude should be in the 60s°.
      expect(peak).toBeGreaterThan(60);
      expect(peak).toBeLessThan(70);
    });

    test("... altitudeAt is negative deep at night", () => {
      // 1982-05-02 03:00 EDT = 07:00 UTC, well before astronomical dawn
      const alt = sunTimes.altitudeAt(new Date("1982-05-02T07:00:00.000Z"));
      expect(alt).toBeLessThan(-12);
    });

    test("... azimuthAt is in the eastern half at sunrise, western at sunset", () => {
      const sunriseAz = sunTimes.azimuthAt(sunTimes.sunrise()!.from);
      const sunsetAz = sunTimes.azimuthAt(sunTimes.sunset()!.from);
      // Azimuth (deg cw from north): east = 90, south = 180, west = 270.
      expect(sunriseAz).toBeGreaterThan(0);
      expect(sunriseAz).toBeLessThan(180);
      expect(sunsetAz).toBeGreaterThan(180);
      expect(sunsetAz).toBeLessThan(360);
    });

    test("... positionAt returns both altitude and azimuth", () => {
      const noon = sunTimes.solarNoon()!.date;
      const pos = sunTimes.positionAt(noon);
      expect(pos.altitude).toBeCloseTo(sunTimes.altitudeAt(noon), 6);
      expect(pos.azimuth).toBeCloseTo(sunTimes.azimuthAt(noon), 6);
    });
  });

  describe("coversDate", () => {
    test("... true for instants inside the snapshot window", () => {
      expect(sunTimes.coversDate(sunTimes.start)).toBe(true);
      expect(sunTimes.coversDate(sunTimes.solarNoon()!.date)).toBe(true);
      expect(sunTimes.coversDate(new Date(sunTimes.end.getTime() - 1))).toBe(
        true,
      );
    });

    test("... false for the exact end instant (half-open)", () => {
      expect(sunTimes.coversDate(sunTimes.end)).toBe(false);
    });

    test("... false for instants on adjacent days", () => {
      expect(sunTimes.coversDate(new Date(sunTimes.start.getTime() - 1))).toBe(
        false,
      );
      expect(
        sunTimes.coversDate(new Date(sunTimes.end.getTime() + 86_400_000)),
      ).toBe(false);
    });
  });

  describe("timezone independence", () => {
    test("... constructor honors supplied timezone, not system tz", () => {
      // Same UTC instant, different supplied timezones, must produce
      // different start/end windows that align with each timezone's
      // local civil day.
      const sNY = new SunTimes({
        latitude: 40.6676,
        longitude: -73.9851,
        time: new Date("1982-05-02T18:00:00Z"),
        timezone: "America/New_York",
      });
      const sUTC = new SunTimes({
        latitude: 40.6676,
        longitude: -73.9851,
        time: new Date("1982-05-02T18:00:00Z"),
        timezone: "UTC",
      });
      // 18:00 UTC === 14:00 EDT, so the EDT day is 1982-05-02
      // (start = 04:00 UTC) and the UTC day is 1982-05-02 (start = 00:00 UTC).
      expect(sNY.start).toStrictEqual(new Date("1982-05-02T04:00:00.000Z"));
      expect(sUTC.start).toStrictEqual(new Date("1982-05-02T00:00:00.000Z"));
    });
  });
});
