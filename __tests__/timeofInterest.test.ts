import { beforeAll, describe, expect, test, vi } from "vitest";
import { TimeOfInterest } from "../src/time";

describe("time of Interest", () => {
  describe("sanity checks", () => {
    test("... the instance", () => {
      const timeOfInterest = new TimeOfInterest();
      expect(timeOfInterest).toBeInstanceOf(TimeOfInterest);
    });
  });

  describe("base tests", () => {
    test("...date object --> 2017-07-02 15:30:00", () => {
      const toi = new TimeOfInterest({ time: new Date("2017-07-02 15:30:00") });
      expect(toi.jd).toEqual(2457937.3125);
      expect((toi as any)["time"]).toEqual(new Date("2017-07-02 15:30:00"));
    });
    test("...jd --> 2017-07-02 15:30:00", () => {
      const toi = new TimeOfInterest({ jd: 2457937.3125 });
      expect((toi as any)["time"]).toEqual(new Date("2017-07-02 15:30:00"));
    });
    test("...T --> 2017-07-02 15:30:00", () => {
      const toi = new TimeOfInterest({ T: 0.1750119780971937 });
      expect((toi as any)["time"]).toEqual(new Date("2017-07-02 15:30:00"));
    });
  });

  describe("unit testing", () => {
    beforeAll(async () => {
      const mockDate = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
      vi.setSystemTime(mockDate);
    });
    test("...julianDate", () => {
      const toi = new TimeOfInterest();
      expect(toi.toJulianDay()).toBeCloseTo(2451545.0, 5);
      expect(toi.T).toEqual(0);
    });
    test("...julianDate async", async () => {
      const toi = new TimeOfInterest();
      expect(await toi.toJulianDayAsync()).toBeCloseTo(2451545.0, 5);
      expect(toi.T).toEqual(0);
    });
    test("...isLeapYear", () => {
      const toi = new TimeOfInterest();
      expect(toi.isLeapYear()).toEqual(true);
    });
    test("...isLeapYear async", async () => {
      const toi = new TimeOfInterest();
      expect(await toi.isLeapYearAsync()).toEqual(true);
    });
  });
});
