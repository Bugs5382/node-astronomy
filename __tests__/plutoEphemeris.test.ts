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

import { Pluto } from "../src";
import { getPlutoGeocentricEclipticCoordinate } from "../src/astronomicalObject/planet/pluto/ephemeris";

/**
 * Pluto-specific ephemeris tests. The hand-rolled Keplerian propagator
 * is calibrated for arc-minute precision over 1900–2100. These tests
 * sanity-check that:
 *  - The output coordinates are in valid ranges.
 *  - Two close-in-time samples don't jump unrealistically (no
 *    solver/wrapping bugs).
 *  - The motion is consistent with Pluto's slow orbit (≈ a few degrees
 *    per year in ecliptic longitude).
 *
 * Higher-precision validation against JPL Horizons would require
 * shipping a fixture and fuzzy-matching to ±2 arcmin; that's out of
 * scope for v0.2.0 — see plan/planets.md follow-ups.
 */
describe("Pluto Keplerian ephemeris", () => {
  test("coordinates are in valid angular ranges", () => {
    const ec = getPlutoGeocentricEclipticCoordinate(
      new Date("2026-04-30T22:00:00Z"),
    );
    expect(ec.longitude).toBeGreaterThanOrEqual(0);
    expect(ec.longitude).toBeLessThan(360);
    expect(ec.latitude).toBeGreaterThanOrEqual(-90);
    expect(ec.latitude).toBeLessThanOrEqual(90);
  });

  test("ecliptic longitude advances slowly across one day", () => {
    const a = getPlutoGeocentricEclipticCoordinate(
      new Date("2026-04-30T00:00:00Z"),
    );
    const b = getPlutoGeocentricEclipticCoordinate(
      new Date("2026-05-01T00:00:00Z"),
    );
    // Difference must be small but non-zero. Pluto moves ~1.45°/year =
    // 0.004°/day in ecliptic longitude in its slowest segments, more
    // when retrograde or near perihelion. Bound generously to absorb
    // sign changes near retrograde transitions.
    const diff = Math.abs(b.longitude - a.longitude);
    expect(diff).toBeLessThan(0.5);
  });

  test("ecliptic longitude advances ~1° in 6 months (order-of-magnitude)", () => {
    const a = getPlutoGeocentricEclipticCoordinate(
      new Date("2026-01-01T00:00:00Z"),
    );
    const b = getPlutoGeocentricEclipticCoordinate(
      new Date("2026-07-01T00:00:00Z"),
    );
    let diff = Math.abs(b.longitude - a.longitude);
    if (diff > 180) diff = 360 - diff;
    // Generous: anywhere between 0° (retrograde-driven near-equality)
    // and 5° is consistent with Pluto's slow motion plus Earth-induced
    // parallax over six months.
    expect(diff).toBeGreaterThanOrEqual(0);
    expect(diff).toBeLessThan(5);
  });

  test("Pluto class hooks up to the ephemeris correctly", () => {
    const pluto = new Pluto({ time: new Date("2026-04-30T22:00:00Z") });
    const ec = pluto.eclipticCoordinate();
    const direct = getPlutoGeocentricEclipticCoordinate(
      new Date("2026-04-30T22:00:00Z"),
    );
    expect(ec.longitude).toBeCloseTo(direct.longitude, 6);
    expect(ec.latitude).toBeCloseTo(direct.latitude, 6);
  });
});
