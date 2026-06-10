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
/**
 * Identifier for each supported planet.
 *
 * `Earth` is included for completeness (the {@link Earth} class exposes
 * orbital info but no observer-aware methods), and `Pluto` is supported
 * via a hand-rolled Keplerian ephemeris because `@observerly/astrometry`
 * does not include it.
 *
 * @since 0.2.0
 */
export const PlanetName = {
  Earth: "earth",
  Jupiter: "jupiter",
  Mars: "mars",
  Mercury: "mercury",
  Neptune: "neptune",
  Pluto: "pluto",
  Saturn: "saturn",
  Uranus: "uranus",
  Venus: "venus",
} as const;

/**
 * Planets for which `PlanetTimes` (observer-aware methods) is defined.
 * Earth is excluded because rise/set/alt-az from itself is undefined.
 *
 * @since 0.2.0
 */
export type ObservablePlanetName = Exclude<PlanetName, "earth">;

export type PlanetName = (typeof PlanetName)[keyof typeof PlanetName];
