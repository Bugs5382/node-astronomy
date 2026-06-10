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

import { PlanetTimes } from "../src";

const NYC = { latitude: 40.7128, longitude: -74.006 } as const;
const TIME = new Date("2026-04-30T22:00:00Z");

describe("PlanetTimes", () => {
  describe.each(["mercury", "venus", "mars", "jupiter", "saturn"] as const)(
    "%s",
    (planet) => {
      const t = new PlanetTimes({
        planet,
        time: TIME,
        timezone: "America/New_York",
        ...NYC,
      });

      test("position returns sane altitude/azimuth", () => {
        const pos = t.position();
        expect(pos.altitude).toBeGreaterThanOrEqual(-90);
        expect(pos.altitude).toBeLessThanOrEqual(90);
        expect(pos.azimuth).toBeGreaterThanOrEqual(0);
        expect(pos.azimuth).toBeLessThan(360);
      });

      test("altitudeAt and azimuthAt agree with position", () => {
        const pos = t.position(TIME);
        expect(t.altitudeAt(TIME)).toBeCloseTo(pos.altitude, 6);
        expect(t.azimuthAt(TIME)).toBeCloseTo(pos.azimuth, 6);
      });

      test("apparentAltitudeAt is geometric + non-negative refraction", () => {
        const geo = t.altitudeAt(TIME);
        const apparent = t.apparentAltitudeAt(TIME);
        expect(apparent).toBeGreaterThanOrEqual(geo);
      });

      test("isAboveHorizon returns a boolean", () => {
        expect(typeof t.isAboveHorizon()).toBe("boolean");
      });

      test("isCircumpolar returns a boolean", () => {
        expect(typeof t.isCircumpolar()).toBe("boolean");
      });

      test("dailyTrack always returns the requested samples", () => {
        const track = t.dailyTrack({ samples: 24 });
        expect(track).toHaveLength(24);
      });
    },
  );

  test("Pluto can be constructed and queried", () => {
    const pluto = new PlanetTimes({
      planet: "pluto",
      time: TIME,
      timezone: "America/New_York",
      ...NYC,
    });
    const pos = pluto.position();
    expect(pos.altitude).toBeGreaterThanOrEqual(-90);
    expect(pos.altitude).toBeLessThanOrEqual(90);
  });

  test("arc honors explicit from/to and returns time-monotonic samples", () => {
    const t = new PlanetTimes({
      planet: "jupiter",
      time: TIME,
      timezone: "America/New_York",
      ...NYC,
    });
    const samples = t.arc({
      from: new Date("2026-05-01T00:00:00Z"),
      samples: 10,
      to: new Date("2026-05-01T06:00:00Z"),
    });
    expect(samples).toHaveLength(10);
    for (let index = 1; index < samples.length; index++) {
      expect(samples[index].date.getTime()).toBeGreaterThan(
        samples[index - 1].date.getTime(),
      );
    }
  });
});
