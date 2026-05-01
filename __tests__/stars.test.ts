import { describe, expect, test } from "vitest";

import { getNamedStar, listNamedStars, Star } from "../src";

describe("Star (snapshot)", () => {
  test("Polaris exposes catalog metadata", () => {
    const polaris = new Star({ star: "Polaris" });
    expect(polaris.starName).toBe("Polaris");
    expect(polaris.bayer()).toBe("α UMi");
    expect(polaris.constellation()).toBe("Ursa Minor");
    expect(polaris.magnitude()).toBeCloseTo(1.98, 2);
    expect(polaris.spectralClass()).toBe("F7Ib");
    expect(polaris.hip()).toBe(11_767);
  });

  test("equatorialCoordinate returns sane J2000 RA/Dec", () => {
    const polaris = new Star({ star: "Polaris" });
    const eq = polaris.equatorialCoordinate();
    expect(eq.ra).toBeGreaterThanOrEqual(0);
    expect(eq.ra).toBeLessThan(360);
    expect(eq.dec).toBeGreaterThanOrEqual(-90);
    expect(eq.dec).toBeLessThanOrEqual(90);
    expect(eq.dec).toBeGreaterThan(89); // Polaris near north pole
  });

  test("unknown star throws", () => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      () => new Star({ star: "AtlantisStar" as any }),
    ).toThrow(/Unknown star/);
  });

  test("listNamedStars returns the catalog keys", () => {
    const list = listNamedStars();
    expect(list.length).toBeGreaterThan(20);
    expect(list).toContain("Polaris");
    expect(list).toContain("Sirius");
    expect(list).toContain("Vega");
  });

  test("getNamedStar fetches a specific entry", () => {
    const sirius = getNamedStar("Sirius");
    expect(sirius.constellation).toBe("Canis Major");
    expect(sirius.magnitude).toBeLessThan(0); // Sirius is brightest, mag = -1.46
  });

  test("every catalog entry has all required fields", () => {
    for (const name of listNamedStars()) {
      const entry = getNamedStar(name);
      expect(entry.name).toBe(name);
      expect(typeof entry.bayer).toBe("string");
      expect(typeof entry.iauName).toBe("string");
      expect(typeof entry.hip).toBe("number");
      expect(typeof entry.raDeg).toBe("number");
      expect(entry.raDeg).toBeGreaterThanOrEqual(0);
      expect(entry.raDeg).toBeLessThan(360);
      expect(entry.decDeg).toBeGreaterThanOrEqual(-90);
      expect(entry.decDeg).toBeLessThanOrEqual(90);
      expect(typeof entry.magnitude).toBe("number");
      expect(typeof entry.spectralClass).toBe("string");
      expect(typeof entry.constellation).toBe("string");
    }
  });
});
