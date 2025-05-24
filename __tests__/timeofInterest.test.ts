import { beforeEach, describe, expect, test } from "vitest";
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
      const toi = new TimeOfInterest({
        time: new Date("2017-07-02T15:30:00Z"),
      });
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
    let toi: TimeOfInterest;
    beforeEach(async () => {
      toi = new TimeOfInterest({ time: new Date("2000-01-01T12:00:00Z") });
      expect(toi.jd).toBeCloseTo(2451545, 5);
      expect(toi.T).toBe(0);
    });
    test("...isLeapYear - true", () => {
      expect(toi.isLeapYear()).toBe(true);
    });
    test("...isLeapYear async - true", async () => {
      expect(await toi.isLeapYearAsync()).toBe(true);
    });
  });

  describe("unit testing - group 2", () => {
    let toi: TimeOfInterest;
    beforeEach(async () => {
      toi = new TimeOfInterest({ time: new Date("2017-07-02T13:37:00Z") });
      expect(toi.jd).toBeCloseTo(2457937.0673611113, 5);
      expect(toi.T).toBe(0.17500526656019952);
    });
    test("...isLeapYear - false", () => {
      expect(toi.isLeapYear()).toBe(false);
    });
    test("...isLeapYear async - false", async () => {
      expect(await toi.isLeapYearAsync()).toBe(false);
    });
    test("...getDayOfYear", () => {
      expect(toi.getDayOfYear()).toBe(183);
    });
    test("...getDayOfYear async", async () => {
      expect(await toi.getDayOfYearAsync()).toBe(183);
    });
    test("...getDayOfWeek", () => {
      expect(toi.getDayOfWeek()).toBe(DayOfWeek.SUNDAY);
    });
    test("...getDayOfWeek async", async () => {
      expect(await toi.getDayOfWeekAsync()).toBe(DayOfWeek.SUNDAY);
    });
  });
});
