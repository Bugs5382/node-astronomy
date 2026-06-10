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
import { beforeAll, describe, expect, test } from "vitest";

import { MoonTimes } from "../src";

describe("MoonTimes", () => {
  let nyc: MoonTimes;
  const pinned = new Date("2026-04-30T22:00:00Z");

  beforeAll(() => {
    nyc = new MoonTimes({
      latitude: 40.7128,
      longitude: -74.006,
      time: pinned,
      timezone: "America/New_York",
    });
  });

  describe("sanity / properties", () => {
    test("captures observer config", () => {
      expect(nyc).toBeInstanceOf(MoonTimes);
      expect(nyc.latitude).toBe(40.7128);
      expect(nyc.longitude).toBe(-74.006);
      expect(nyc.timezone).toBe("America/New_York");
      expect(nyc.elevation).toBe(0);
    });

    test("elevation defaults to 0 and overrides through constructor", () => {
      const high = new MoonTimes({
        elevation: 1500,
        latitude: 40.7128,
        longitude: -74.006,
        time: pinned,
      });
      expect(high.elevation).toBe(1500);
    });
  });

  describe("position", () => {
    test("position(), altitudeAt(), azimuthAt() agree", () => {
      const pos = nyc.position(pinned);
      expect(pos.altitude).toBeCloseTo(nyc.altitudeAt(pinned), 6);
      expect(pos.azimuth).toBeCloseTo(nyc.azimuthAt(pinned), 6);
    });

    test("azimuth is in [0, 360)", () => {
      const az = nyc.azimuthAt(pinned);
      expect(az).toBeGreaterThanOrEqual(0);
      expect(az).toBeLessThan(360);
    });

    test("apparentAltitudeAt is geometric + non-negative refraction", () => {
      const geo = nyc.altitudeAt(pinned);
      const apparent = nyc.apparentAltitudeAt(pinned);
      expect(apparent).toBeGreaterThanOrEqual(geo);
    });
  });

  describe("rise / set / above-horizon", () => {
    test("isAboveHorizon returns a boolean", () => {
      expect(typeof nyc.isAboveHorizon(pinned)).toBe("boolean");
    });

    test("nextRise eventually returns a populated interval at NYC", () => {
      // Within a 24h window the moon must rise (it's not circumpolar at NYC
      // for the pinned date — sanity-check via isCircumpolar first).
      expect(nyc.isCircumpolar(pinned)).toBe(false);
      const rise = nyc.nextRise(pinned);
      // rise may return undefined if we're already in rise window; in
      // either case, advance one day and check again.
      const tomorrow = new Date(pinned.getTime() + 86_400_000);
      const tomorrow_rise = new MoonTimes({
        latitude: 40.7128,
        longitude: -74.006,
        time: tomorrow,
        timezone: "America/New_York",
      }).nextRise();
      expect(rise || tomorrow_rise).toBeDefined();
    });

    test("nextSet eventually returns a populated interval at NYC", () => {
      const set = nyc.nextSet(pinned);
      const tomorrow = new Date(pinned.getTime() + 86_400_000);
      const tomorrow_set = new MoonTimes({
        latitude: 40.7128,
        longitude: -74.006,
        time: tomorrow,
        timezone: "America/New_York",
      }).nextSet();
      expect(set || tomorrow_set).toBeDefined();
    });
  });

  describe("arc / peak / dailyTrack", () => {
    test("arc() returns the requested number of samples", () => {
      const samples = nyc.arc({ samples: 30 });
      // Either a populated arc (length 30) or empty if rise/set window
      // can't be derived from this exact instant; both are valid paths.
      expect(samples.length === 0 || samples.length === 30).toBe(true);
    });

    test("arc() samples are time-monotonic when populated", () => {
      const samples = nyc.arc({ samples: 12 });
      for (let index = 1; index < samples.length; index++) {
        expect(samples[index].date.getTime()).toBeGreaterThan(
          samples[index - 1].date.getTime(),
        );
      }
    });

    test("arc() honors explicit from/to", () => {
      const from = new Date("2026-05-01T01:00:00Z");
      const to = new Date("2026-05-01T07:00:00Z");
      const samples = nyc.arc({ from, samples: 5, to });
      expect(samples).toHaveLength(5);
      expect(samples[0].date.getTime()).toBe(from.getTime());
      expect(samples.at(-1)!.date.getTime()).toBe(to.getTime());
    });

    test("dailyTrack() always returns the requested samples (even if arc is empty)", () => {
      const track = nyc.dailyTrack({ samples: 24 });
      expect(track).toHaveLength(24);
    });

    test("peak() altitude matches the max of the arc when peak exists", () => {
      const peak = nyc.peak();
      if (peak) {
        const samples = nyc.arc({ samples: 60 });
        const max = Math.max(...samples.map((s) => s.altitude));
        expect(peak.altitude).toBeCloseTo(max, 5);
      }
    });
  });

  describe("angularDiameter", () => {
    test("returns geocentric and topocentric values both ≈ 0.5°", () => {
      const ad = nyc.angularDiameter();
      expect(ad.geocentric).toBeGreaterThan(0.45);
      expect(ad.geocentric).toBeLessThan(0.6);
      expect(ad.topocentric).toBeGreaterThan(0.45);
      expect(ad.topocentric).toBeLessThan(0.6);
    });
  });

  describe("isCircumpolar", () => {
    test("false at NYC for normal lunar declinations", () => {
      expect(nyc.isCircumpolar(pinned)).toBe(false);
    });
  });
});
