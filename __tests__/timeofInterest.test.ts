import { beforeAll, describe, expect, test, vi } from "vitest";
import TimeOfInterest from "../src/time/timeOfInterest";

describe("time of Interest", () => {
  describe("sanity checks", () => {
    test("... the instance", () => {
      const timeOfInterest = new TimeOfInterest();
      expect(timeOfInterest).toBeInstanceOf(TimeOfInterest);
    });
  });

  describe("functions", () => {
    beforeAll(async () => {
      const mockDate = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
      vi.setSystemTime(mockDate);
    });
    test("...julianDate", () => {
      const toi = new TimeOfInterest();
      const jd = toi.toJulianDay();

      expect(jd).toBeCloseTo(2451545.0, 5);
    });
    test("...julianDate async", async () => {
      const toi = new TimeOfInterest();
      const jd = await toi.toJulianDayAsync();

      expect(jd).toBeCloseTo(2451545.0, 5);
    });
  });
});
