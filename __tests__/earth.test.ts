/*
MIT License

Copyright (c) 2026 Shane Froebel

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
