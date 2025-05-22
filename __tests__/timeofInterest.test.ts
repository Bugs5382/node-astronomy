import { beforeAll, describe, expect, test, vi } from "vitest";
import TimeOfInterest from "../src/time/timeOfInterest";

describe("time of Interest", () => {
  describe("sanity checks", () => {
    test("... the instance", () => {
      const timeOfInterest = new TimeOfInterest();
      expect(timeOfInterest).toBeInstanceOf(TimeOfInterest);
    });
  });

  describe("unit testing", () => {
    beforeAll(async () => {
      const mockDate = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
      vi.setSystemTime(mockDate);
    });
    test("...julianDate", () => {
      const toi = new TimeOfInterest();
      console.log(toi.T);
      expect(toi.jd).toBeCloseTo(2451545.0, 5);
      expect(toi.T).toEqual(0);
    });
    test("...julianDate async", async () => {
      const toi = new TimeOfInterest();
      expect(toi.jd).toBeCloseTo(2451545.0, 5);
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
