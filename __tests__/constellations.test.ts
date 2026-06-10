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

import {
  Constellation,
  ConstellationVisibility,
  findConstellationAt,
  visibleConstellations,
} from "../src";

describe("Constellation snapshot", () => {
  test("Orion exposes IAU metadata and a sane centroid", () => {
    const orion = new Constellation({ constellation: "Orion" });
    expect(orion.constellationName).toBe("Orion");
    expect(orion.abbreviation.length).toBeGreaterThan(0);
    expect(typeof orion.meaning).toBe("string");
    // Orion is near the celestial equator, RA ≈ 5h ≈ 75°.
    expect(orion.centroid.ra).toBeGreaterThan(60);
    expect(orion.centroid.ra).toBeLessThan(110);
    expect(orion.centroid.dec).toBeGreaterThan(-15);
    expect(orion.centroid.dec).toBeLessThan(20);
  });

  test("feature() returns a GeoJSON FeatureCollection", () => {
    const orion = new Constellation({ constellation: "Orion" });
    const feature = orion.feature();
    expect(feature.type).toBe("FeatureCollection");
    expect(feature.features.length).toBeGreaterThan(0);
  });

  test("unknown constellation name throws", () => {
    expect(
      () =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new Constellation({ constellation: "Atlantis" as any }),
    ).toThrow(/Unknown constellation/);
  });

  test("string-positional constructor accepts canonical names (any case)", () => {
    expect(new Constellation("Orion").constellationName).toBe("Orion");
    expect(new Constellation("orion").constellationName).toBe("Orion");
    expect(new Constellation("ORION").constellationName).toBe("Orion");
  });

  test("string-positional constructor accepts IAU abbreviations", () => {
    expect(new Constellation("Ori").constellationName).toBe("Orion");
    expect(new Constellation("UMa").constellationName).toBe("Ursa Major");
    expect(new Constellation("uma").constellationName).toBe("Ursa Major");
  });

  test("string-positional constructor resolves common asterisms", () => {
    expect(new Constellation("big dipper").constellationName).toBe(
      "Ursa Major",
    );
    expect(new Constellation("Big Dipper").constellationName).toBe(
      "Ursa Major",
    );
    expect(new Constellation("plough").constellationName).toBe("Ursa Major");
    expect(new Constellation("little dipper").constellationName).toBe(
      "Ursa Minor",
    );
    expect(new Constellation("northern cross").constellationName).toBe(
      "Cygnus",
    );
    expect(new Constellation("teapot").constellationName).toBe("Sagittarius");
  });

  test("string-positional constructor throws with a 'did you mean' hint on unknown input", () => {
    expect(() => new Constellation("Big Dippper")).toThrow(/Did you mean/);
    expect(() => new Constellation("Atlantis")).toThrow(
      /Unknown constellation/,
    );
  });
});

describe("findConstellationAt", () => {
  test("Orion's nominal RA/Dec resolves to Orion", () => {
    const result = findConstellationAt({ dec: -1.2, ra: 83 });
    expect(result?.constellationName).toBe("Orion");
  });

  test("Polaris's coordinates resolve to Ursa Minor", () => {
    const result = findConstellationAt({ dec: 89.26, ra: 37.95 });
    expect(result?.constellationName).toBe("Ursa Minor");
  });
});

describe("ConstellationVisibility (NYC fixtures)", () => {
  const NYC = { latitude: 40.7128, longitude: -74.006 };
  const TIME = new Date("2026-01-15T03:00:00Z"); // late evening winter, NYC

  test("Orion is above the horizon from NYC in winter", () => {
    const v = new ConstellationVisibility({
      ...NYC,
      constellation: "Orion",
      time: TIME,
    });
    expect(v.isAboveHorizon()).toBe(true);
    expect(v.isVisible()).toBe(true);
  });

  test("centerAltAz returns sane numbers", () => {
    const v = new ConstellationVisibility({
      ...NYC,
      constellation: "Orion",
      time: TIME,
    });
    const altAz = v.centerAltAz();
    expect(altAz.altitude).toBeGreaterThanOrEqual(-90);
    expect(altAz.altitude).toBeLessThanOrEqual(90);
    expect(altAz.azimuth).toBeGreaterThanOrEqual(0);
    expect(altAz.azimuth).toBeLessThan(360);
  });
});

describe("visibleConstellations (top-level helper)", () => {
  const NYC = { latitude: 40.7128, longitude: -74.006 };
  const TIME = new Date("2026-01-15T03:00:00Z");

  test("returns a list of Constellation snapshots", () => {
    const result = visibleConstellations({ ...NYC, time: TIME });
    expect(result.length).toBeGreaterThan(10);
    expect(result.every((c) => c instanceof Constellation)).toBe(true);
  });

  test("Orion is in the visible set from NYC at this time", () => {
    const result = visibleConstellations({ ...NYC, time: TIME });
    const names = new Set(result.map((c) => c.constellationName));
    expect(names.has("Orion")).toBe(true);
  });
});
