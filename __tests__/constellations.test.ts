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

  test("Orion is above the horizon and in the southern sky from NYC in winter", () => {
    const v = new ConstellationVisibility({
      ...NYC,
      constellation: "Orion",
      direction: "west-east",
      time: TIME,
    });
    expect(v.isAboveHorizon()).toBe(true);
    expect(v.isVisible()).toBe(true);
  });

  test("Orion is NOT visible when filtered to the northern half-dome", () => {
    const v = new ConstellationVisibility({
      ...NYC,
      constellation: "Orion",
      direction: "east-west",
      time: TIME,
    });
    expect(v.isAboveHorizon()).toBe(true); // still up, just on the wrong side
    expect(v.isVisible()).toBe(false);
  });

  test("Ursa Minor (with Polaris) is in the northern half-dome", () => {
    const v = new ConstellationVisibility({
      ...NYC,
      constellation: "Ursa Minor",
      direction: "east-west",
      time: TIME,
    });
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

  test("'west-east' filter excludes constellations only in the northern sky", () => {
    const south = visibleConstellations({
      ...NYC,
      direction: "west-east",
      time: TIME,
    });
    const names = new Set(south.map((c) => c.constellationName));
    // Orion is winter, southern sky — should be present.
    expect(names.has("Orion")).toBe(true);
    // Ursa Minor surrounds Polaris, near 0° azimuth (north) — must be excluded.
    expect(names.has("Ursa Minor")).toBe(false);
  });

  test("'east-west' filter excludes constellations only in the southern sky", () => {
    const north = visibleConstellations({
      ...NYC,
      direction: "east-west",
      time: TIME,
    });
    const names = new Set(north.map((c) => c.constellationName));
    expect(names.has("Ursa Minor")).toBe(true);
    expect(names.has("Orion")).toBe(false);
  });

  test("no direction filter returns only the horizon set", () => {
    const all = visibleConstellations({ ...NYC, time: TIME });
    const south = visibleConstellations({
      ...NYC,
      direction: "west-east",
      time: TIME,
    });
    const north = visibleConstellations({
      ...NYC,
      direction: "east-west",
      time: TIME,
    });
    // All ≈ south + north (allow some boundary slack).
    expect(all.length).toBeGreaterThanOrEqual(
      Math.max(south.length, north.length),
    );
  });
});
