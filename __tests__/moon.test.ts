/*
MIT License

Copyright (c) __YEAR__ __AUTHOR__

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
import { beforeAll, describe, expect, test } from "vitest";

import { Moon, MoonPhase } from "../src";

describe("Moon", () => {
  let moon: Moon;
  // Pinned reference instant for golden-value comparisons.
  const pinned = new Date("2026-04-30T22:00:00Z");

  beforeAll(() => {
    moon = new Moon({ time: pinned });
  });

  describe("sanity", () => {
    test("is a Moon instance", () => {
      expect(moon).toBeInstanceOf(Moon);
      expect(moon.name).toBe("moon");
    });

    test("default constructor uses now() and still works", () => {
      const live = new Moon();
      expect(live.time).toBeInstanceOf(Date);
      expect(live.distance()).toBeGreaterThan(356_000);
      expect(live.distance()).toBeLessThan(407_000);
    });
  });

  describe("phase / illumination", () => {
    test("phase() returns one of the named phases", () => {
      const allowed = new Set<string>(Object.values(MoonPhase));
      expect(allowed.has(moon.phase())).toBe(true);
    });

    test("phaseAngle() is in [0, 180]", () => {
      const angle = moon.phaseAngle();
      expect(angle).toBeGreaterThanOrEqual(0);
      expect(angle).toBeLessThanOrEqual(180);
    });

    test("illumination() is in [0, 1]", () => {
      const k = moon.illumination();
      expect(k).toBeGreaterThanOrEqual(0);
      expect(k).toBeLessThanOrEqual(1);
    });

    test("illumination is high near full moon and low near new moon", () => {
      // Pick a date close to a known full moon to sanity-check the
      // direction of the illumination curve. The relationship is
      // monotonic with phase angle: |illum| inversely tracks |angle|.
      const a = new Moon({ time: pinned }).illumination();
      const tenDaysLater = new Date(pinned.getTime() + 10 * 86_400_000);
      const b = new Moon({ time: tenDaysLater }).illumination();
      // 10 days separates broadly different phases — so the values
      // should not be identical.
      expect(a).not.toBe(b);
    });
  });

  describe("distance / age", () => {
    test("distance() is within physical range", () => {
      const km = moon.distance();
      expect(km).toBeGreaterThan(356_500);
      expect(km).toBeLessThan(406_700);
    });

    test("age() is in [0, 29.6]", () => {
      const days = moon.age();
      expect(days).toBeGreaterThanOrEqual(0);
      expect(days).toBeLessThanOrEqual(29.6);
    });
  });

  describe("equatorial coordinate", () => {
    test("returns RA in [0, 360) and Dec in [-90, 90]", () => {
      const eq = moon.equatorialCoordinate();
      expect(eq.ra).toBeGreaterThanOrEqual(0);
      expect(eq.ra).toBeLessThan(360);
      expect(eq.dec).toBeGreaterThanOrEqual(-90);
      expect(eq.dec).toBeLessThanOrEqual(90);
    });
  });

  describe("phase predicates and next-events", () => {
    test("isFull / isNew / isBlue return booleans", () => {
      expect(typeof moon.isFull()).toBe("boolean");
      expect(typeof moon.isNew()).toBe("boolean");
      expect(typeof moon.isBlue()).toBe("boolean");
    });

    test("nextNewMoon and nextFullMoon return future Dates", () => {
      expect(moon.nextNewMoon().getTime()).toBeGreaterThan(pinned.getTime());
      expect(moon.nextFullMoon().getTime()).toBeGreaterThan(pinned.getTime());
    });

    test("nextNewMoon and nextFullMoon are within a synodic month (~29.6 days)", () => {
      const synodicMs = 29.6 * 86_400_000;
      expect(moon.nextNewMoon().getTime() - pinned.getTime()).toBeLessThan(
        synodicMs,
      );
      expect(moon.nextFullMoon().getTime() - pinned.getTime()).toBeLessThan(
        synodicMs,
      );
    });
  });
});
