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
import { describe, expect, test } from "vitest";

import { StarTimes } from "../src";

const NYC = { latitude: 40.7128, longitude: -74.006 } as const;
const SYDNEY = { latitude: -33.8688, longitude: 151.2093 } as const;
const TIME = new Date("2026-04-30T22:00:00Z");

describe("StarTimes — Polaris (the user's headline use case)", () => {
  test("is circumpolar from NYC", () => {
    const polaris = new StarTimes({ ...NYC, star: "Polaris", time: TIME });
    expect(polaris.isCircumpolar()).toBe(true);
  });

  test("is NOT circumpolar from Sydney (southern hemisphere)", () => {
    const polaris = new StarTimes({ ...SYDNEY, star: "Polaris", time: TIME });
    expect(polaris.isCircumpolar()).toBe(false);
  });

  test("position from NYC has altitude near observer's latitude (~40°)", () => {
    const polaris = new StarTimes({ ...NYC, star: "Polaris", time: TIME });
    const pos = polaris.position();
    // Altitude of Polaris ≈ observer latitude (40.7°) in northern hemisphere.
    expect(pos.altitude).toBeGreaterThan(38);
    expect(pos.altitude).toBeLessThan(42);
    // Azimuth near 0° (north).
    expect(pos.azimuth >= 350 || pos.azimuth <= 10).toBe(true);
  });

  test("nextRise / nextSet return undefined for circumpolar Polaris (NYC)", () => {
    const polaris = new StarTimes({ ...NYC, star: "Polaris", time: TIME });
    expect(polaris.nextRise()).toBeUndefined();
    expect(polaris.nextSet()).toBeUndefined();
  });

  test("dailyTrack returns the requested samples for circumpolar Polaris", () => {
    const polaris = new StarTimes({ ...NYC, star: "Polaris", time: TIME });
    const track = polaris.dailyTrack({ samples: 24 });
    expect(track).toHaveLength(24);
    // Polaris stays close to the same altitude all day at NYC latitude.
    const altitudes = track.map((t) => t.altitude);
    const min = Math.min(...altitudes);
    const max = Math.max(...altitudes);
    expect(max - min).toBeLessThan(2); // very small daily wobble
  });
});

describe("StarTimes — Sirius (a non-circumpolar star)", () => {
  test("not circumpolar at NYC", () => {
    const sirius = new StarTimes({ ...NYC, star: "Sirius", time: TIME });
    expect(sirius.isCircumpolar()).toBe(false);
  });

  test("position has sane altitude/azimuth ranges", () => {
    const sirius = new StarTimes({ ...NYC, star: "Sirius", time: TIME });
    const pos = sirius.position();
    expect(pos.altitude).toBeGreaterThanOrEqual(-90);
    expect(pos.altitude).toBeLessThanOrEqual(90);
    expect(pos.azimuth).toBeGreaterThanOrEqual(0);
    expect(pos.azimuth).toBeLessThan(360);
  });

  test("isAboveHorizon returns boolean", () => {
    const sirius = new StarTimes({ ...NYC, star: "Sirius", time: TIME });
    expect(typeof sirius.isAboveHorizon()).toBe("boolean");
  });
});

describe("StarTimes — generic shape", () => {
  test("altitudeAt and azimuthAt agree with position", () => {
    const vega = new StarTimes({ ...NYC, star: "Vega", time: TIME });
    const pos = vega.position(TIME);
    expect(vega.altitudeAt(TIME)).toBeCloseTo(pos.altitude, 6);
    expect(vega.azimuthAt(TIME)).toBeCloseTo(pos.azimuth, 6);
  });

  test("apparentAltitudeAt is geometric + non-negative refraction", () => {
    const vega = new StarTimes({ ...NYC, star: "Vega", time: TIME });
    const geo = vega.altitudeAt(TIME);
    const apparent = vega.apparentAltitudeAt(TIME);
    expect(apparent).toBeGreaterThanOrEqual(geo);
  });

  test("arc honors explicit from/to", () => {
    const vega = new StarTimes({ ...NYC, star: "Vega", time: TIME });
    const samples = vega.arc({
      from: new Date("2026-05-01T00:00:00Z"),
      samples: 5,
      to: new Date("2026-05-01T06:00:00Z"),
    });
    expect(samples).toHaveLength(5);
    for (let index = 1; index < samples.length; index++) {
      expect(samples[index].date.getTime()).toBeGreaterThan(
        samples[index - 1].date.getTime(),
      );
    }
  });
});
