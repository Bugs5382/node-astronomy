import { describe, expect, test } from "vitest";

import { Earth } from "../src";

describe("Earth (orbital info)", () => {
  test("eccentricity is small and positive", () => {
    const earth = new Earth({ time: new Date("2000-01-01T12:00:00Z") });
    const error = earth.eccentricity();
    expect(error).toBeGreaterThan(0.005);
    expect(error).toBeLessThan(0.05);
  });

  test("obliquity of ecliptic is ~23.44° at J2000", () => {
    const earth = new Earth({ time: new Date("2000-01-01T12:00:00Z") });
    const obliquity = earth.obliquityOfEcliptic();
    expect(obliquity).toBeGreaterThan(23.4);
    expect(obliquity).toBeLessThan(23.5);
  });

  test("distanceFromSun is in [0.95, 1.05] AU through the year", () => {
    const samples = [
      "2026-01-04T00:00:00Z", // near perihelion
      "2026-04-01T00:00:00Z",
      "2026-07-04T00:00:00Z", // near aphelion
      "2026-10-01T00:00:00Z",
    ];
    for (const iso of samples) {
      const earth = new Earth({ time: new Date(iso) });
      const r = earth.distanceFromSun();
      expect(r).toBeGreaterThan(0.95);
      expect(r).toBeLessThan(1.05);
    }
  });

  test("heliocentricPosition agrees with distanceFromSun", () => {
    const earth = new Earth({ time: new Date("2026-04-30T22:00:00Z") });
    const pos = earth.heliocentricPosition();
    expect(pos.radius).toBeCloseTo(earth.distanceFromSun(), 6);
    expect(pos.longitude).toBeGreaterThanOrEqual(0);
    expect(pos.longitude).toBeLessThan(360);
  });
});
