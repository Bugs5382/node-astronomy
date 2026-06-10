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
  Jupiter,
  Mars,
  Mercury,
  Neptune,
  Planet,
  PlanetName,
  Pluto,
  Saturn,
  Uranus,
  Venus,
} from "../src";

const pinned = new Date("2026-04-30T22:00:00Z");

describe("Planet snapshot classes", () => {
  test("base Planet defaults to earth and accepts a planet override", () => {
    const earth = new Planet({ time: pinned });
    expect(earth.planet).toBe("earth");
    const mars = new Planet({ planet: "mars", time: pinned });
    expect(mars.planet).toBe("mars");
  });

  describe.each<{ Cls: typeof Planet; planet: PlanetName; symbol: string }>([
    { Cls: Mercury, planet: "mercury", symbol: "☿" },
    { Cls: Venus, planet: "venus", symbol: "♀" },
    { Cls: Mars, planet: "mars", symbol: "♂" },
    { Cls: Jupiter, planet: "jupiter", symbol: "♃" },
    { Cls: Saturn, planet: "saturn", symbol: "♄" },
    { Cls: Uranus, planet: "uranus", symbol: "♅" },
    { Cls: Neptune, planet: "neptune", symbol: "♆" },
    { Cls: Pluto, planet: "pluto", symbol: "♇" },
  ])("$planet", ({ Cls, planet, symbol }) => {
    const instance = new Cls({ time: pinned });

    test("identifies as the right planet", () => {
      expect(instance).toBeInstanceOf(Planet);
      expect(instance.planet).toBe(planet);
    });

    test("symbol() returns the expected glyph", () => {
      expect(instance.symbol()).toBe(symbol);
    });

    test("eclipticCoordinate returns sane angles", () => {
      const ec = instance.eclipticCoordinate();
      expect(ec.longitude).toBeGreaterThanOrEqual(0);
      expect(ec.longitude).toBeLessThan(360);
      expect(ec.latitude).toBeGreaterThanOrEqual(-90);
      expect(ec.latitude).toBeLessThanOrEqual(90);
    });

    test("equatorialCoordinate returns sane angles", () => {
      const eq = instance.equatorialCoordinate();
      expect(eq.ra).toBeGreaterThanOrEqual(0);
      expect(eq.ra).toBeLessThan(360);
      expect(eq.dec).toBeGreaterThanOrEqual(-90);
      expect(eq.dec).toBeLessThanOrEqual(90);
    });

    test("heliocentricDistance is plausible", () => {
      const r = instance.heliocentricDistance();
      // Mercury ~0.39 AU, Pluto ~39 AU.
      expect(r).toBeGreaterThan(0.3);
      expect(r).toBeLessThan(50);
    });

    test("displayName matches the human-friendly form", () => {
      const expected = planet.charAt(0).toUpperCase() + planet.slice(1);
      expect(instance.displayName()).toBe(expected);
    });
  });
});
