import { beforeAll, describe, expect, test, vi } from "vitest";
import { DayOfWeek } from "../src/constants";
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
      expect(toi.jd).toEqual(2457937.1458333335);
      expect((toi as any)["time"]).toEqual(
        new Date(Date.UTC(2017, 6, 2, 15, 30, 0)),
      );
    });
    test("...jd --> 2017-07-02 15:30:00", () => {
      const toi = new TimeOfInterest({ jd: 2457937.1458333335 });
      expect((toi as any)["time"]).toEqual(
        new Date(Date.UTC(2017, 6, 2, 15, 30, 0)),
      );
    });
    test("...T --> 2017-07-02 15:30:00", () => {
      const toi = new TimeOfInterest({ T: 0.17500741501255 });
      expect((toi as any)["time"]).toEqual(
        new Date(Date.UTC(2017, 6, 2, 15, 30, 0)),
      );
    });
  });

  describe("unit testing - group 1", () => {
    beforeAll(async () => {
      const mockDate = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
      vi.setSystemTime(mockDate);
    });
    test("...julianDate", () => {
      const toi = new TimeOfInterest();
      expect(toi.toJulianDay()).toBeCloseTo(2451544.5833333335, 5);
      expect(toi.T).toBe(0.4999885922883912);
    });
    test("...julianDate async", async () => {
      const toi = new TimeOfInterest();
      expect(await toi.toJulianDayAsync()).toBeCloseTo(2451544.5833333335, 5);
      expect(toi.T).toBe(0.4999885922883912);
    });
    test("...isLeapYear", () => {
      const toi = new TimeOfInterest();
      expect(toi.isLeapYear()).toBe(true);
    });
    test("...isLeapYear async", async () => {
      const toi = new TimeOfInterest();
      expect(await toi.isLeapYearAsync()).toBe(true);
    });
  });

  describe("unit testing - group 2", () => {
    beforeAll(async () => {
      const mockDate = new Date(Date.UTC(2017, 7, 2, 13, 37, 0));
      vi.setSystemTime(mockDate);
    });
    test("...isLeapYear", () => {
      const toi = new TimeOfInterest();
      expect(toi.isLeapYear()).toBe(false);
    });
    test("...isLeapYear async", async () => {
      const toi = new TimeOfInterest();
      expect(await toi.isLeapYearAsync()).toBe(false);
    });
    test("...getDayOfYear", () => {
      const toi = new TimeOfInterest();
      expect(toi.getDayOfYear()).toBe(183);
    });
    test("...getDayOfYear async", async () => {
      const toi = new TimeOfInterest();
      expect(await toi.getDayOfYearAsync()).toBe(183);
    });
    test("...getDayOfWeek", () => {
      const toi = new TimeOfInterest();
      expect(toi.getDayOfWeek()).toBe(DayOfWeek.SUNDAY);
    });
    test("...getDayOfWeek async", async () => {
      const toi = new TimeOfInterest();
      expect(await toi.getDayOfWeekAsync()).toBe(DayOfWeek.SUNDAY);
    });
  });
});
