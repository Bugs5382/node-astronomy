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
 * Planetary mean orbital-element records (Mercury through Neptune,
 * plus a re-export of Earth from `@/astrometry/earth/orbit`).
 *
 * Vendored verbatim from `@observerly/astrometry`'s `planets.js`
 * (Copyright © 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * Mercury–Neptune use astrometry's mean-element propagator (see
 * `@/astrometry/planets/anomaly.ts` and `heliocentric.ts`); Pluto is
 * handled separately by `src/astronomicalObject/planet/pluto/ephemeris.ts`.
 *
 * @since 0.2.0
 */

import { earth, type PlanetOrbital } from "@/astrometry/earth/orbit";

export const mercury: PlanetOrbital = {
  a: 0.387_099_3,
  e: 0.205_636,
  i: 7.004_979,
  isInferior: true,
  m: 0.055_274,
  name: "Mercury",
  r: 2_439_700,
  symbol: "Mercury",
  T: 0.240_846_7,
  uid: "01HD49QMD7GA502WXEMY1ZAG15",
  ε: 252.250_324,
  ϖ: 77.457_796,
  Ω: 48.330_766,
};

export const venus: PlanetOrbital = {
  a: 0.723_335_66,
  e: 6.7767e-3,
  i: 3.394_676_05,
  isInferior: true,
  m: 0.814_998_4,
  name: "Venus",
  r: 6_051_800,
  symbol: "Venus",
  T: 0.615_197,
  uid: "01HD49R1NASDCYK3ZBYYCBJTBW",
  ε: 181.9791,
  ϖ: 131.602_467,
  Ω: 76.679_843,
};

export const mars: PlanetOrbital = {
  a: 1.523_71,
  e: 0.093_394,
  i: 1.849_691,
  isInferior: false,
  m: 0.107_447,
  name: "Mars",
  r: 3_389_500,
  symbol: "Mars",
  T: 1.880_848,
  uid: "01HD4ARM2X130B6M2Q74JFKRW4",
  ε: -4.553_432,
  ϖ: -23.943_629,
  Ω: 49.559_539,
};

export const jupiter: PlanetOrbital = {
  a: 5.202_887,
  e: 0.048_393,
  i: 1.304_397_5,
  isInferior: false,
  m: 317.828_133,
  name: "Jupiter",
  r: 69_911_000,
  symbol: "Jupiter",
  T: 11.862_615,
  uid: "01HD4AYRMZP734M8FVQGXDB5BV",
  ε: 34.396_441,
  ϖ: 14.728_479,
  Ω: 100.473_909,
};

export const saturn: PlanetOrbital = {
  a: 9.536_676,
  e: 0.053_862,
  i: 2.485_992,
  isInferior: false,
  m: 95.160_904,
  name: "Saturn",
  r: 58_232_000,
  symbol: "Saturn",
  T: 29.447_498,
  uid: "01HD4AYZAHS15TJJMZDQWV1TET",
  ε: 49.954_244,
  ϖ: 92.598_878,
  Ω: 113.662_424,
};

export const uranus: PlanetOrbital = {
  a: 19.189_164_64,
  e: 0.047_257_4,
  i: 0.772_638,
  isInferior: false,
  m: 14.535_757,
  name: "Uranus",
  r: 25_362_000,
  symbol: "Uranus",
  T: 84.016_846,
  uid: "01HD4AZ66TP0P2KY9A8XFMRQ4T",
  ε: 313.238_104,
  ϖ: 170.954_276,
  Ω: 74.016_925,
};

export const neptune: PlanetOrbital = {
  a: 30.069_923,
  e: 8.677_97e-3,
  i: 1.770_043_47,
  isInferior: false,
  m: 17.147_241,
  name: "Neptune",
  r: 24_622_000,
  symbol: "Neptune",
  T: 164.791_32,
  uid: "01HD4AZGMADD008W4XT4HEV9ZC",
  ε: -55.120_029,
  ϖ: 44.964_762,
  Ω: 131.784_226,
};

/** Catalog of all planets (Mercury…Neptune + Earth). */
export const planets: readonly PlanetOrbital[] = [
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
];

export { earth, type PlanetOrbital } from "@/astrometry/earth/orbit";
