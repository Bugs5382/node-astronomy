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
