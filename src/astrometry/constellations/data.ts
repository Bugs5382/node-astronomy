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
/* eslint-disable */
// @ts-nocheck
//
// Vendored verbatim from @observerly/astrometry constellations.js
// (Copyright 2021-2023 observerly, MIT licensed). See NOTICE.
import { getCorrectionToEquatorialForPrecessionOfEquinoxes as l } from "@/astrometry/constellations/precession";
import { interpolateRank2DGeodesicCoordinateArray as i } from "@/astrometry/constellations/maths";
const m = (e) => !!e && e !== null && typeof e == "object" && "ral" in e && "rau" in e && "decl" in e && "name" in e && typeof e.ral == "number" && typeof e.rau == "number" && typeof e.decl == "number" && typeof e.name == "string", d = [
  {
    ral: 0,
    rau: 24,
    decl: 88,
    name: "Ursa Minor"
  },
  {
    ral: 8,
    rau: 14.5,
    decl: 86.5,
    name: "Ursa Minor"
  },
  {
    ral: 21,
    rau: 23,
    decl: 86.1667,
    name: "Ursa Minor"
  },
  {
    ral: 18,
    rau: 21,
    decl: 86,
    name: "Ursa Minor"
  },
  {
    ral: 0,
    rau: 8,
    decl: 85,
    name: "Cepheus"
  },
  {
    ral: 9.1667,
    rau: 10.6667,
    decl: 82,
    name: "Camelopardalis"
  },
  {
    ral: 0,
    rau: 5,
    decl: 80,
    name: "Cepheus"
  },
  {
    ral: 10.6667,
    rau: 14.5,
    decl: 80,
    name: "Camelopardalis"
  },
  {
    ral: 17.5,
    rau: 18,
    decl: 80,
    name: "Ursa Minor"
  },
  {
    ral: 20.1667,
    rau: 21,
    decl: 80,
    name: "Draco"
  },
  {
    ral: 0,
    rau: 3.5083,
    decl: 77,
    name: "Cepheus"
  },
  {
    ral: 11.5,
    rau: 13.5833,
    decl: 77,
    name: "Camelopardalis"
  },
  {
    ral: 16.5333,
    rau: 17.5,
    decl: 75,
    name: "Ursa Minor"
  },
  {
    ral: 20.1667,
    rau: 20.6667,
    decl: 75,
    name: "Cepheus"
  },
  {
    ral: 7.9667,
    rau: 9.1667,
    decl: 73.5,
    name: "Camelopardalis"
  },
  {
    ral: 9.1667,
    rau: 11.3333,
    decl: 73.5,
    name: "Draco"
  },
  {
    ral: 13,
    rau: 16.5333,
    decl: 70,
    name: "Ursa Minor"
  },
  {
    ral: 3.1,
    rau: 3.4167,
    decl: 68,
    name: "Cassiopeia"
  },
  {
    ral: 20.4167,
    rau: 20.6667,
    decl: 67,
    name: "Draco"
  },
  {
    ral: 11.3333,
    rau: 12,
    decl: 66.5,
    name: "Draco"
  },
  {
    ral: 0,
    rau: 0.3333,
    decl: 66,
    name: "Cepheus"
  },
  {
    ral: 14,
    rau: 15.6667,
    decl: 66,
    name: "Ursa Minor"
  },
  {
    ral: 23.5833,
    rau: 24,
    decl: 66,
    name: "Cepheus"
  },
  {
    ral: 12,
    rau: 13.5,
    decl: 64,
    name: "Draco"
  },
  {
    ral: 13.5,
    rau: 14.4167,
    decl: 63,
    name: "Draco"
  },
  {
    ral: 23.1667,
    rau: 23.5833,
    decl: 63,
    name: "Cepheus"
  },
  {
    ral: 6.1,
    rau: 7,
    decl: 62,
    name: "Camelopardalis"
  },
  {
    ral: 20,
    rau: 20.4167,
    decl: 61.5,
    name: "Draco"
  },
  {
    ral: 20.5367,
    rau: 20.6,
    decl: 60.9167,
    name: "Cepheus"
  },
  {
    ral: 7,
    rau: 7.9667,
    decl: 60,
    name: "Camelopardalis"
  },
  {
    ral: 7.9667,
    rau: 8.4167,
    decl: 60,
    name: "Ursa Major"
  },
  {
    ral: 19.7667,
    rau: 20,
    decl: 59.5,
    name: "Draco"
  },
  {
    ral: 20,
    rau: 20.5367,
    decl: 59.5,
    name: "Cepheus"
  },
  {
    ral: 22.8667,
    rau: 23.1667,
    decl: 59.0833,
    name: "Cepheus"
  },
  {
    ral: 0,
    rau: 2.4333,
    decl: 58.5,
    name: "Cassiopeia"
  },
  {
    ral: 19.4167,
    rau: 19.7667,
    decl: 58,
    name: "Draco"
  },
  {
    ral: 1.7,
    rau: 1.9083,
    decl: 57.5,
    name: "Cassiopeia"
  },
  {
    ral: 2.4333,
    rau: 3.1,
    decl: 57,
    name: "Cassiopeia"
  },
  {
    ral: 3.1,
    rau: 3.1667,
    decl: 57,
    name: "Camelopardalis"
  },
  {
    ral: 22.3167,
    rau: 22.8667,
    decl: 56.25,
    name: "Cepheus"
  },
  {
    ral: 5,
    rau: 6.1,
    decl: 56,
    name: "Camelopardalis"
  },
  {
    ral: 14.0333,
    rau: 14.4167,
    decl: 55.5,
    name: "Ursa Major"
  },
  {
    ral: 14.4167,
    rau: 19.4167,
    decl: 55.5,
    name: "Draco"
  },
  {
    ral: 3.1667,
    rau: 3.3333,
    decl: 55,
    name: "Camelopardalis"
  },
  {
    ral: 22.1333,
    rau: 22.3167,
    decl: 55,
    name: "Cepheus"
  },
  {
    ral: 20.6,
    rau: 21.9667,
    decl: 54.8333,
    name: "Cepheus"
  },
  {
    ral: 0,
    rau: 1.7,
    decl: 54,
    name: "Cassiopeia"
  },
  {
    ral: 6.1,
    rau: 6.5,
    decl: 54,
    name: "Lynx"
  },
  {
    ral: 12.0833,
    rau: 13.5,
    decl: 53,
    name: "Ursa Major"
  },
  {
    ral: 15.25,
    rau: 15.75,
    decl: 53,
    name: "Draco"
  },
  {
    ral: 21.9667,
    rau: 22.1333,
    decl: 52.75,
    name: "Cepheus"
  },
  {
    ral: 3.3333,
    rau: 5,
    decl: 52.5,
    name: "Camelopardalis"
  },
  {
    ral: 22.8667,
    rau: 23.3333,
    decl: 52.5,
    name: "Cassiopeia"
  },
  {
    ral: 15.75,
    rau: 17,
    decl: 51.5,
    name: "Draco"
  },
  {
    ral: 2.0417,
    rau: 2.5167,
    decl: 50.5,
    name: "Perseus"
  },
  {
    ral: 17,
    rau: 18.2333,
    decl: 50.5,
    name: "Draco"
  },
  {
    ral: 0,
    rau: 1.3667,
    decl: 50,
    name: "Cassiopeia"
  },
  {
    ral: 1.3667,
    rau: 1.6667,
    decl: 50,
    name: "Perseus"
  },
  {
    ral: 6.5,
    rau: 6.8,
    decl: 50,
    name: "Lynx"
  },
  {
    ral: 23.3333,
    rau: 24,
    decl: 50,
    name: "Cassiopeia"
  },
  {
    ral: 13.5,
    rau: 14.0333,
    decl: 48.5,
    name: "Ursa Major"
  },
  {
    ral: 0,
    rau: 1.1167,
    decl: 48,
    name: "Cassiopeia"
  },
  {
    ral: 23.5833,
    rau: 24,
    decl: 48,
    name: "Cassiopeia"
  },
  {
    ral: 18.175,
    rau: 18.2333,
    decl: 47.5,
    name: "Hercules"
  },
  {
    ral: 18.2333,
    rau: 19.0833,
    decl: 47.5,
    name: "Draco"
  },
  {
    ral: 19.0833,
    rau: 19.1667,
    decl: 47.5,
    name: "Cygnus"
  },
  {
    ral: 1.6667,
    rau: 2.0417,
    decl: 47,
    name: "Perseus"
  },
  {
    ral: 8.4167,
    rau: 9.1667,
    decl: 47,
    name: "Ursa Major"
  },
  {
    ral: 0.1667,
    rau: 0.8667,
    decl: 46,
    name: "Cassiopeia"
  },
  {
    ral: 12,
    rau: 12.0833,
    decl: 45,
    name: "Ursa Major"
  },
  {
    ral: 6.8,
    rau: 7.3667,
    decl: 44.5,
    name: "Lynx"
  },
  {
    ral: 21.9083,
    rau: 21.9667,
    decl: 44,
    name: "Cygnus"
  },
  {
    ral: 21.875,
    rau: 21.9083,
    decl: 43.75,
    name: "Cygnus"
  },
  {
    ral: 19.1667,
    rau: 19.4,
    decl: 43.5,
    name: "Cygnus"
  },
  {
    ral: 9.1667,
    rau: 10.1667,
    decl: 42,
    name: "Ursa Major"
  },
  {
    ral: 10.1667,
    rau: 10.7833,
    decl: 40,
    name: "Ursa Major"
  },
  {
    ral: 15.4333,
    rau: 15.75,
    decl: 40,
    name: "Boötes"
  },
  {
    ral: 15.75,
    rau: 16.3333,
    decl: 40,
    name: "Hercules"
  },
  {
    ral: 9.25,
    rau: 9.5833,
    decl: 39.75,
    name: "Lynx"
  },
  {
    ral: 0,
    rau: 2.5167,
    decl: 36.75,
    name: "Andromeda"
  },
  {
    ral: 2.5167,
    rau: 2.5667,
    decl: 36.75,
    name: "Perseus"
  },
  {
    ral: 19.3583,
    rau: 19.4,
    decl: 36.5,
    name: "Lyra"
  },
  {
    ral: 4.5,
    rau: 4.6917,
    decl: 36,
    name: "Perseus"
  },
  {
    ral: 21.7333,
    rau: 21.875,
    decl: 36,
    name: "Cygnus"
  },
  {
    ral: 21.875,
    rau: 22,
    decl: 36,
    name: "Lacerta"
  },
  {
    ral: 6.5333,
    rau: 7.3667,
    decl: 35.5,
    name: "Auriga"
  },
  {
    ral: 7.3667,
    rau: 7.75,
    decl: 35.5,
    name: "Lynx"
  },
  {
    ral: 0,
    rau: 2,
    decl: 35,
    name: "Andromeda"
  },
  {
    ral: 22,
    rau: 22.8167,
    decl: 35,
    name: "Lacerta"
  },
  {
    ral: 22.8167,
    rau: 22.8667,
    decl: 34.5,
    name: "Lacerta"
  },
  {
    ral: 22.8667,
    rau: 23.5,
    decl: 34.5,
    name: "Andromeda"
  },
  {
    ral: 2.5667,
    rau: 2.7167,
    decl: 34,
    name: "Perseus"
  },
  {
    ral: 10.7833,
    rau: 11,
    decl: 34,
    name: "Ursa Major"
  },
  {
    ral: 12,
    rau: 12.3333,
    decl: 34,
    name: "Canes Venatici"
  },
  {
    ral: 7.75,
    rau: 9.25,
    decl: 33.5,
    name: "Lynx"
  },
  {
    ral: 9.25,
    rau: 9.8833,
    decl: 33.5,
    name: "Leo Minor"
  },
  {
    ral: 0.7167,
    rau: 1.4083,
    decl: 33,
    name: "Andromeda"
  },
  {
    ral: 15.1833,
    rau: 15.4333,
    decl: 33,
    name: "Boötes"
  },
  {
    ral: 23.5,
    rau: 23.75,
    decl: 32.0833,
    name: "Andromeda"
  },
  {
    ral: 12.3333,
    rau: 13.25,
    decl: 32,
    name: "Canes Venatici"
  },
  {
    ral: 23.75,
    rau: 24,
    decl: 31.3333,
    name: "Andromeda"
  },
  {
    ral: 13.9583,
    rau: 14.0333,
    decl: 30.75,
    name: "Canes Venatici"
  },
  {
    ral: 2.4167,
    rau: 2.7167,
    decl: 30.6667,
    name: "Triangulum"
  },
  {
    ral: 2.7167,
    rau: 4.5,
    decl: 30.6667,
    name: "Perseus"
  },
  {
    ral: 4.5,
    rau: 4.75,
    decl: 30,
    name: "Auriga"
  },
  {
    ral: 18.175,
    rau: 19.3583,
    decl: 30,
    name: "Lyra"
  },
  {
    ral: 11,
    rau: 12,
    decl: 29,
    name: "Ursa Major"
  },
  {
    ral: 19.6667,
    rau: 20.9167,
    decl: 29,
    name: "Cygnus"
  },
  {
    ral: 4.75,
    rau: 5.8833,
    decl: 28.5,
    name: "Auriga"
  },
  {
    ral: 9.8833,
    rau: 10.5,
    decl: 28.5,
    name: "Leo Minor"
  },
  {
    ral: 13.25,
    rau: 13.9583,
    decl: 28.5,
    name: "Canes Venatici"
  },
  {
    ral: 0,
    rau: 0.0667,
    decl: 28,
    name: "Andromeda"
  },
  {
    ral: 1.4083,
    rau: 1.6667,
    decl: 28,
    name: "Triangulum"
  },
  {
    ral: 5.8833,
    rau: 6.5333,
    decl: 28,
    name: "Auriga"
  },
  {
    ral: 7.8833,
    rau: 8,
    decl: 28,
    name: "Gemini"
  },
  {
    ral: 20.9167,
    rau: 21.7333,
    decl: 28,
    name: "Cygnus"
  },
  {
    ral: 19.2583,
    rau: 19.6667,
    decl: 27.5,
    name: "Cygnus"
  },
  {
    ral: 1.9167,
    rau: 2.4167,
    decl: 27.25,
    name: "Triangulum"
  },
  {
    ral: 16.1667,
    rau: 16.3333,
    decl: 27,
    name: "Corona Borealis"
  },
  {
    ral: 15.0833,
    rau: 15.1833,
    decl: 26,
    name: "Boötes"
  },
  {
    ral: 15.1833,
    rau: 16.1667,
    decl: 26,
    name: "Corona Borealis"
  },
  {
    ral: 18.3667,
    rau: 18.8667,
    decl: 26,
    name: "Lyra"
  },
  {
    ral: 10.75,
    rau: 11,
    decl: 25.5,
    name: "Leo Minor"
  },
  {
    ral: 18.8667,
    rau: 19.2583,
    decl: 25.5,
    name: "Lyra"
  },
  {
    ral: 1.6667,
    rau: 1.9167,
    decl: 25,
    name: "Triangulum"
  },
  {
    ral: 0.7167,
    rau: 0.85,
    decl: 23.75,
    name: "Pisces"
  },
  {
    ral: 10.5,
    rau: 10.75,
    decl: 23.5,
    name: "Leo Minor"
  },
  {
    ral: 21.25,
    rau: 21.4167,
    decl: 23.5,
    name: "Vulpecula"
  },
  {
    ral: 5.7,
    rau: 5.8833,
    decl: 22.8333,
    name: "Taurus"
  },
  {
    ral: 0.0667,
    rau: 0.1417,
    decl: 22,
    name: "Andromeda"
  },
  {
    ral: 15.9167,
    rau: 16.0333,
    decl: 22,
    name: "Serpens"
  },
  {
    ral: 5.8833,
    rau: 6.2167,
    decl: 21.5,
    name: "Gemini"
  },
  {
    ral: 19.8333,
    rau: 20.25,
    decl: 21.25,
    name: "Vulpecula"
  },
  {
    ral: 18.8667,
    rau: 19.25,
    decl: 21.0833,
    name: "Vulpecula"
  },
  {
    ral: 0.1417,
    rau: 0.85,
    decl: 21,
    name: "Andromeda"
  },
  {
    ral: 20.25,
    rau: 20.5667,
    decl: 20.5,
    name: "Vulpecula"
  },
  {
    ral: 7.8083,
    rau: 7.8833,
    decl: 20,
    name: "Gemini"
  },
  {
    ral: 20.5667,
    rau: 21.25,
    decl: 19.5,
    name: "Vulpecula"
  },
  {
    ral: 19.25,
    rau: 19.8333,
    decl: 19.1667,
    name: "Vulpecula"
  },
  {
    ral: 3.2833,
    rau: 3.3667,
    decl: 19,
    name: "Aries"
  },
  {
    ral: 18.8667,
    rau: 19,
    decl: 18.5,
    name: "Sagitta"
  },
  {
    ral: 5.7,
    rau: 5.7667,
    decl: 18,
    name: "Orion"
  },
  {
    ral: 6.2167,
    rau: 6.3083,
    decl: 17.5,
    name: "Gemini"
  },
  {
    ral: 19,
    rau: 19.8333,
    decl: 16.1667,
    name: "Sagitta"
  },
  {
    ral: 4.9667,
    rau: 5.3333,
    decl: 16,
    name: "Taurus"
  },
  {
    ral: 15.9167,
    rau: 16.0833,
    decl: 16,
    name: "Hercules"
  },
  {
    ral: 19.8333,
    rau: 20.25,
    decl: 15.75,
    name: "Sagitta"
  },
  {
    ral: 4.6167,
    rau: 4.9667,
    decl: 15.5,
    name: "Taurus"
  },
  {
    ral: 5.3333,
    rau: 5.6,
    decl: 15.5,
    name: "Taurus"
  },
  {
    ral: 12.8333,
    rau: 13.5,
    decl: 15,
    name: "Coma Berenices"
  },
  {
    ral: 17.25,
    rau: 18.25,
    decl: 14.3333,
    name: "Hercules"
  },
  {
    ral: 11.8667,
    rau: 12.8333,
    decl: 14,
    name: "Coma Berenices"
  },
  {
    ral: 7.5,
    rau: 7.8083,
    decl: 13.5,
    name: "Gemini"
  },
  {
    ral: 16.75,
    rau: 17.25,
    decl: 12.8333,
    name: "Hercules"
  },
  {
    ral: 0,
    rau: 0.1417,
    decl: 12.5,
    name: "Pegasus"
  },
  {
    ral: 5.6,
    rau: 5.7667,
    decl: 12.5,
    name: "Taurus"
  },
  {
    ral: 7,
    rau: 7.5,
    decl: 12.5,
    name: "Gemini"
  },
  {
    ral: 21.1167,
    rau: 21.3333,
    decl: 12.5,
    name: "Pegasus"
  },
  {
    ral: 6.3083,
    rau: 6.9333,
    decl: 12,
    name: "Gemini"
  },
  {
    ral: 18.25,
    rau: 18.8667,
    decl: 12,
    name: "Hercules"
  },
  {
    ral: 20.875,
    rau: 21.05,
    decl: 11.8333,
    name: "Delphinus"
  },
  {
    ral: 21.05,
    rau: 21.1167,
    decl: 11.8333,
    name: "Pegasus"
  },
  {
    ral: 11.5167,
    rau: 11.8667,
    decl: 11,
    name: "Leo"
  },
  {
    ral: 6.2417,
    rau: 6.3083,
    decl: 10,
    name: "Orion"
  },
  {
    ral: 6.9333,
    rau: 7,
    decl: 10,
    name: "Gemini"
  },
  {
    ral: 7.8083,
    rau: 7.925,
    decl: 10,
    name: "Cancer"
  },
  {
    ral: 23.8333,
    rau: 24,
    decl: 10,
    name: "Pegasus"
  },
  {
    ral: 1.6667,
    rau: 3.2833,
    decl: 9.9167,
    name: "Aries"
  },
  {
    ral: 20.1417,
    rau: 20.3,
    decl: 8.5,
    name: "Delphinus"
  },
  {
    ral: 13.5,
    rau: 15.0833,
    decl: 8,
    name: "Boötes"
  },
  {
    ral: 22.75,
    rau: 23.8333,
    decl: 7.5,
    name: "Pegasus"
  },
  {
    ral: 7.925,
    rau: 9.25,
    decl: 7,
    name: "Cancer"
  },
  {
    ral: 9.25,
    rau: 10.75,
    decl: 7,
    name: "Leo"
  },
  {
    ral: 18.25,
    rau: 18.6622,
    decl: 6.25,
    name: "Ophiuchus"
  },
  {
    ral: 18.6622,
    rau: 18.8667,
    decl: 6.25,
    name: "Aquila"
  },
  {
    ral: 20.8333,
    rau: 20.875,
    decl: 6,
    name: "Delphinus"
  },
  {
    ral: 7,
    rau: 7.0167,
    decl: 5.5,
    name: "Canis Minor"
  },
  {
    ral: 18.25,
    rau: 18.425,
    decl: 4.5,
    name: "Serpens"
  },
  {
    ral: 16.0833,
    rau: 16.75,
    decl: 4,
    name: "Hercules"
  },
  {
    ral: 18.25,
    rau: 18.425,
    decl: 3,
    name: "Ophiuchus"
  },
  {
    ral: 21.4667,
    rau: 21.6667,
    decl: 2.75,
    name: "Pegasus"
  },
  {
    ral: 0,
    rau: 2,
    decl: 2,
    name: "Pisces"
  },
  {
    ral: 18.5833,
    rau: 18.8667,
    decl: 2,
    name: "Serpens"
  },
  {
    ral: 20.3,
    rau: 20.8333,
    decl: 2,
    name: "Delphinus"
  },
  {
    ral: 20.8333,
    rau: 21.3333,
    decl: 2,
    name: "Equuleus"
  },
  {
    ral: 21.3333,
    rau: 21.4667,
    decl: 2,
    name: "Pegasus"
  },
  {
    ral: 22,
    rau: 22.75,
    decl: 2,
    name: "Pegasus"
  },
  {
    ral: 21.6667,
    rau: 22,
    decl: 1.75,
    name: "Pegasus"
  },
  {
    ral: 7.0167,
    rau: 7.2,
    decl: 1.5,
    name: "Canis Minor"
  },
  {
    ral: 3.5833,
    rau: 4.6167,
    decl: 0,
    name: "Taurus"
  },
  {
    ral: 4.6167,
    rau: 4.6667,
    decl: 0,
    name: "Orion"
  },
  {
    ral: 7.2,
    rau: 8.0833,
    decl: 0,
    name: "Canis Minor"
  },
  {
    ral: 14.6667,
    rau: 15.0833,
    decl: 0,
    name: "Virgo"
  },
  {
    ral: 17.8333,
    rau: 18.25,
    decl: 0,
    name: "Ophiuchus"
  },
  {
    ral: 2.65,
    rau: 3.2833,
    decl: -1.75,
    name: "Cetus"
  },
  {
    ral: 3.2833,
    rau: 3.5833,
    decl: -1.75,
    name: "Taurus"
  },
  {
    ral: 15.0833,
    rau: 16.2667,
    decl: -3.25,
    name: "Serpens"
  },
  {
    ral: 4.6667,
    rau: 5.0833,
    decl: -4,
    name: "Orion"
  },
  {
    ral: 5.8333,
    rau: 6.2417,
    decl: -4,
    name: "Orion"
  },
  {
    ral: 17.8333,
    rau: 17.9667,
    decl: -4,
    name: "Serpens"
  },
  {
    ral: 18.25,
    rau: 18.5833,
    decl: -4,
    name: "Serpens"
  },
  {
    ral: 18.5833,
    rau: 18.8667,
    decl: -4,
    name: "Aquila"
  },
  {
    ral: 22.75,
    rau: 23.8333,
    decl: -4,
    name: "Pisces"
  },
  {
    ral: 10.75,
    rau: 11.5167,
    decl: -6,
    name: "Leo"
  },
  {
    ral: 11.5167,
    rau: 11.8333,
    decl: -6,
    name: "Virgo"
  },
  {
    ral: 0,
    rau: 0.3333,
    decl: -7,
    name: "Pisces"
  },
  {
    ral: 23.8333,
    rau: 24,
    decl: -7,
    name: "Pisces"
  },
  {
    ral: 14.25,
    rau: 14.6667,
    decl: -8,
    name: "Virgo"
  },
  {
    ral: 15.9167,
    rau: 16.2667,
    decl: -8,
    name: "Ophiuchus"
  },
  {
    ral: 20,
    rau: 20.5333,
    decl: -9,
    name: "Aquila"
  },
  {
    ral: 21.3333,
    rau: 21.8667,
    decl: -9,
    name: "Aquarius"
  },
  {
    ral: 17.1667,
    rau: 17.9667,
    decl: -10,
    name: "Ophiuchus"
  },
  {
    ral: 5.8333,
    rau: 8.0833,
    decl: -11,
    name: "Monoceros"
  },
  {
    ral: 4.9167,
    rau: 5.0833,
    decl: -11,
    name: "Eridanus"
  },
  {
    ral: 5.0833,
    rau: 5.8333,
    decl: -11,
    name: "Orion"
  },
  {
    ral: 8.0833,
    rau: 8.3667,
    decl: -11,
    name: "Hydra"
  },
  {
    ral: 9.5833,
    rau: 10.75,
    decl: -11,
    name: "Sextans"
  },
  {
    ral: 11.8333,
    rau: 12.8333,
    decl: -11,
    name: "Virgo"
  },
  {
    ral: 17.5833,
    rau: 17.6667,
    decl: -11.6667,
    name: "Ophiuchus"
  },
  {
    ral: 18.8667,
    rau: 20,
    decl: -12.0333,
    name: "Aquila"
  },
  {
    ral: 4.8333,
    rau: 4.9167,
    decl: -14.5,
    name: "Eridanus"
  },
  {
    ral: 20.5333,
    rau: 21.3333,
    decl: -15,
    name: "Aquarius"
  },
  {
    ral: 17.1667,
    rau: 18.25,
    decl: -16,
    name: "Serpens"
  },
  {
    ral: 18.25,
    rau: 18.8667,
    decl: -16,
    name: "Scutum"
  },
  {
    ral: 8.3667,
    rau: 8.5833,
    decl: -17,
    name: "Hydra"
  },
  {
    ral: 16.2667,
    rau: 16.375,
    decl: -18.25,
    name: "Ophiuchus"
  },
  {
    ral: 8.5833,
    rau: 9.0833,
    decl: -19,
    name: "Hydra"
  },
  {
    ral: 10.75,
    rau: 10.8333,
    decl: -19,
    name: "Crater"
  },
  {
    ral: 16.2667,
    rau: 16.375,
    decl: -19.25,
    name: "Scorpius"
  },
  {
    ral: 15.6667,
    rau: 15.9167,
    decl: -20,
    name: "Libra"
  },
  {
    ral: 12.5833,
    rau: 12.8333,
    decl: -22,
    name: "Corvus"
  },
  {
    ral: 12.8333,
    rau: 14.25,
    decl: -22,
    name: "Virgo"
  },
  {
    ral: 9.0833,
    rau: 9.75,
    decl: -24,
    name: "Hydra"
  },
  {
    ral: 1.6667,
    rau: 2.65,
    decl: -24.3833,
    name: "Cetus"
  },
  {
    ral: 2.65,
    rau: 3.75,
    decl: -24.3833,
    name: "Eridanus"
  },
  {
    ral: 10.8333,
    rau: 11.8333,
    decl: -24.5,
    name: "Crater"
  },
  {
    ral: 11.8333,
    rau: 12.5833,
    decl: -24.5,
    name: "Corvus"
  },
  {
    ral: 14.25,
    rau: 14.9167,
    decl: -24.5,
    name: "Libra"
  },
  {
    ral: 16.2667,
    rau: 16.75,
    decl: -24.5833,
    name: "Ophiuchus"
  },
  {
    ral: 0,
    rau: 1.6667,
    decl: -25.5,
    name: "Cetus"
  },
  {
    ral: 21.3333,
    rau: 21.8667,
    decl: -25.5,
    name: "Capricornus"
  },
  {
    ral: 21.8667,
    rau: 23.8333,
    decl: -25.5,
    name: "Aquarius"
  },
  {
    ral: 23.8333,
    rau: 24,
    decl: -25.5,
    name: "Cetus"
  },
  {
    ral: 9.75,
    rau: 10.25,
    decl: -26.5,
    name: "Hydra"
  },
  {
    ral: 4.7,
    rau: 4.8333,
    decl: -27.25,
    name: "Eridanus"
  },
  {
    ral: 4.8333,
    rau: 6.1167,
    decl: -27.25,
    name: "Lepus"
  },
  {
    ral: 20,
    rau: 21.3333,
    decl: -28,
    name: "Capricornus"
  },
  {
    ral: 10.25,
    rau: 10.5833,
    decl: -29.1667,
    name: "Hydra"
  },
  {
    ral: 12.5833,
    rau: 14.9167,
    decl: -29.5,
    name: "Hydra"
  },
  {
    ral: 14.9167,
    rau: 15.6667,
    decl: -29.5,
    name: "Libra"
  },
  {
    ral: 15.6667,
    rau: 16,
    decl: -29.5,
    name: "Scorpius"
  },
  {
    ral: 4.5833,
    rau: 4.7,
    decl: -30,
    name: "Eridanus"
  },
  {
    ral: 16.75,
    rau: 17.6,
    decl: -30,
    name: "Ophiuchus"
  },
  {
    ral: 17.6,
    rau: 17.8333,
    decl: -30,
    name: "Sagittarius"
  },
  {
    ral: 10.5833,
    rau: 10.8333,
    decl: -31.1667,
    name: "Hydra"
  },
  {
    ral: 6.1167,
    rau: 7.3667,
    decl: -33,
    name: "Canis Major"
  },
  {
    ral: 12.25,
    rau: 12.5833,
    decl: -33,
    name: "Hydra"
  },
  {
    ral: 10.8333,
    rau: 12.25,
    decl: -35,
    name: "Hydra"
  },
  {
    ral: 3.5,
    rau: 3.75,
    decl: -36,
    name: "Fornax"
  },
  {
    ral: 8.3667,
    rau: 9.3667,
    decl: -36.75,
    name: "Pyxis"
  },
  {
    ral: 4.2667,
    rau: 4.5833,
    decl: -37,
    name: "Eridanus"
  },
  {
    ral: 17.8333,
    rau: 19.1667,
    decl: -37,
    name: "Sagittarius"
  },
  {
    ral: 21.3333,
    rau: 23,
    decl: -37,
    name: "Piscis Austrinus"
  },
  {
    ral: 23,
    rau: 23.3333,
    decl: -37,
    name: "Sculptor"
  },
  {
    ral: 3,
    rau: 3.5,
    decl: -39.5833,
    name: "Fornax"
  },
  {
    ral: 9.3667,
    rau: 11,
    decl: -39.75,
    name: "Antlia"
  },
  {
    ral: 0,
    rau: 1.6667,
    decl: -40,
    name: "Sculptor"
  },
  {
    ral: 1.6667,
    rau: 3,
    decl: -40,
    name: "Fornax"
  },
  {
    ral: 3.8667,
    rau: 4.2667,
    decl: -40,
    name: "Eridanus"
  },
  {
    ral: 23.3333,
    rau: 24,
    decl: -40,
    name: "Sculptor"
  },
  {
    ral: 14.1667,
    rau: 14.9167,
    decl: -42,
    name: "Centaurus"
  },
  {
    ral: 15.6667,
    rau: 16,
    decl: -42,
    name: "Lupus"
  },
  {
    ral: 16,
    rau: 16.4208,
    decl: -42,
    name: "Scorpius"
  },
  {
    ral: 4.8333,
    rau: 5,
    decl: -43,
    name: "Caelum"
  },
  {
    ral: 5,
    rau: 6.5833,
    decl: -43,
    name: "Columba"
  },
  {
    ral: 8,
    rau: 8.3667,
    decl: -43,
    name: "Puppis"
  },
  {
    ral: 3.4167,
    rau: 3.8667,
    decl: -44,
    name: "Eridanus"
  },
  {
    ral: 16.4208,
    rau: 17.8333,
    decl: -45.5,
    name: "Scorpius"
  },
  {
    ral: 17.8333,
    rau: 19.1667,
    decl: -45.5,
    name: "Corona Australis"
  },
  {
    ral: 19.1667,
    rau: 20.3333,
    decl: -45.5,
    name: "Sagittarius"
  },
  {
    ral: 20.3333,
    rau: 21.3333,
    decl: -45.5,
    name: "Microscopium"
  },
  {
    ral: 3,
    rau: 3.4167,
    decl: -46,
    name: "Eridanus"
  },
  {
    ral: 4.5,
    rau: 4.8333,
    decl: -46.5,
    name: "Caelum"
  },
  {
    ral: 15.3333,
    rau: 15.6667,
    decl: -48,
    name: "Lupus"
  },
  {
    ral: 0,
    rau: 2.3333,
    decl: -48.1667,
    name: "Phoenix"
  },
  {
    ral: 2.6667,
    rau: 3,
    decl: -49,
    name: "Eridanus"
  },
  {
    ral: 4.0833,
    rau: 4.2667,
    decl: -49,
    name: "Horologium"
  },
  {
    ral: 4.2667,
    rau: 4.5,
    decl: -49,
    name: "Caelum"
  },
  {
    ral: 21.3333,
    rau: 22,
    decl: -50,
    name: "Grus"
  },
  {
    ral: 6,
    rau: 8,
    decl: -50.75,
    name: "Puppis"
  },
  {
    ral: 8,
    rau: 8.1667,
    decl: -50.75,
    name: "Vela"
  },
  {
    ral: 2.4167,
    rau: 2.6667,
    decl: -51,
    name: "Eridanus"
  },
  {
    ral: 3.8333,
    rau: 4.0833,
    decl: -51,
    name: "Horologium"
  },
  {
    ral: 0,
    rau: 1.8333,
    decl: -51.5,
    name: "Phoenix"
  },
  {
    ral: 6,
    rau: 6.1667,
    decl: -52.5,
    name: "Carina"
  },
  {
    ral: 8.1667,
    rau: 8.45,
    decl: -53,
    name: "Vela"
  },
  {
    ral: 3.5,
    rau: 3.8333,
    decl: -53.1667,
    name: "Horologium"
  },
  {
    ral: 3.8333,
    rau: 4,
    decl: -53.1667,
    name: "Dorado"
  },
  {
    ral: 0,
    rau: 1.5833,
    decl: -53.5,
    name: "Phoenix"
  },
  {
    ral: 2.1667,
    rau: 2.4167,
    decl: -54,
    name: "Eridanus"
  },
  {
    ral: 4.5,
    rau: 5,
    decl: -54,
    name: "Pictor"
  },
  {
    ral: 15.05,
    rau: 15.3333,
    decl: -54,
    name: "Lupus"
  },
  {
    ral: 8.45,
    rau: 8.8333,
    decl: -54.5,
    name: "Vela"
  },
  {
    ral: 6.1667,
    rau: 6.5,
    decl: -55,
    name: "Carina"
  },
  {
    ral: 11.8333,
    rau: 12.8333,
    decl: -55,
    name: "Centaurus"
  },
  {
    ral: 14.1667,
    rau: 15.05,
    decl: -55,
    name: "Lupus"
  },
  {
    ral: 15.05,
    rau: 15.3333,
    decl: -55,
    name: "Norma"
  },
  {
    ral: 4,
    rau: 4.3333,
    decl: -56.5,
    name: "Dorado"
  },
  {
    ral: 8.8333,
    rau: 11,
    decl: -56.5,
    name: "Vela"
  },
  {
    ral: 11,
    rau: 11.25,
    decl: -56.5,
    name: "Centaurus"
  },
  {
    ral: 17.5,
    rau: 18,
    decl: -57,
    name: "Ara"
  },
  {
    ral: 18,
    rau: 20.3333,
    decl: -57,
    name: "Telescopium"
  },
  {
    ral: 22,
    rau: 23.3333,
    decl: -57,
    name: "Grus"
  },
  {
    ral: 3.2,
    rau: 3.5,
    decl: -57.5,
    name: "Horologium"
  },
  {
    ral: 5,
    rau: 5.5,
    decl: -57.5,
    name: "Pictor"
  },
  {
    ral: 6.5,
    rau: 6.8333,
    decl: -58,
    name: "Carina"
  },
  {
    ral: 0,
    rau: 1.3333,
    decl: -58.5,
    name: "Phoenix"
  },
  {
    ral: 1.3333,
    rau: 2.1667,
    decl: -58.5,
    name: "Eridanus"
  },
  {
    ral: 23.3333,
    rau: 24,
    decl: -58.5,
    name: "Phoenix"
  },
  {
    ral: 4.3333,
    rau: 4.5833,
    decl: -59,
    name: "Dorado"
  },
  {
    ral: 15.3333,
    rau: 16.4208,
    decl: -60,
    name: "Norma"
  },
  {
    ral: 20.3333,
    rau: 21.3333,
    decl: -60,
    name: "Indus"
  },
  {
    ral: 5.5,
    rau: 6,
    decl: -61,
    name: "Pictor"
  },
  {
    ral: 15.1667,
    rau: 15.3333,
    decl: -61,
    name: "Circinus"
  },
  {
    ral: 16.4208,
    rau: 16.5833,
    decl: -61,
    name: "Ara"
  },
  {
    ral: 14.9167,
    rau: 15.1667,
    decl: -63.5833,
    name: "Circinus"
  },
  {
    ral: 16.5833,
    rau: 16.75,
    decl: -63.5833,
    name: "Ara"
  },
  {
    ral: 6,
    rau: 6.8333,
    decl: -64,
    name: "Pictor"
  },
  {
    ral: 6.8333,
    rau: 9.0333,
    decl: -64,
    name: "Carina"
  },
  {
    ral: 11.25,
    rau: 11.8333,
    decl: -64,
    name: "Centaurus"
  },
  {
    ral: 11.8333,
    rau: 12.8333,
    decl: -64,
    name: "Crux"
  },
  {
    ral: 12.8333,
    rau: 14.5333,
    decl: -64,
    name: "Centaurus"
  },
  {
    ral: 13.5,
    rau: 13.6667,
    decl: -65,
    name: "Circinus"
  },
  {
    ral: 16.75,
    rau: 16.8333,
    decl: -65,
    name: "Ara"
  },
  {
    ral: 2.1667,
    rau: 3.2,
    decl: -67.5,
    name: "Horologium"
  },
  {
    ral: 3.2,
    rau: 4.5833,
    decl: -67.5,
    name: "Reticulum"
  },
  {
    ral: 14.75,
    rau: 14.9167,
    decl: -67.5,
    name: "Circinus"
  },
  {
    ral: 16.8333,
    rau: 17.5,
    decl: -67.5,
    name: "Ara"
  },
  {
    ral: 17.5,
    rau: 18,
    decl: -67.5,
    name: "Pavo"
  },
  {
    ral: 22,
    rau: 23.3333,
    decl: -67.5,
    name: "Tucana"
  },
  {
    ral: 4.5833,
    rau: 6.5833,
    decl: -70,
    name: "Dorado"
  },
  {
    ral: 13.6667,
    rau: 14.75,
    decl: -70,
    name: "Circinus"
  },
  {
    ral: 14.75,
    rau: 17,
    decl: -70,
    name: "Triangulum Australe"
  },
  {
    ral: 0,
    rau: 1.3333,
    decl: -75,
    name: "Tucana"
  },
  {
    ral: 3.5,
    rau: 4.5833,
    decl: -75,
    name: "Hydrus"
  },
  {
    ral: 6.5833,
    rau: 9.0333,
    decl: -75,
    name: "Volans"
  },
  {
    ral: 9.0333,
    rau: 11.25,
    decl: -75,
    name: "Carina"
  },
  {
    ral: 11.25,
    rau: 13.6667,
    decl: -75,
    name: "Musca"
  },
  {
    ral: 18,
    rau: 21.3333,
    decl: -75,
    name: "Pavo"
  },
  {
    ral: 21.3333,
    rau: 23.3333,
    decl: -75,
    name: "Indus"
  },
  {
    ral: 23.3333,
    rau: 24,
    decl: -75,
    name: "Tucana"
  },
  {
    ral: 0.75,
    rau: 1.3333,
    decl: -76,
    name: "Tucana"
  },
  {
    ral: 0,
    rau: 3.5,
    decl: -82.5,
    name: "Hydrus"
  },
  {
    ral: 7.6667,
    rau: 13.6667,
    decl: -82.5,
    name: "Chamaeleon"
  },
  {
    ral: 13.6667,
    rau: 18,
    decl: -82.5,
    name: "Apus"
  },
  {
    ral: 3.5,
    rau: 7.6667,
    decl: -85,
    name: "Mensa"
  },
  {
    ral: 0,
    rau: 24,
    decl: -90,
    name: "Octans"
  }
];
function a(e, c, s, t, u) {
  const r = {
    type: "Feature",
    properties: {
      name: e,
      meaning: c,
      centrum: s
    },
    geometry: {
      type: "MultiLineString",
      coordinates: t
    }
  }, n = {
    type: "Feature",
    properties: {
      name: `${e} Boundary`
    },
    geometry: {
      type: "Polygon",
      coordinates: u.map((o) => i(o))
    }
  };
  return {
    type: "FeatureCollection",
    features: [r, n]
  };
}
const b = {
  ra: 5.957586,
  dec: 32.1326
}, h = [
  // Almach to Mirach:
  [
    [30.974804, 42.329725],
    [17.433013, 35.620557]
  ],
  // Mirach to δ Andromedae:
  [
    [17.433013, 35.620557],
    [9.831667, 30.861222]
  ],
  // Mirach to π Andromedae:
  [
    [17.433013, 35.620557],
    [9.220167, 33.719361]
  ],
  // δ Andromedae to Alpheratz:
  [
    [9.831667, 30.861222],
    [2.096916, 29.090431]
  ],
  // δ Andromedae to π Andromedae:
  [
    [9.831667, 30.861222],
    [9.220167, 33.719361]
  ],
  // Mirach to μ Andromedae:
  [
    [17.433013, 35.620557],
    [14.187917, 38.49925]
  ],
  // μ Andromedae to ν Andromedae:
  [
    [14.187917, 38.49925],
    [12.453458, 41.078944]
  ],
  // ν Andromedae to φ Andromedae:
  [
    [12.453458, 41.078944],
    [17.3755, 47.241833]
  ],
  // φ Andromedae to Nembus:
  [
    [17.3755, 47.241833],
    [24.498154, 48.628214]
  ],
  // δ Andromedae to ε Andromedae:
  [
    [9.831667, 30.861222],
    [9.639583, 29.312361]
  ],
  // ε Andromedae to ζ Andromedae:
  [
    [9.639583, 29.312361],
    [11.834958, 24.267389]
  ],
  // ζ Andromedae to η Andromedae:
  [
    [11.834958, 24.267389],
    [14.301792, 23.41775]
  ],
  // π Andromedae to ι Andromedae:
  [
    [9.22016, 33.719361],
    [354.534083, 43.268083]
  ],
  // ι Andromedae to κ Andromedae:
  [
    [354.534083, 43.268083],
    [355.101833, 44.333972]
  ],
  // κ Andromedae to λ Andromedae:
  [
    [355.101833, 44.333972],
    [354.390458, 46.459167]
  ],
  // ι Andromedae to ο Andromedae:
  [
    [354.534083, 43.268083],
    [345.480208, 42.325972]
  ]
], $ = [
  [
    [344.4653038, 35.1682358],
    [344.3428513, 53.1680298],
    [351.4528938, 53.1870041],
    [351.4656825, 50.6870193],
    [355.2705571, 50.6929131],
    [355.2760788, 48.6929169],
    [4.1463675, 48.6949348],
    [4.14327875, 46.6949348],
    [14.77607708, 46.6757545],
    [14.7888675, 48.6757393],
    [18.58840792, 48.663269],
    [18.60590375, 50.6632347],
    [22.40793625, 50.6478767],
    [26.96852375, 50.6257439],
    [26.93143958, 47.625843],
    [32.62149125, 47.5927505],
    [32.67380125, 51.0925827],
    [39.88547875, 51.0423737],
    [39.67934125, 37.2931557],
    [31.87109125, 37.347084],
    [31.85425042, 35.5971375],
    [22.910835, 35.6453362],
    [22.89742625, 33.6453705],
    [12.44306375, 33.6818962],
    [12.41349125, 24.4319324],
    [14.42406458, 24.4266243],
    [14.41481542, 21.6766376],
    [3.73992125, 21.6951923],
    [3.74064458, 22.6951923],
    [2.61001625, 22.6957588],
    [2.6128425, 28.6957588],
    [1.60621625, 28.6960354],
    [1.606977083, 32.0293655],
    [357.8287413, 32.0285034],
    [357.8280825, 32.7785072],
    [354.049158, 32.7746468],
    [354.0441796, 35.1913109],
    [344.4653038, 35.1682358]
  ]
], p = a("Andromeda", "The Chained Princess", b, h, $), g = {
  ra: 160.255718,
  dec: -34.193343
}, C = [
  // ι Antilae to α Antilae:
  [
    [164.179167, -37.137472],
    [156.788167, -31.067806]
  ],
  // α Antilae to ε Antilae:
  [
    [156.788167, -31.067806],
    [142.311417, -35.951361]
  ]
], T = [
  [
    [141.904335, -24.542519],
    [141.771599, -37.292015],
    [141.734061, -40.291874],
    [166.456505, -40.424622],
    [166.479363, -35.674656],
    [163.958515, -35.666496],
    [163.977885, -31.833201],
    [160.201379, -31.818586],
    [160.212894, -29.818613],
    [155.181327, -29.794784],
    [155.199338, -27.128162],
    [147.659283, -27.083504],
    [147.679681, -24.583571],
    [141.904335, -24.542519]
  ]
], f = a("Antila", "the pump", g, C, T), y = {
  ra: 234.026188,
  dec: -78.695667
}, v = [
  // α Apodis to δ¹ Apodis:
  [
    [221.965542, -79.044722],
    [245.086833, -78.695667]
  ],
  // δ¹ Apodis to β Apodis:
  [
    [245.086833, -78.695667],
    [250.772583, -77.516583]
  ],
  // β Apodis to γ Apodis:
  [
    [250.772583, -77.516583],
    [248.364417, -78.896972]
  ]
], A = [
  [
    [209.111109, -83.120071],
    [276.865998, -82.458275],
    [274.19506, -74.974518],
    [273.280077, -67.48008],
    [265.775729, -67.571106],
    [258.242482, -67.661087],
    [258.470679, -70.159744],
    [224.166441, -70.511543],
    [207.46087, -70.624443],
    [207.781434, -75.623596],
    [209.111109, -83.120071]
  ]
], P = a("Apus", "the bird of paradise", y, v, A), S = {
  ra: 331.445983,
  dec: -0.319849
}, M = [
  // Sadalmelik to Sadalsuud:
  [
    [331.445983, -0.319849],
    [322.889715, -5.571176]
  ],
  // Sadalsuud to μ Aquarii:
  [
    [322.889715, -5.571176],
    [313.163375, -8.98325]
  ],
  // μ Aquarii to Albali:
  [
    [313.163375, -8.98325],
    [311.918969, -9.495775]
  ],
  // Sadalmelik to Sadachbia:
  [
    [331.445983, -0.319849],
    [335.414064, -1.387334]
  ],
  // Sadalmelik to π Aquarii:
  [
    [331.445983, -0.319849],
    [336.319208, 1.377389]
  ],
  // Sadachbia to ζ¹ Aquarii:
  [
    [335.414064, -1.387334],
    [337.2075, -0.020056]
  ],
  // ζ¹ Aquarii to π Aquarii:
  [
    [337.2075, -0.020056],
    [336.319208, 1.377389]
  ],
  // Sadalmelik to Ancha:
  [
    [331.445983, -0.319849],
    [334.208485, -7.783291]
  ],
  // Ancha to λ Aquarii:
  [
    [334.208485, -7.783291],
    [343.153583, -7.579667]
  ],
  // λ Aquarii to τ¹ Aquarii:
  [
    [343.153583, -7.579667],
    [341.928125, -14.056417]
  ],
  // τ¹ Aquarii to Skat:
  [
    [341.928125, -14.056417],
    [343.662556, -15.820827]
  ],
  // Skat to ψ² Aquarii:
  [
    [343.662556, -15.820827],
    [349.475833, -9.1825]
  ],
  // ψ² Aquarii to φ Aquarii:
  [
    [349.475833, -9.1825],
    [348.580542, -6.048528]
  ],
  // φ Aquarii to λ Aquarii:
  [
    [348.580542, -6.048528],
    [343.153583, -7.579667]
  ],
  // ψ² Aquarii to b¹ Aquarii:
  [
    [349.475833, -9.1825],
    [350.742917, -20.100333]
  ],
  // ψ² Aquarii to c² Aquarii:
  [
    [349.475833, -9.1825],
    [347.3615, -21.172472]
  ]
], L = [
  [
    [309.598846, 0.436177],
    [309.579877, 2.436087],
    [314.081097, 2.477318],
    [321.583471, 2.53938],
    [323.58427, 2.554411],
    [323.578749, 3.304391],
    [326.580219, 3.325668],
    [326.587086, 2.325691],
    [331.588755, 2.357612],
    [331.587267, 2.607607],
    [342.842217, 2.662207],
    [342.849713, 0.662221],
    [342.864704, -3.337751],
    [359.102211, -3.304202],
    [359.103299, -6.304202],
    [359.110565, -24.804201],
    [346.680966, -24.825045],
    [329.770289, -24.904041],
    [329.656162, -8.4044],
    [321.668415, -8.460295],
    [321.716451, -14.460111],
    [309.743901, -14.563136],
    [309.684648, -8.563417],
    [309.598846, 0.436177]
  ]
], x = a("Aquarius", "the water carrier", S, M, L), H = {
  ra: 297.695827,
  dec: 8.868321
}, D = [
  // Alshain to Altair:
  [
    [298.828304, 6.406763],
    [297.695827, 8.868321]
  ],
  // Altair to Tarazed:
  [
    [297.695827, 8.868321],
    [296.564915, 10.613262]
  ],
  // Altair to δ Aquilae:
  [
    [297.695827, 8.868321],
    [291.373958, 3.114583]
  ],
  // δ Aquilae to Okab:
  [
    [291.373958, 3.114583],
    [286.352533, 13.863477]
  ],
  // Okab to ε Aquilae:
  [
    [286.352533, 13.863477],
    [284.905792, 15.068472]
  ],
  // δ Aquilae to η Aquilae:
  [
    [291.373958, 3.114583],
    [298.118167, 1.005667]
  ],
  // η Aquilae to θ Aquilae:
  [
    [298.118167, 1.005667],
    [302.826083, -0.821472]
  ],
  // θ Aquilae to ι Aquilae:
  [
    [302.826083, -0.821472],
    [294.180333, -1.286556]
  ],
  // ι Aquilae to λ Aquilae:
  [
    [294.180333, -1.286556],
    [286.562292, -4.882333]
  ],
  // δ Aquilae to λ Aquilae:
  [
    [291.373958, 3.114583],
    [286.562292, -4.882333]
  ],
  // λ Aquilae to Okab:
  [
    [286.562292, -4.882333],
    [286.352533, 13.863477]
  ]
], V = [
  [
    [280.350209, 0.115489],
    [280.326233, 2.115346],
    [284.576425, 2.165905],
    [284.525985, 6.415608],
    [281.458569, 6.379194],
    [281.388045, 12.128774],
    [284.456262, 12.165196],
    [284.373636, 18.664709],
    [286.375494, 18.688223],
    [286.405477, 16.355068],
    [298.921165, 16.495729],
    [298.926, 16.079084],
    [303.558998, 16.127516],
    [303.636675, 8.877912],
    [306.013956, 8.901824],
    [306.079101, 2.402147],
    [309.579877, 2.436087],
    [309.598846, 0.436177],
    [309.684648, -8.563417],
    [301.693696, -8.643075],
    [301.72637, -11.676234],
    [284.744054, -11.866436],
    [284.647293, -3.833677],
    [280.398188, -3.884223],
    [280.350209, 0.115489]
  ]
], O = a("Aquila", "the eagle", H, D, V), B = {
  ra: 262.9605,
  dec: -49.875972
}, E = [
  // α Arae to β Arae:
  [
    [262.9605, -49.875972],
    [261.325, -55.529833]
  ],
  // β Arae to γ Arae:
  [
    [261.325, -55.529833],
    [261.348583, -56.377694]
  ],
  // γ Arae to δ Arae:
  [
    [261.348583, -56.377694],
    [262.774917, -60.683611]
  ],
  // δ Arae to η Arae:
  [
    [262.774917, -60.683611],
    [252.446292, -59.041306]
  ],
  // η Arae to ζ Arae:
  [
    [252.446292, -59.041306],
    [254.655125, -55.990056]
  ],
  // ζ Arae to ε¹ Arae:
  [
    [254.655125, -55.990056],
    [254.896042, -53.1605]
  ],
  // ε¹ Arae to α Arae
  [
    [254.896042, -53.1605],
    [262.9605, -49.875972]
  ]
], q = [
  [
    [249.034681, -60.264458],
    [248.570624, -45.767052],
    [269.809284, -45.516346],
    [272.309017, -45.485973],
    [272.672253, -56.983772],
    [265.16819, -57.074776],
    [265.775729, -67.571106],
    [258.242482, -67.661087],
    [255.724983, -67.690582],
    [255.542393, -65.191643],
    [254.283515, -65.206253],
    [254.195137, -63.790093],
    [251.676321, -63.818996],
    [251.537847, -61.236458],
    [249.08163, -61.264195],
    [249.034681, -60.264458]
  ]
], U = a("Ara", "the Altar", B, E, q), w = {
  ra: 31.793357,
  dec: 23.462418
}, G = [
  // Bharani to Hamal:
  [
    [42.495972, 27.260507],
    [31.793357, 23.462418]
  ],
  // Hamal to Sheratan:
  [
    [31.793357, 23.462418],
    [28.660046, 20.808031]
  ],
  // Sheratan to Mesarthim:
  [
    [28.660046, 20.808031],
    [28.38256, 19.293852]
  ]
], j = [
  [
    [31.665248, 10.514395],
    [26.655734, 10.54324],
    [26.744675, 25.626335],
    [30.513711, 25.60507],
    [30.530616, 27.855019],
    [38.070149, 27.804764],
    [38.103194, 31.221315],
    [42.62838, 31.186502],
    [52.426668, 31.100361],
    [52.290623, 19.434334],
    [51.037235, 19.446114],
    [50.946411, 10.363207],
    [31.665248, 10.514395]
  ]
], F = a("Aries", "the ram", w, G, j), k = {
  ra: 79.172328,
  dec: 45.997991
}, N = [
  // Capella to Saclateni:
  [
    [79.172328, 45.997991],
    [75.619531, 41.075839]
  ],
  // Saclateni to Hassaleh:
  [
    [75.619531, 41.075839],
    [74.248421, 33.1661]
  ],
  // Hassaleh to Elnath:
  [
    [74.248421, 33.1661],
    [81.572971, 28.607452]
  ],
  // Elnath to Mahasim:
  [
    [81.572971, 28.607452],
    [89.930292, 37.212585]
  ],
  // Mahasim to Menkalinan:
  [
    [89.930292, 37.212585],
    [89.882179, 44.947433]
  ],
  // Menkalinan to Capella:
  [
    [89.882179, 44.947433],
    [79.172328, 45.997991]
  ]
], R = [
  [
    [69.486938, 30.921875],
    [69.573841, 36.254715],
    [72.457344, 36.221851],
    [72.840285, 52.719647],
    [77.484762, 52.665554],
    [77.606765, 56.164833],
    [94.131089, 55.965809],
    [94.057366, 53.966255],
    [100.046031, 53.893829],
    [99.91946, 49.894588],
    [104.406359, 49.841003],
    [104.265303, 44.341839],
    [112.734125, 44.243549],
    [112.560719, 35.24453],
    [100.090276, 35.390564],
    [99.965658, 27.891312],
    [90.221071, 28.009291],
    [90.228903, 28.509243],
    [73.212475, 28.71244],
    [73.235343, 30.212309],
    [69.476789, 30.25526]
  ]
], I = a("Auriga", "the charioteer", k, N, R), W = {
  ra: 213.9153,
  dec: 19.182409
}, z = [
  // Arcturus to Muphrid:
  [
    [213.9153, 19.182409],
    [208.671161, 18.397717]
  ],
  // Muphrid to τ Boötis:
  [
    [208.671161, 18.397717],
    [206.816833, 17.456778]
  ],
  // Arcturus to ζ Boötis:
  [
    [213.9153, 19.182409],
    [220.287083, 13.728333]
  ],
  // Arcturus to Izar:
  [
    [213.9153, 19.182409],
    [221.246763, 27.074207]
  ],
  // Izar to δ Boötis:
  [
    [221.246763, 27.074207],
    [228.875417, 33.315111]
  ],
  // δ Boötis to β Boötis:
  [
    [228.875417, 33.315111],
    [225.48651, 40.390567]
  ],
  // β Boötis to Seginus:
  [
    [225.48651, 40.390567],
    [218.019466, 38.308251]
  ],
  // Seginus to ρ Boötis:
  [
    [218.019466, 38.308251],
    [217.95775, 30.371139]
  ],
  // ρ Boötis to Arcturus:
  [
    [217.95775, 30.371139],
    [213.9153, 19.182409]
  ],
  // Seginus to Xuange:
  [
    [218.019466, 38.308251],
    [214.095912, 46.088306]
  ],
  // Xuange to κ¹ Boötis:
  [
    [214.095912, 46.088306],
    [213.365625, 51.787889]
  ],
  // κ¹ Boötis to θ Boötis:
  [
    [213.365625, 51.787889],
    [216.300083, 51.851722]
  ],
  // θ Boötis to Xuange:
  [
    [216.300083, 51.851722],
    [214.095912, 46.088306]
  ]
], _ = [
  [
    [227.781486, 7.525393],
    [204.063849, 7.360577],
    [204.02893, 14.360494],
    [203.953872, 27.860313],
    [210.788827, 27.897652],
    [210.770859, 30.147596],
    [211.888934, 30.154539],
    [211.698732, 47.903938],
    [211.584391, 54.903576],
    [217.251249, 54.942238],
    [229.591055, 55.044865],
    [229.657374, 52.545174],
    [237.084474, 52.617477],
    [237.124585, 51.11768],
    [237.365427, 39.618908],
    [232.643652, 39.572113],
    [232.746978, 32.572613],
    [229.015919, 32.537678],
    [229.099516, 25.538057],
    [227.605491, 25.524611],
    [227.781486, 7.525393]
  ]
], K = a("Boötes", "the herdsman", W, z, _), J = {
  ra: 70.140917,
  dec: -41.863583
}, Q = [
  // α Caeli to β Caeli:
  [
    [70.140917, -41.863583],
    [70.514375, -37.144778]
  ],
  // β Caeli to γ Caeli:
  [
    [70.514375, -37.144778],
    [76.101292, -35.482861]
  ],
  // α Caeli to δ Caeli:
  [
    [70.140917, -41.863583],
    [67.70875, -44.95375]
  ]
], Y = [
  [
    [65.076413, -39.700729],
    [64.882386, -48.699665],
    [68.362248, -48.738449],
    [68.424096, -46.238796],
    [73.402083, -46.295902],
    [73.48237, -42.796368],
    [75.974444, -42.82555],
    [76.254937, -27.077204],
    [73.759296, -27.047979],
    [71.763331, -27.024877],
    [71.722419, -29.774643],
    [69.976651, -29.75466],
    [69.862375, -36.754005],
    [65.12985, -36.701023],
    [65.076413, -39.700729]
  ]
], X = a("Caelum", "the chisel", J, Q, Y), Z = {
  ra: 73.512542,
  dec: 66.342667
}, a3 = [
  // α Camelopardalis to β Camelopardalis:
  [
    [73.512542, 66.342667],
    [75.854583, 60.442278]
  ],
  // α Camelopardalis to γ Camelopardalis:
  [
    [73.512542, 66.342667],
    [57.5895, 71.332361]
  ],
  // α Camelopardalis to Mago:
  [
    [73.512542, 66.342667],
    [77.403, 69.639404]
  ],
  // Mago to VZ Camelopardalis:
  [
    [77.403, 69.639404],
    [112.768667, 82.411556]
  ],
  // VZ Camelopardalis to Tonatiuh:
  [
    [112.768667, 82.411556],
    [181.312995, 76.905735]
  ]
], e3 = [
  [
    [94.131089, 55.965809],
    [77.606765, 56.164833],
    [77.484762, 52.665554],
    [72.840285, 52.719647],
    [52.313086, 52.936607],
    [52.3819, 55.436283],
    [49.854022, 55.459652],
    [49.913496, 57.459385],
    [48.90093, 57.468498],
    [49.395457, 68.466286],
    [54.237035, 68.42144],
    [55.308749, 77.416313],
    [56.72621, 77.402596],
    [57.53049, 80.398666],
    [80.488895, 80.14785],
    [84.536118, 85.123947],
    [127.953615, 84.610375],
    [130.40275, 86.097542],
    [213.022957, 85.930809],
    [216.782856, 79.444984],
    [203.80919, 79.36293],
    [204.157019, 76.363815],
    [195.820613, 76.328911],
    [174.434796, 76.308411],
    [174.531584, 79.308342],
    [162.818598, 79.340179],
    [163.105416, 81.339607],
    [142.191195, 81.467766],
    [140.615474, 72.974136],
    [123.086229, 73.138374],
    [122.129101, 59.643398],
    [107.753197, 59.803726],
    [107.851552, 61.803146],
    [94.407456, 61.964127],
    [94.131089, 55.965809]
  ]
], r3 = a("Camelopardalis", "the giraffe", Z, a3, e3), n3 = {
  ra: 131.666667,
  dec: 28.765167
}, c3 = [
  // ι Cancri to Asellus Borealis:
  [
    [131.666667, 28.765167],
    [130.821442, 21.468501]
  ],
  // Asellus Borealis to Asellus Australis:
  [
    [130.821442, 21.468501],
    [131.171248, 18.154309]
  ],
  // Asellus Australis to Acubens:
  [
    [131.171248, 18.154309],
    [134.621761, 11.8577]
  ],
  // Asellus Australis to Tarf:
  [
    [131.171248, 18.154309],
    [124.128838, 9.185544]
  ]
], u3 = [
  [
    [140.404259, 6.470069],
    [122.921391, 6.630238],
    [120.548343, 6.654985],
    [120.580672, 9.654814],
    [118.832489, 9.673426],
    [118.871605, 13.173217],
    [118.947545, 19.672808],
    [120.070124, 19.66082],
    [120.171646, 27.660282],
    [121.91597, 27.641914],
    [121.993231, 33.141514],
    [140.645985, 32.969116],
    [140.404259, 6.470069]
  ]
], s3 = a("Cancer", "the crab", n3, c3, u3), t3 = {
  ra: 194.006943,
  dec: 38.318376
}, o3 = [
  // Cor Caroli to β Canum Venaticorum:
  [
    [194.006943, 38.318376],
    [188.435603, 41.357479]
  ]
], l3 = [
  [
    [181.594506, 33.303963],
    [181.591416, 44.303963],
    [182.826434, 44.304336],
    [182.818523, 52.304336],
    [203.742399, 52.359806],
    [203.795114, 47.859928],
    [211.698732, 47.903938],
    [211.888934, 30.154539],
    [210.770859, 30.147596],
    [210.788827, 27.897652],
    [203.953872, 27.860313],
    [200.226575, 27.843775],
    [200.207748, 31.343737],
    [186.557694, 31.307434],
    [186.55426, 33.30743],
    [181.594506, 33.303963]
  ]
], i3 = a("Canes Venatici", "the hunting dog", t3, o3, l3), m3 = {
  ra: 101.287155,
  dec: -16.716116
}, d3 = [
  // Sirius to Mirzam:
  [
    [101.287155, -16.716116],
    [95.674939, -17.955919]
  ],
  // Sirius to ι Canis Majoris:
  [
    [101.287155, -16.716116],
    [104.034292, -17.05425]
  ],
  // ι Canis Majoris to Muliphein:
  [
    [104.034292, -17.05425],
    [105.939554, -15.633286]
  ],
  // ι Canis Majoris to θ Canis Majoris:
  [
    [104.034292, -17.05425],
    [103.547833, -12.038583]
  ],
  // Muliphein to θ Canis Majoris:
  [
    [105.939554, -15.633286],
    [103.547833, -12.038583]
  ],
  // Mirzam to ν² Canis Majoris:
  [
    [95.674939, -17.955919],
    [99.170833, -19.255722]
  ],
  // ν² Canis Majoris to ο¹ Canis Majoris:
  [
    [99.170833, -19.255722],
    [103.533125, -24.184222]
  ],
  // ο¹ Canis Majoris to Adhara:
  [
    [103.533125, -24.184222],
    [104.656453, -28.972086]
  ],
  // Adhara to Wezen:
  [
    [104.656453, -28.972086],
    [107.09785, -26.3932]
  ],
  // Wezen to Sirius:
  [
    [107.09785, -26.3932],
    [101.287155, -16.716116]
  ],
  // Wezen to Aludra:
  [
    [107.09785, -26.3932],
    [111.02376, -29.303106]
  ]
], b3 = [
  [
    [93.215625, -11.030153],
    [111.9734, -11.252145],
    [111.677199, -33.250469],
    [99.90386, -33.112816],
    [92.899068, -33.028233],
    [92.992566, -27.278799],
    [93.215625, -11.030153]
  ]
], h3 = a("Canis Major", "the greater dog", m3, d3, b3), $3 = {
  ra: 114.825493,
  dec: 5.224993
}, p3 = [
  // Procyon to Gomeisa:
  [
    [114.825493, 5.224993],
    [111.787674, 8.289316]
  ]
], g3 = [
  [
    [122.849007, -0.36939],
    [109.599666, -0.224329],
    [109.616919, 1.275572],
    [106.867396, 1.307442],
    [106.914275, 5.307168],
    [106.664322, 5.310089],
    [106.71788, 9.809775],
    [106.748227, 12.309598],
    [114.241004, 12.223872],
    [114.252728, 13.223806],
    [118.871605, 13.173217],
    [118.832489, 9.673426],
    [120.580672, 9.654814],
    [120.548343, 6.654985],
    [122.921391, 6.630238],
    [122.849007, -0.36939]
  ]
], C3 = a("Canis Minor", "the lesser dog", $3, p3, g3), T3 = {
  ra: 304.513566,
  dec: -12.544852
}, f3 = [
  // Algedi to Dabih:
  [
    [304.513566, -12.544852],
    [305.252803, -14.781405]
  ],
  // Dabih to ψ Capricorni:
  [
    [305.252803, -14.781405],
    [311.524042, -25.270528]
  ],
  // ψ Capricorni to ω Capricorni:
  [
    [311.524042, -25.270528],
    [312.955417, -26.919139]
  ],
  // ω Capricorni to ζ Capricorni:
  [
    [312.955417, -26.919139],
    [321.666792, -22.411389]
  ],
  // ζ Capricorni to ε Capricorni:
  [
    [321.666792, -22.411389],
    [324.270083, -19.466]
  ],
  // ε Capricorni to Deneb Algedi:
  [
    [324.270083, -19.466],
    [326.760184, -16.127287]
  ],
  // Deneb Algedi to Nashira:
  [
    [326.760184, -16.127287],
    [325.022735, -16.662308]
  ],
  // Nashira to ι Capricorni:
  [
    [325.022735, -16.662308],
    [320.561583, -16.834556]
  ],
  // ι Capricorni to θ Capricorni:
  [
    [320.561583, -16.834556],
    [316.486583, -17.232722]
  ],
  // θ Capricorni to Algedi:
  [
    [316.486583, -17.232722],
    [304.513566, -12.544852]
  ]
], y3 = [
  [
    [309.684648, -8.563417],
    [301.693696, -8.643075],
    [301.72637, -11.676234],
    [301.91597, -27.641914],
    [306.897955, -27.591339],
    [321.831636, -27.459667],
    [321.807775, -24.959761],
    [329.770289, -24.904041],
    [329.656162, -8.4044],
    [321.668415, -8.460295],
    [321.716451, -14.460111],
    [309.743901, -14.563136],
    [309.684648, -8.563417]
  ]
], v3 = a("Capricornus", "the horned goat", T3, f3, y3), A3 = {
  ra: 138.299906,
  dec: -69.717208
}, P3 = [
  // Miaplacidus to ω Carinae:
  [
    [138.299906, -69.717208],
    [153.4345, -70.037917]
  ],
  // ω Carinae to θ Carinae:
  [
    [153.4345, -70.037917],
    [160.739292, -64.394472]
  ],
  // θ Carinae to p Carinae:
  [
    [160.739292, -64.394472],
    [158.006167, -61.685361]
  ],
  // p Carinae to Aspidiske:
  [
    [158.006167, -61.685361],
    [139.272529, -59.275232]
  ],
  // Aspidiske to Avior:
  [
    [139.272529, -59.275232],
    [125.62848, -59.509484]
  ],
  // Avior to χ Carinae:
  [
    [125.62848, -59.509484],
    [119.19475, -52.982389]
  ],
  // χ Carinae to Canopus:
  [
    [119.19475, -52.982389],
    [95.987958, -52.695661]
  ],
  // θ Carinae to z Carinae:
  [
    [160.739292, -64.394472],
    [166.635292, -62.424139]
  ],
  // z Carinae to y Carinae:
  [
    [166.635292, -62.424139],
    [168.150083, -60.317639]
  ],
  // y Carinae to x Carinae:
  [
    [168.150083, -60.317639],
    [167.1475, -58.975056]
  ],
  // x Carinae to u Carinae:
  [
    [167.1475, -58.975056],
    [163.373208, -58.853278]
  ],
  // u Carinae to p Carinae:
  [
    [163.373208, -58.853278],
    [158.006167, -61.685361]
  ]
], S3 = [
  [
    [170.155921, -57.184345],
    [166.337256, -57.174442],
    [133.323655, -56.973972],
    [133.380174, -54.97422],
    [127.567119, -54.920471],
    [127.609291, -53.420677],
    [123.320116, -53.37822],
    [123.381129, -51.128529],
    [120.861698, -51.102585],
    [90.748902, -50.754547],
    [90.693705, -52.504211],
    [93.194354, -52.534576],
    [93.1074, -55.03405],
    [98.114275, -55.094559],
    [97.995078, -58.093842],
    [103.011117, -58.153702],
    [102.703314, -64.151878],
    [136.094727, -64.499039],
    [135.243687, -75.495468],
    [169.856973, -75.684013],
    [170.084811, -64.684265],
    [170.155921, -57.184345]
  ]
], M3 = a("Carina", "the keel of a ship", A3, P3, S3), L3 = {
  ra: 2.294522,
  dec: 59.149781
}, x3 = [
  // Caph β Cassiopeiae to Schedar:
  [
    [2.294522, 59.149781],
    [10.126838, 56.537331]
  ],
  // Schedar to γ Cassiopeiae:
  [
    [10.126838, 56.537331],
    [14.177083, 60.71675]
  ],
  // γ Cassiopeiae to Ruchbah:
  [
    [14.177083, 60.71675],
    [21.453964, 60.235284]
  ],
  // Ruchbah to Segin:
  [
    [21.453964, 60.235284],
    [28.598857, 63.670101]
  ]
], H3 = [
  [
    [344.342851, 53.16803],
    [344.304027, 56.917961],
    [344.269124, 59.751232],
    [348.859664, 59.764675],
    [348.81649, 63.68129],
    [355.217571, 63.692879],
    [355.19786, 66.692871],
    [6.763764, 66.692444],
    [6.922914, 77.692345],
    [55.308749, 77.416313],
    [54.237035, 68.42144],
    [49.395457, 68.466286],
    [48.90093, 57.468498],
    [38.762337, 57.5513],
    [38.802355, 59.051155],
    [30.795625, 59.10461],
    [30.773624, 58.104675],
    [27.595223, 58.122719],
    [27.533641, 54.622883],
    [22.456014, 54.64777],
    [22.407936, 50.647877],
    [18.605904, 50.663235],
    [18.588408, 48.663269],
    [14.788868, 48.675739],
    [14.776077, 46.675754],
    [4.143279, 46.694935],
    [4.146368, 48.694935],
    [355.276079, 48.692917],
    [355.270557, 50.692913],
    [351.465683, 50.687019],
    [351.452894, 53.187004],
    [344.342851, 53.16803]
  ]
], D3 = a("Cassiopeia", "Cassiopeia (a queen of Ethiopia, mythological character)", L3, x3, H3), V3 = {
  ra: 200.571081,
  dec: -47.307165
}, O3 = [
  // Rigil Kentaurus to Hadar:
  [
    [219.902066, -60.833975],
    [210.955856, -60.373035]
  ],
  // Hadar to ε Centauri:
  [
    [210.955856, -60.373035],
    [204.971958, -53.466361]
  ],
  // ε Centauri to γ Centauri:
  [
    [204.971958, -53.466361],
    [190.38, -48.959889]
  ],
  // γ Centauri to σ Centauri:
  [
    [190.38, -48.959889],
    [187.010042, -50.230611]
  ],
  // σ Centauri to δ Centauri:
  [
    [187.010042, -50.230611],
    [182.08975, -50.722417]
  ],
  // δ Centauri to π Centauri:
  [
    [182.08975, -50.722417],
    [170.251833, -54.491028]
  ],
  // σ Centauri to ρ Centauri:
  [
    [187.010042, -50.230611],
    [182.913125, -52.368417]
  ],
  // ρ Centauri to ο¹ Centauri:
  [
    [182.913125, -52.368417],
    [172.941958, -59.442056]
  ],
  // ο¹ Centauri to λ Centauri:
  [
    [172.941958, -59.442056],
    [173.945542, -63.019833]
  ],
  // ε Centauri to ζ Centauri:
  [
    [204.971958, -53.466361],
    [208.885125, -47.288278]
  ],
  // ζ Centauri to γ Centauri:
  [
    [208.885125, -47.288278],
    [190.38, -48.959889]
  ],
  // ζ Centauri to υ¹ Centauri:
  [
    [208.885125, -47.288278],
    [209.669875, -44.803528]
  ],
  // ζ Centauri to μ Centauri:
  [
    [208.885125, -47.288278],
    [207.404208, -42.473694]
  ],
  // μ Centauri to φ Centauri:
  [
    [207.404208, -42.473694],
    [209.567833, -42.100694]
  ],
  // υ¹ Centauri to φ Centauri:
  [
    [209.669875, -44.803528],
    [209.567833, -42.100694]
  ],
  // φ Centauri to η Centauri:
  [
    [209.567833, -42.100694],
    [218.876875, -42.15775]
  ],
  // η Centauri to κ Centauri:
  [
    [218.876875, -42.15775],
    [224.790417, -42.104139]
  ],
  // φ Centauri to χ Centauri:
  [
    [209.567833, -42.100694],
    [211.511625, -41.179583]
  ],
  // χ Centauri to ψ Centauri:
  [
    [211.511625, -41.179583],
    [215.1395, -37.885278]
  ],
  // ψ Centauri to Menkent:
  [
    [215.1395, -37.885278],
    [211.670617, -36.369958]
  ],
  // μ Centauri to ν Centauri:
  [
    [207.404208, -42.473694],
    [207.37625, -41.687667]
  ],
  // Menkent to ν Centauri:
  [
    [211.670617, -36.369958],
    [207.37625, -41.687667]
  ],
  // ν Centauri to d Centauri:
  [
    [207.37625, -41.687667],
    [202.761125, -39.407278]
  ],
  // d Centauri to ι Centauri:
  [
    [202.761125, -39.407278],
    [200.150292, -36.712083]
  ],
  // ι Centauri to l Centauri:
  [
    [200.150292, -36.712083],
    [189.969, -39.98725]
  ]
], B3 = [
  [
    [166.479363, -35.674656],
    [166.456505, -40.424622],
    [166.337256, -57.174442],
    [170.155921, -57.184345],
    [170.084811, -64.684265],
    [179.057364, -64.695785],
    [179.070768, -55.695793],
    [194.334511, -55.677105],
    [194.43838, -64.676964],
    [204.680286, -64.63794],
    [220.514975, -64.539024],
    [220.234465, -55.540089],
    [214.656816, -55.579952],
    [214.450265, -42.580647],
    [225.79628, -42.494175],
    [225.63077, -29.994879],
    [190.4174, -30.18639],
    [190.427199, -33.686378],
    [185.387435, -33.693893],
    [185.390296, -35.69389],
    [166.479363, -35.674656]
  ]
], E3 = a("Centaurus", "centaur (half human, half horse)", V3, O3, B3), q3 = {
  ra: 315.529167,
  dec: 65.285278
}, U3 = [
  // Errai to Alfirk
  [
    [354.836655, 77.632313],
    [322.164987, 70.560715]
  ],
  // Errai to ι Cephei
  [
    [354.836655, 77.632313],
    [342.420458, 66.200722]
  ],
  // Alfirk to ι Cephei
  [
    [322.164987, 70.560715],
    [342.420458, 66.200722]
  ],
  // ι Cephei to δ Cephei
  [
    [342.420458, 66.200722],
    [337.292708, 58.415194]
  ],
  // δ Cephei to ε Cephei
  [
    [337.292708, 58.415194],
    [333.757, 57.043472]
  ],
  // ε Cephei to μ Cephei
  [
    [333.757, 57.043472],
    [325.876875, 58.780056]
  ],
  // μ Cephei to Alderamin
  [
    [325.876875, 58.780056],
    [319.644885, 62.585574]
  ],
  // Alfirk to Alderamin
  [
    [322.164987, 70.560715],
    [319.644885, 62.585574]
  ],
  // Alderamin to η Cephei
  [
    [319.644885, 62.585574],
    [311.321958, 61.836806]
  ],
  // η Cephei to θ Cephei
  [
    [311.321958, 61.836806],
    [307.395125, 62.994139]
  ]
], w3 = [
  [
    [300.573263, 59.851078],
    [300.4852, 61.85062],
    [306.811868, 61.914379],
    [306.517381, 67.412956],
    [310.334015, 67.449028],
    [309.57304, 75.445526],
    [301.873398, 75.370873],
    [300.6738, 80.364777],
    [313.705874, 80.486786],
    [308.72097, 86.465622],
    [308.331355, 86.63063],
    [343.510666, 86.836891],
    [339.260988, 88.663887],
    [135.832471, 87.568916],
    [130.40275, 86.097542],
    [127.953615, 84.610375],
    [84.536118, 85.123947],
    [80.488895, 80.14785],
    [57.53049, 80.398666],
    [56.72621, 77.402596],
    [55.308749, 77.416313],
    [6.922914, 77.692345],
    [6.763764, 66.692444],
    [355.19786, 66.692871],
    [355.217571, 63.692879],
    [348.81649, 63.68129],
    [348.859664, 59.764675],
    [344.269124, 59.751232],
    [344.304027, 56.917961],
    [335.91093, 56.882576],
    [335.931301, 55.632626],
    [333.137626, 55.617844],
    [333.174676, 53.367943],
    [330.63921, 53.353271],
    [330.602189, 55.436489],
    [309.831361, 55.275326],
    [309.623795, 61.357697],
    [308.660804, 61.348644],
    [308.716593, 59.93224],
    [300.573263, 59.851078]
  ]
], G3 = a("Cepheus", "Cepheus (a king of Aethiopia, mythological character)", q3, U3, w3), j3 = {
  ra: 29.091667,
  dec: -8.328889
}, F3 = [
  // Menkar to λ Ceti
  [
    [45.569885, 4.089737],
    [44.92875, 8.907389]
  ],
  // λ Ceti to μ Ceti
  [
    [44.92875, 8.907389],
    [41.234875, 10.114222]
  ],
  // μ Ceti to ν Ceti
  [
    [41.234875, 10.114222],
    [38.968708, 5.593306]
  ],
  // ν Ceti to Kaffaljidhma
  [
    [38.968708, 5.593306],
    [40.825163, 3.235816]
  ],
  // Kaffaljidhma to Menkar
  [
    [40.825163, 3.235816],
    [45.569885, 4.089737]
  ],
  // Kaffaljidhma to δ Ceti
  [
    [40.825163, 3.235816],
    [39.870625, 0.328528]
  ],
  // δ Ceti to Mira
  [
    [39.870625, 0.328528],
    [34.836617, -2.97764]
  ],
  // Mira to Baten Kaitos
  [
    [34.836617, -2.97764],
    [27.865137, -10.335044]
  ],
  // Baten Kaitos to τ Ceti
  [
    [27.865137, -10.335044],
    [26.021375, -15.939556]
  ],
  // τ Ceti to Diphda
  [
    [26.021375, -15.939556],
    [10.897379, -17.986606]
  ],
  // Diphda to ι Ceti
  [
    [10.897379, -17.986606],
    [4.857, -8.823833]
  ],
  // ι Ceti to η Ceti
  [
    [4.857, -8.823833],
    [17.146917, -10.181917]
  ],
  // η Ceti to θ Ceti
  [
    [17.146917, -10.181917],
    [21.006042, -8.18275]
  ],
  // θ Ceti to Baten Kaitos
  [
    [21.006042, -8.18275],
    [27.865137, -10.335044]
  ]
], k3 = [
  [
    [6.601329, 0.69254],
    [6.603788, 2.692538],
    [31.615266, 2.597881],
    [31.665248, 10.514395],
    [50.946411, 10.363207],
    [50.852984, 0.446972],
    [50.836683, -1.302952],
    [41.339221, -1.221027],
    [41.148759, -23.853603],
    [26.465999, -23.756258],
    [26.458889, -24.872909],
    [359.110565, -24.804201],
    [359.103299, -6.304202],
    [6.592702, -6.307455],
    [6.601329, 0.69254]
  ]
], N3 = a("Cetus", "the whale", j3, F3, k3), R3 = {
  ra: 149.074166,
  dec: -79.217778
}, I3 = [
  // θ Chamaeleontis to α Chamaeleontis
  [
    [125.162042, -77.484583],
    [124.630292, -76.919972]
  ],
  // α Chamaeleontis to γ Chamaeleontis
  [
    [124.630292, -76.919972],
    [158.867583, -78.607806]
  ],
  // γ Chamaeleontis to δ² Chamaeleontis
  [
    [158.867583, -78.607806],
    [161.446417, -80.540194]
  ],
  // δ² Chamaeleontis to β Chamaeleontis
  [
    [161.446417, -80.540194],
    [184.58725, -79.312278]
  ],
  // γ Chamaeleontis to ε Chamaeleontis
  [
    [158.867583, -78.607806],
    [179.907042, -78.221806]
  ],
  // ε Chamaeleontis to β Chamaeleontis
  [
    [179.907042, -78.221806],
    [184.58725, -79.312278]
  ]
], W3 = [
  [
    [111.652115, -82.775886],
    [209.111109, -83.120071],
    [207.781434, -75.623596],
    [169.856973, -75.684013],
    [135.243687, -75.495468],
    [114.214704, -75.289917],
    [111.652115, -82.775886]
  ]
], z3 = a("Chamaeleon", "the lizard", R3, I3, W3), _3 = {
  ra: 224.705197,
  dec: -62.875106
}, K3 = [
  // α Circini to β Circini
  [
    [220.627875, -64.974583],
    [229.379, -58.800889]
  ],
  // α Circini to γ Circini
  [
    [220.627875, -64.974583],
    [230.844417, -59.320694]
  ]
], J3 = [
  [
    [204.680286, -64.63794],
    [204.70748, -65.637878],
    [207.268023, -65.624954],
    [207.46087, -70.624443],
    [224.166441, -70.511543],
    [224.003634, -68.012207],
    [226.557126, -67.990929],
    [226.353535, -64.075127],
    [230.166579, -64.041565],
    [230.05457, -61.458748],
    [232.589765, -61.435307],
    [232.549868, -60.435493],
    [232.381911, -55.436283],
    [228.083511, -55.475494],
    [220.234465, -55.540089],
    [220.514975, -64.539024],
    [204.680286, -64.63794]
  ]
], Q3 = a("Circinus", "the compass", _3, K3, J3), Y3 = {
  ra: 87.521128,
  dec: -35.469837
}, X3 = [
  // ε Columbae to Phact:
  [
    [82.803083, -35.470444],
    [84.912254, -34.07411]
  ],
  // Phact to Wazn:
  [
    [84.912254, -34.07411],
    [87.739968, -35.76831]
  ],
  // Wazn to γ Columbae:
  [
    [87.739968, -35.76831],
    [89.384208, -35.283306]
  ],
  // γ Columbae to δ Columbae:
  [
    [89.384208, -35.283306],
    [95.528542, -33.436278]
  ],
  // Wazn to η Columbae:
  [
    [87.739968, -35.76831],
    [89.786625, -42.815111]
  ]
], Z3 = [
  [
    [75.974444, -42.82555],
    [76.254937, -27.077204],
    [92.992566, -27.278799],
    [92.899068, -33.028233],
    [99.90386, -33.112816],
    [99.708916, -43.111649],
    [90.951777, -43.005779],
    [75.974444, -42.82555]
  ]
], a2 = a("Columba", "the dove", Y3, X3, Z3), e2 = {
  ra: 193.5,
  dec: 23
}, r2 = [
  // Diadem to β Comae Berenices:
  [
    [197.497029, 17.529447],
    [197.9705, 27.876028]
  ],
  // β Comae Berenices to γ Comae Berenices:
  [
    [197.9705, 27.876028],
    [186.734708, 28.268611]
  ]
], n2 = [
  [
    [179.604535, 13.304049],
    [179.608941, 28.304047],
    [181.595664, 28.303963],
    [181.594506, 33.303963],
    [186.55426, 33.30743],
    [186.557694, 31.307434],
    [200.207748, 31.343737],
    [200.226575, 27.843775],
    [203.953872, 27.860313],
    [204.02893, 14.360494],
    [194.059066, 14.322509],
    [194.062027, 13.322513],
    [179.604535, 13.304049]
  ]
], c2 = a("Coma Berenices", "Berenice's hair", e2, r2, n2), u2 = {
  ra: 278,
  dec: -39
}, s2 = [
  // γ Coronae Australis to Meridiana:
  [
    [286.604333, -37.06275],
    [287.368087, -37.904473]
  ],
  // Meridiana to β Coronae Australis:
  [
    [287.368087, -37.904473],
    [287.507292, -39.340694]
  ],
  // β Coronae Australis to δ Coronae Australis:
  [
    [287.507292, -39.340694],
    [287.087208, -40.496639]
  ],
  // δ Coronae Australis to θ Coronae Australis:
  [
    [287.087208, -40.496639],
    [278.375667, -42.312472]
  ]
], t2 = [
  [
    [269.625464, -37.01746],
    [289.59632, -36.778565],
    [289.76964, -45.277565],
    [272.309017, -45.485973],
    [269.809284, -45.516346],
    [269.625464, -37.01746]
  ]
], o2 = a("Corona Australis", "southern crown", u2, s2, t2), l2 = {
  ra: 234,
  dec: 28
}, i2 = [
  // θ Coronae Borealis to Nusakan:
  [
    [233.2325, 31.359167],
    [231.957211, 29.105699]
  ],
  // Nusakan to Alphecca:
  [
    [231.957211, 29.105699],
    [233.67195, 26.714693]
  ],
  // Alphecca to γ Coronae Borealis:
  [
    [233.67195, 26.714693],
    [235.686, 26.295528]
  ],
  // γ Coronae Borealis to δ Coronae Borealis:
  [
    [235.686, 26.295528],
    [237.39875, 26.068556]
  ],
  // δ Coronae Borealis to ε Coronae Borealis:
  [
    [237.39875, 26.068556],
    [239.397083, 26.878028]
  ],
  // ε Coronae Borealis to ι Coronae Borealis:
  [
    [239.397083, 26.878028],
    [240.360792, 29.851083]
  ]
], m2 = [
  [
    [229.099516, 25.538057],
    [229.015919, 32.537678],
    [232.746978, 32.572613],
    [232.643652, 39.572113],
    [237.365427, 39.618908],
    [246.071949, 39.71172],
    [246.279803, 26.712872],
    [243.786706, 26.685524],
    [243.800182, 25.685595],
    [241.805735, 25.664141],
    [229.099516, 25.538057]
  ]
], d2 = a("Corona Borealis", "northern crown", l2, i2, m2), b2 = {
  ra: 185,
  dec: -21
}, h2 = [
  // Alchiba to ε Corvi:
  [
    [182.103402, -24.728875],
    [182.531375, -22.619806]
  ],
  // ε Corvi to Gienah:
  [
    [182.531375, -22.619806],
    [183.951543, -17.541929]
  ],
  // Gienah to Algorab:
  [
    [183.951543, -17.541929],
    [187.466063, -16.515431]
  ],
  // Algorab to β Corvi:
  [
    [187.466063, -16.515431],
    [188.59681, -23.396759]
  ],
  // β Corvi to ε Corvi:
  [
    [188.59681, -23.396759],
    [182.531375, -22.619806]
  ]
], $2 = [
  [
    [194.133052, -11.677388],
    [179.09676, -11.695797],
    [179.09131, -25.195795],
    [190.404525, -25.186401],
    [190.398503, -22.686409],
    [194.16687, -22.677342],
    [194.133052, -11.677388]
  ]
], p2 = a("Corvus", "the crow", b2, h2, $2), g2 = {
  ra: 171.152542,
  dec: -14.779056
}, C2 = [
  // Alkes to β Crateris:
  [
    [164.943604, -18.298783],
    [167.914542, -22.825611]
  ],
  // Alkes to δ Crateris:
  [
    [164.943604, -18.298783],
    [169.8355, -14.779056]
  ],
  // δ Crateris to ε Crateris:
  [
    [169.8355, -14.779056],
    [171.152542, -10.859389]
  ],
  // ε Crateris to θ Crateris:
  [
    [171.152542, -10.859389],
    [174.170625, -9.80225]
  ],
  // β Crateris to γ Crateris:
  [
    [167.914542, -22.825611],
    [171.22075, -17.684028]
  ],
  // γ Crateris to ζ Crateris:
  [
    [171.22075, -17.684028],
    [176.190667, -18.350611]
  ],
  // ζ Crateris to η Crateris:
  [
    [176.190667, -18.350611],
    [179.004083, -17.150806]
  ],
  // δ Crateris to γ Crateris:
  [
    [169.8355, -14.779056],
    [171.22075, -17.684028]
  ]
], T2 = [
  [
    [162.827139, -6.662179],
    [162.807914, -11.662143],
    [162.77554, -19.662083],
    [164.030586, -19.666622],
    [164.008083, -25.166582],
    [179.09131, -25.195795],
    [179.09676, -11.695797],
    [179.098606, -6.695797],
    [174.342299, -6.691692],
    [162.827139, -6.662179]
  ]
], f2 = a("Crater", "a type of cup used to water down wine", g2, C2, T2), y2 = {
  ra: 186.649563,
  dec: -59.688764
}, v2 = [
  // Acrux to Gacrux:
  [
    [186.649563, -63.099093],
    [187.791498, -57.113213]
  ],
  // Mimosa to Imai:
  [
    [191.930263, -59.688764],
    [183.78632, -58.748927]
  ]
], A2 = [
  [
    [179.070768, -55.695793],
    [179.057364, -64.695785],
    [194.43838, -64.676964],
    [194.334511, -55.677105],
    [179.070768, -55.695793]
  ]
], P2 = a("Crux", "the cross", y2, v2, A2), S2 = {
  ra: 305.557091,
  dec: 45.280339
}, M2 = [
  // Deneb to Sadr:
  [
    [310.35798, 45.280339],
    [305.557091, 40.256679]
  ],
  // Sadr to η Cygni:
  [
    [305.557091, 40.256679],
    [299.076667, 35.0835]
  ],
  // η Cygni to Albireo:
  [
    [299.076667, 35.0835],
    [292.680351, 27.959692]
  ],
  // Sadr to Fawaris:
  [
    [305.557091, 40.256679],
    [296.243658, 45.13081]
  ],
  // Fawaris to ι Cygni:
  [
    [296.243658, 45.13081],
    [292.426417, 51.729472]
  ],
  // ι Cygni to κ Cygni:
  [
    [292.426417, 51.729472],
    [289.275458, 53.368167]
  ],
  // Sadr to Aljanah:
  [
    [305.557091, 40.256679],
    [311.552843, 33.970257]
  ],
  // Aljanah to ζ Cygni:
  [
    [311.552843, 33.970257],
    [318.234083, 30.227083]
  ],
  // ζ Cygni to μ¹ Cygni:
  [
    [318.234083, 30.227083],
    [326.035, 28.743222]
  ],
  // Deneb to ν Cygni:
  [
    [310.35798, 45.280339],
    [314.293375, 41.167194]
  ],
  // ν Cygni to ζ Cygni:
  [
    [314.293375, 41.167194],
    [318.234083, 30.227083]
  ],
  // Deneb to ο² Cygni:
  [
    [310.35798, 45.280339],
    [303.868, 47.714194]
  ],
  // ο² Cygni to ι Cygni:
  [
    [303.868, 47.714194],
    [292.426417, 51.729472]
  ]
], L2 = [
  [
    [290.132646, 27.732408],
    [290.095253, 30.232197],
    [291.598778, 30.249315],
    [291.492605, 36.748714],
    [292.119655, 36.755802],
    [291.983527, 43.755035],
    [288.470307, 43.714939],
    [288.37552, 47.714394],
    [287.120648, 47.699867],
    [286.87646, 55.698448],
    [291.904593, 55.756004],
    [291.80955, 58.25547],
    [297.100554, 58.313873],
    [297.039241, 59.813541],
    [300.573263, 59.851078],
    [308.716593, 59.93224],
    [308.660804, 61.348644],
    [309.623795, 61.357697],
    [309.831361, 55.275326],
    [330.602189, 55.436489],
    [330.63921, 53.353271],
    [330.762663, 44.603645],
    [329.878606, 44.598251],
    [329.88164, 44.348263],
    [329.37664, 44.34512],
    [329.461012, 36.595383],
    [327.319965, 36.581547],
    [327.395181, 28.581795],
    [322.620164, 28.548054],
    [315.083915, 28.487188],
    [315.072584, 29.487139],
    [296.250944, 29.301058],
    [296.272201, 27.801174],
    [290.132646, 27.732408]
  ]
], x2 = a("Cygnus", "the swan", S2, M2, L2), H2 = {
  ra: 309.90953,
  dec: 15.912073
}, D2 = [
  // Sualocin to γ¹ Delphini:
  [
    [309.90953, 15.912073],
    [311.661958, 16.124611]
  ],
  // γ¹ Delphini to δ Delphini:
  [
    [311.661958, 16.124611],
    [310.864792, 15.074694]
  ],
  // δ Delphini to Rotanev:
  [
    [310.864792, 15.074694],
    [309.387235, 14.595115]
  ],
  // Rotanev to Sualocin:
  [
    [309.387235, 14.595115],
    [309.90953, 15.912073]
  ],
  // Rotanev to Aldulfin:
  [
    [309.387235, 14.595115],
    [308.303216, 11.303261]
  ]
], V2 = [
  [
    [309.579877, 2.436087],
    [306.079101, 2.402147],
    [306.013956, 8.901824],
    [303.636675, 8.877912],
    [303.558998, 16.127516],
    [305.186949, 16.143963],
    [305.134049, 20.8937],
    [309.896937, 20.939947],
    [309.907665, 19.939997],
    [317.178783, 20.004641],
    [317.248364, 12.338261],
    [314.618596, 12.315764],
    [314.671096, 6.482664],
    [314.045505, 6.477161],
    [314.081097, 2.477318],
    [309.579877, 2.436087]
  ]
], O2 = a("Delphinus", "the dolphin", H2, D2, V2), B2 = {
  ra: 76.377875,
  dec: -57.473
}, E2 = [
  // γ Doradus to α Doradus:
  [
    [64.006208, -51.487083],
    [68.498833, -55.045]
  ],
  // α Doradus to β Doradus:
  [
    [68.498833, -55.045],
    [83.406333, -62.489861]
  ],
  // α Doradus to ζ Doradus:
  [
    [68.498833, -55.045],
    [76.377875, -57.473]
  ],
  // ζ Doradus to β Doradus:
  [
    [76.377875, -57.473],
    [83.406333, -62.489861]
  ],
  // β Doradus to δ Doradus:
  [
    [83.406333, -62.489861],
    [86.193417, -65.735528]
  ],
  // δ Doradus to ?:
  [
    [86.193417, -65.735528],
    [88.524583, -63.091028]
  ],
  // ? to β Doradus:
  [
    [88.524583, -63.091028],
    [83.406333, -62.489861]
  ]
], q2 = [
  [
    [58.318788, -52.796844],
    [60.797896, -52.822811],
    [60.692919, -56.155586],
    [65.650462, -56.209385],
    [65.55459, -58.708855],
    [69.274535, -58.750664],
    [68.794019, -67.247925],
    [68.581524, -69.746719],
    [98.454423, -70.104134],
    [98.937249, -64.107025],
    [90.173643, -64.001053],
    [90.345061, -61.002098],
    [82.857614, -60.911289],
    [83.018804, -57.412262],
    [75.547743, -57.32304],
    [75.677017, -53.823803],
    [68.217745, -53.737637],
    [68.362248, -48.738449],
    [64.882386, -48.699665],
    [62.149908, -48.669972],
    [62.09864, -50.669701],
    [58.377166, -50.630478],
    [58.318788, -52.796844]
  ]
], U2 = a("Dorado", "the dolphinfish", B2, E2, q2), w2 = {
  ra: 257.19665,
  dec: 65.714684
}, G2 = [
  // Giausar to κ Draconis:
  [
    [172.85092, 69.331075],
    [188.371, 69.788222]
  ],
  // κ Draconis to Thuban:
  [
    [188.371, 69.788222],
    [211.097291, 64.375851]
  ],
  // Thuban to Edasich:
  [
    [211.097291, 64.375851],
    [231.232396, 58.966063]
  ],
  // Edasich to θ Draconis:
  [
    [231.232396, 58.966063],
    [240.47375, 58.564444]
  ],
  // θ Draconis to Athebyne:
  [
    [240.47375, 58.564444],
    [245.997858, 61.514214]
  ],
  // Athebyne to Aldhibah:
  [
    [245.997858, 61.514214],
    [257.19665, 65.714684]
  ],
  // Aldhibah to ω Draconis:
  [
    [257.19665, 65.714684],
    [264.237875, 68.757194]
  ],
  // ω Draconis to φ Draconis:
  [
    [264.237875, 68.757194],
    [275.189333, 71.337722]
  ],
  // φ Draconis to χ Draconis:
  [
    [275.189333, 71.337722],
    [275.25975, 72.733694]
  ],
  // φ Draconis to Altais:
  [
    [275.189333, 71.337722],
    [288.13875, 67.661541]
  ],
  // Altais to ε Draconis:
  [
    [288.13875, 67.661541],
    [297.042542, 70.267833]
  ],
  // Altais to Grumium:
  [
    [288.13875, 67.661541],
    [268.382207, 56.872646]
  ],
  // Grumium to ν¹ Draconis:
  [
    [268.382207, 56.872646],
    [263.043417, 55.184111]
  ],
  // ν¹ Draconis to Rastaban:
  [
    [263.043417, 55.184111],
    [262.608174, 52.301389]
  ],
  // Rastaban to Eltanin:
  [
    [262.608174, 52.301389],
    [269.151541, 51.488896]
  ],
  // Eltanin to Grumium:
  [
    [269.151541, 51.488896],
    [268.382207, 56.872646]
  ]
], j2 = [
  [
    [140.615474, 72.974136],
    [142.191195, 81.467766],
    [163.105416, 81.339607],
    [162.818598, 79.340179],
    [174.531584, 79.308342],
    [174.434796, 76.308411],
    [195.820613, 76.328911],
    [196.097474, 69.329361],
    [210.650811, 69.399117],
    [210.820555, 65.399651],
    [235.329565, 65.602348],
    [235.05063, 69.600944],
    [247.841062, 69.738304],
    [247.220707, 74.734787],
    [261.536637, 74.903313],
    [260.217905, 79.895348],
    [267.65602, 79.985748],
    [261.72223, 85.94957],
    [308.72097, 86.465622],
    [313.705874, 80.486786],
    [300.6738, 80.364777],
    [301.873398, 75.370873],
    [309.57304, 75.445526],
    [310.334015, 67.449028],
    [306.517381, 67.412956],
    [306.811868, 61.914379],
    [300.4852, 61.85062],
    [300.573263, 59.851078],
    [297.039241, 59.813541],
    [297.100554, 58.313873],
    [291.80955, 58.25547],
    [291.904593, 55.756004],
    [286.87646, 55.698448],
    [287.120648, 47.699867],
    [274.342375, 47.547604],
    [274.257689, 50.547089],
    [255.786352, 50.324444],
    [255.756826, 51.324268],
    [237.124585, 51.11768],
    [237.084474, 52.617477],
    [229.657374, 52.545174],
    [229.591055, 55.044865],
    [217.251249, 54.942238],
    [217.045254, 62.441482],
    [203.573641, 62.359398],
    [203.550539, 63.359344],
    [181.58156, 63.303963],
    [181.579255, 65.803963],
    [171.849346, 65.812607],
    [171.96137, 72.8125],
    [140.615474, 72.974136]
  ]
], F2 = a("Draco", "the dragon", w2, G2, j2), k2 = {
  ra: 318.2873,
  dec: 7.5628
}, N2 = [
  // Kitalpha to δ Equulei:
  [
    [318.955949, 5.247865],
    [318.619958, 10.007722]
  ],
  // δ Equulei to γ Equulei:
  [
    [318.619958, 10.007722],
    [317.585292, 10.131944]
  ]
], R2 = [
  [
    [314.081097, 2.477318],
    [314.045505, 6.477161],
    [314.671096, 6.482664],
    [314.618596, 12.315764],
    [317.248364, 12.338261],
    [318.250265, 12.346555],
    [318.244515, 13.013201],
    [321.501102, 13.039063],
    [321.583471, 2.53938],
    [314.081097, 2.477318]
  ]
], I2 = a("Equuleus", "the foal (little horse)", k2, N2, R2), W2 = {
  ra: 56.541,
  dec: -25.686
}, z2 = [
  // Cursa to μ Eridani:
  [
    [76.96244, -5.086446],
    [71.375583, -3.254611]
  ],
  // μ Eridani to ν Eridani:
  [
    [71.375583, -3.254611],
    [69.07975, -3.352444]
  ],
  // ν Eridani to Beid:
  [
    [69.07975, -3.352444],
    [62.966415, -6.83758]
  ],
  // Beid to Zaurak:
  [
    [62.966415, -6.83758],
    [59.50736, -13.508516]
  ],
  // Zaurak to π Eridani:
  [
    [59.50736, -13.508516],
    [56.535417, -12.101722]
  ],
  // π Eridani to δ Eridani:
  [
    [56.535417, -12.101722],
    [55.812333, -9.765194]
  ],
  // δ Eridani to Ran:
  [
    [55.812333, -9.765194],
    [53.232687, -9.458259]
  ],
  // Ran to Azha:
  [
    [53.232687, -9.458259],
    [44.106873, -8.898145]
  ],
  // Azha to τ¹ Eridani:
  [
    [44.106873, -8.898145],
    [41.274917, -18.572639]
  ],
  // τ¹ Eridani to Angetenar:
  [
    [41.274917, -18.572639],
    [42.759674, -21.004018]
  ],
  // Angetenar to τ³ Eridani:
  [
    [42.759674, -21.004018],
    [45.598292, -23.624333]
  ],
  // τ³ Eridani to τ⁴ Eridani:
  [
    [45.598292, -23.624333],
    [49.879042, -21.757944]
  ],
  // τ⁴ Eridani to τ⁵ Eridani:
  [
    [49.879042, -21.757944],
    [53.446875, -21.632806]
  ],
  // τ⁵ Eridani to τ⁶ Eridani:
  [
    [53.446875, -21.632806],
    [56.712458, -23.248444]
  ],
  // τ⁶ Eridani to τ⁷ Eridani:
  [
    [56.712458, -23.248444],
    [56.915083, -23.874806]
  ],
  // τ⁷ Eridani to τ⁸ Eridani:
  [
    [56.915083, -23.874806],
    [58.427833, -24.612222]
  ],
  // τ⁸ Eridani to τ⁹ Eridani:
  [
    [58.427833, -24.612222],
    [59.981167, -24.01625]
  ],
  // τ⁹ Eridani to υ¹ Eridani:
  [
    [59.981167, -24.01625],
    [68.377625, -29.765833]
  ],
  // υ¹ Eridani to Theemin:
  [
    [68.377625, -29.765833],
    [68.88766, -30.562341]
  ],
  // Theemin to Beemim:
  [
    [68.88766, -30.562341],
    [66.009239, -34.016848]
  ],
  // Beemin to υ⁴ Eridani:
  [
    [66.009239, -34.016848],
    [64.473417, -33.798333]
  ],
  // υ⁴ Eridani to g Eridani:
  [
    [64.473417, -33.798333],
    [57.363667, -36.200111]
  ],
  // g Eridani to f Eridani:
  [
    [57.363667, -36.200111],
    [57.149583, -37.620556]
  ],
  // f Eridani to e Eridani:
  [
    [57.149583, -37.620556],
    [49.97175, -43.071556]
  ],
  // e Eridani to Acamar:
  [
    [49.97175, -43.071556],
    [44.565311, -40.304672]
  ],
  // Acamar to ι Eridanus:
  [
    [44.565311, -40.304672],
    [40.166375, -39.855306]
  ],
  // ι Eridani to κ Eridani:
  [
    [40.166375, -39.855306],
    [36.74625, -47.703833]
  ],
  // κ Eridani to χ Eridani:
  [
    [36.74625, -47.703833],
    [28.986792, -51.609583]
  ],
  // χ Eridani to Achernar:
  [
    [28.986792, -51.609583],
    [24.428523, -57.236753]
  ]
], _2 = [
  [
    [55.352905, 0.403726],
    [70.85236, 0.237501],
    [71.602314, 0.228916],
    [71.556359, -3.77082],
    [77.804395, -3.843729],
    [77.720031, -10.843229],
    [75.221751, -10.813805],
    [75.178715, -14.313553],
    [73.929798, -14.298972],
    [73.759296, -27.047979],
    [71.763331, -27.024877],
    [71.722419, -29.774643],
    [69.976651, -29.75466],
    [69.862375, -36.754005],
    [65.12985, -36.701023],
    [65.076413, -39.700729],
    [59.105885, -39.636826],
    [59.031365, -43.63644],
    [52.326773, -43.569405],
    [52.289003, -45.569221],
    [46.090771, -45.512478],
    [46.034514, -48.512234],
    [41.085309, -48.471004],
    [41.047694, -50.47086],
    [37.34121, -50.44257],
    [37.283346, -53.442356],
    [33.584144, -53.41647],
    [33.489425, -57.916157],
    [21.206229, -57.848415],
    [21.273263, -52.84856],
    [24.967355, -52.865856],
    [24.993847, -50.865921],
    [28.693257, -50.885922],
    [28.738323, -47.552723],
    [36.152948, -47.600494],
    [36.264014, -39.434216],
    [46.18726, -39.512898],
    [46.193322, -39.096256],
    [53.644284, -39.165096],
    [53.699605, -35.582035],
    [57.430512, -35.619244],
    [57.588901, -24.003378],
    [41.148759, -23.853603],
    [41.339221, -1.221027],
    [50.836683, -1.302952],
    [55.335582, -1.346189],
    [55.352905, 0.403726]
  ]
], K2 = a("Eridanus", "the river Eridanus (mythology)", W2, z2, _2), J2 = {
  ra: 41.0821,
  dec: -30.1265
}, Q2 = [
  // Dalim to β Fornacis:
  [
    [48.018864, -28.98762],
    [42.272333, -32.406278]
  ],
  // β Fornacis to ν Fornacis:
  [
    [42.272333, -32.406278],
    [31.122625, -29.296833]
  ]
], Y2 = [
  [
    [26.465999, -23.756258],
    [41.148759, -23.853603],
    [57.588901, -24.003378],
    [57.430512, -35.619244],
    [53.699605, -35.582035],
    [53.644284, -39.165096],
    [46.193322, -39.096256],
    [46.18726, -39.512898],
    [36.264014, -39.434216],
    [26.350728, -39.372623],
    [26.458889, -24.872909],
    [26.465999, -23.756258]
  ]
], X2 = a("Fornax", "the furnace", J2, Q2, Y2), Z2 = {
  ra: 113.2154,
  dec: 22.2387
}, a1 = [
  // Pollux to υ Geminorum:
  [
    [116.328958, 28.026199],
    [113.980708, 26.896]
  ],
  // υ Geminorum to κ Geminorum:
  [
    [113.980708, 26.896],
    [116.111958, 24.398139]
  ],
  // υ Geminorum to Wasat:
  [
    [113.980708, 26.896],
    [110.030749, 21.982316]
  ],
  // Wasat to λ Geminorum:
  [
    [110.030749, 21.982316],
    [109.523375, 16.540472]
  ],
  // λ Geminorum to Alzirr:
  [
    [109.523375, 16.540472],
    [101.322351, 12.895592]
  ],
  // Wasat to Mekbuda:
  [
    [110.030749, 21.982316],
    [106.027215, 20.570295]
  ],
  // Mekbuda to Alhena:
  [
    [106.027215, 20.570295],
    [99.42796, 16.39928]
  ],
  // υ Geminorum to τ Geminorum:
  [
    [113.980708, 26.896],
    [107.784958, 30.245278]
  ],
  // τ Geminorum to Castor:
  [
    [107.784958, 30.245278],
    [113.649428, 31.888276]
  ],
  // τ Geminorum to θ Geminorum:
  [
    [107.784958, 30.245278],
    [103.19725, 33.961361]
  ],
  // τ Geminorum to Mebsuta:
  [
    [107.784958, 30.245278],
    [100.983026, 25.131127]
  ],
  // Mebsuta to ν Geminorum:
  [
    [100.983026, 25.131127],
    [97.240792, 20.212167]
  ],
  // Mebsuta to μ Geminorum:
  [
    [100.983026, 25.131127],
    [95.740112, 22.513583]
  ],
  // μ Geminorum to Propus:
  [
    [95.740112, 22.513583],
    [93.719405, 22.506794]
  ]
], e1 = [
  [
    [96.372764, 11.933297],
    [96.443917, 17.432865],
    [95.069575, 17.449507],
    [95.124127, 21.449177],
    [90.125155, 21.509872],
    [90.144037, 22.843086],
    [90.221071, 28.009291],
    [99.965658, 27.891312],
    [100.090276, 35.390564],
    [112.560719, 35.24453],
    [118.289709, 35.181053],
    [118.25808, 33.181229],
    [121.993231, 33.141514],
    [121.91597, 27.641914],
    [120.171646, 27.660282],
    [120.070124, 19.66082],
    [118.947545, 19.672808],
    [118.871605, 13.173217],
    [114.252728, 13.223806],
    [114.241004, 12.223872],
    [106.748227, 12.309598],
    [106.71788, 9.809775],
    [105.71846, 9.821487],
    [105.742815, 11.821345],
    [96.372764, 11.933297]
  ]
], r1 = a("Gemini", "the twins", Z2, a1, e1), n1 = {
  ra: 336.3474,
  dec: -46.0269
}, c1 = [
  // Alnair to Tiaki:
  [
    [332.05827, -46.960974],
    [340.666876, -46.884576]
  ],
  // Alnair to δ¹ Gruis:
  [
    [332.05827, -46.960974],
    [337.317292, -43.495556]
  ],
  // Tiaki to δ¹ Gruis:
  [
    [340.666876, -46.884576],
    [337.317292, -43.495556]
  ],
  // δ¹ Gruis to μ¹ Gruis:
  [
    [337.317292, -43.495556],
    [333.903667, -41.34675]
  ],
  // μ¹ Gruis to λ Gruis:
  [
    [333.903667, -41.34675],
    [331.52875, -39.543056]
  ],
  // λ Gruis to Aldhanab:
  [
    [331.52875, -39.543056],
    [328.482192, -37.364855]
  ],
  // Tiaki to ε Gruis:
  [
    [340.666876, -46.884576],
    [342.138333, -51.316694]
  ],
  // ε Gruis to ζ Gruis:
  [
    [342.138333, -51.316694],
    [345.220292, -52.754111]
  ]
], u1 = [
  [
    [321.928053, -36.459297],
    [322.042321, -44.958858],
    [322.117366, -49.458572],
    [331.998825, -49.391174],
    [332.113695, -56.390835],
    [351.768522, -56.312687],
    [351.692705, -39.312759],
    [351.683378, -36.312767],
    [346.727514, -36.324974],
    [321.928053, -36.459297]
  ]
], s1 = a("Grus", "the crane", n1, c1, u1), t1 = {
  ra: 255.3956,
  dec: 30.3076
}, o1 = [
  // Rasalgethi to Kornephoros:
  [
    [258.66191, 14.390333],
    [247.554998, 21.489611]
  ],
  // Kornephoros to γ Herculis:
  [
    [247.554998, 21.489611],
    [245.480167, 19.153028]
  ],
  // Kornephoros to ζ Herculis:
  [
    [247.554998, 21.489611],
    [250.322833, 31.601889]
  ],
  // γ Herculis to Cujam:
  [
    [245.480167, 19.153028],
    [246.353979, 14.033274]
  ],
  // Cujam to h Herculis:
  [
    [246.353979, 14.033274],
    [248.151667, 11.488222]
  ],
  // Rasalgethi to Sarin:
  [
    [258.66191, 14.390333],
    [258.757963, 24.839204]
  ],
  // Sarin to ε Herculis:
  [
    [258.757963, 24.839204],
    [255.072542, 30.926333]
  ],
  // ε Herculis to ζ Herculis:
  [
    [255.072542, 30.926333],
    [250.322833, 31.601889]
  ],
  // ζ Herculis to η Herculis:
  [
    [250.322833, 31.601889],
    [250.723917, 38.922472]
  ],
  // η Herculis to σ Herculis:
  [
    [250.723917, 38.922472],
    [248.525792, 42.436889]
  ],
  // σ Herculis to τ Herculis:
  [
    [248.525792, 42.436889],
    [244.935208, 46.313278]
  ],
  // τ Herculis to φ Herculis:
  [
    [244.935208, 46.313278],
    [242.1925, 44.934806]
  ],
  // φ Herculis to χ Herculis:
  [
    [242.1925, 44.934806],
    [238.167458, 42.45]
  ],
  // Sarin to Maasym:
  [
    [258.757963, 24.839204],
    [262.684626, 26.110645]
  ],
  // Maasym to μ Herculis:
  [
    [262.684626, 26.110645],
    [266.6155, 27.7225]
  ],
  // μ Herculis to ξ Herculis:
  [
    [266.6155, 27.7225],
    [269.440958, 29.247917]
  ],
  // ξ Herculis to ο Herculis:
  [
    [269.440958, 29.247917],
    [271.885625, 28.762472]
  ],
  // ε Herculis to π Herculis:
  [
    [255.072542, 30.926333],
    [258.761875, 36.809167]
  ],
  // π Herculis to η Herculis:
  [
    [258.761875, 36.809167],
    [250.723917, 38.922472]
  ],
  // π Herculis to ρ Herculis:
  [
    [258.761875, 36.809167],
    [260.919583, 37.146667]
  ],
  // ρ Herculis to θ Herculis:
  [
    [260.919583, 37.146667],
    [269.06325, 37.250528]
  ],
  // θ Herculis to ι Herculis:
  [
    [269.06325, 37.250528],
    [264.866208, 46.006333]
  ]
], l1 = [
  [
    [245.558595, 3.703381],
    [242.809668, 3.673514],
    [242.67663, 15.6728],
    [240.181074, 15.646335],
    [240.111007, 21.645968],
    [241.856575, 21.664411],
    [241.805735, 25.664141],
    [243.800182, 25.685595],
    [243.786706, 26.685524],
    [246.279803, 26.712872],
    [246.071949, 39.71172],
    [237.365427, 39.618908],
    [237.124585, 51.11768],
    [255.756826, 51.324268],
    [255.786352, 50.324444],
    [274.257689, 50.547089],
    [274.342375, 47.547604],
    [273.466874, 47.536987],
    [273.824386, 30.039156],
    [276.700773, 30.073977],
    [276.762886, 26.07435],
    [284.269867, 26.164097],
    [284.277162, 25.664141],
    [284.339133, 21.247835],
    [284.373636, 18.664709],
    [284.456262, 12.165196],
    [281.388045, 12.128774],
    [275.203085, 12.054331],
    [275.173274, 14.387479],
    [260.176878, 14.206035],
    [260.195847, 12.706148],
    [252.701482, 12.617938],
    [252.80591, 3.785211],
    [245.558595, 3.703381]
  ]
], i1 = a("Hercules", "Hercules (mythological character)", t1, o1, l1), m1 = {
  ra: 52.5684,
  dec: -51.3962
}, d1 = [
  // α Horologii to ι Horologii:
  [
    [63.500333, -42.293861],
    [40.638167, -50.800833]
  ],
  // ι Horologii to η Horologii:
  [
    [40.638167, -50.800833],
    [39.351083, -52.543083]
  ],
  // η Horologii to ζ Horologii:
  [
    [39.351083, -52.543083],
    [40.164917, -54.549917]
  ],
  // ζ Horologii to μ Horologii:
  [
    [40.164917, -54.549917],
    [45.90375, -59.737611]
  ],
  // μ Horologii to β Horologii:
  [
    [45.90375, -59.737611],
    [44.699042, -64.071306]
  ]
], b1 = [
  [
    [65.076413, -39.700729],
    [64.882386, -48.699665],
    [62.149908, -48.669972],
    [62.09864, -50.669701],
    [58.377166, -50.630478],
    [58.318788, -52.796844],
    [53.365002, -52.747078],
    [53.236816, -57.079784],
    [48.791131, -57.037785],
    [48.36269, -67.03582],
    [33.20236, -66.915192],
    [33.489425, -57.916157],
    [33.584144, -53.41647],
    [37.283346, -53.442356],
    [37.34121, -50.44257],
    [41.047694, -50.47086],
    [41.085309, -48.471004],
    [46.034514, -48.512234],
    [46.090771, -45.512478],
    [52.289003, -45.569221],
    [52.326773, -43.569405],
    [59.031365, -43.63644],
    [59.105885, -39.636826],
    [65.076413, -39.700729]
  ]
], h1 = a("Horologium", "a clock with a pendulum", m1, d1, b1), $1 = {
  ra: 177.755,
  dec: -8.6586
}, p1 = [
  // E Hydrae to π Hydrae:
  [
    [222.572792, -27.960222],
    [211.592792, -26.682028]
  ],
  // π Hydrae to γ Hydrae:
  [
    [211.592792, -26.682028],
    [199.730208, -23.171417]
  ],
  // γ Hydrae to β Hydrae:
  [
    [199.730208, -23.171417],
    [178.227333, -33.908139]
  ],
  // β Hydrae to ξ Hydrae:
  [
    [178.227333, -33.908139],
    [173.251083, -31.857528]
  ],
  // ξ Hydrae to β Crateris:
  [
    [173.251083, -31.857528],
    [167.914542, -22.825611]
  ],
  // β Crateris to Alkes:
  [
    [167.914542, -22.825611],
    [164.943604, -18.298783]
  ],
  // Alkes to ν Hydrae:
  [
    [164.943604, -18.298783],
    [162.405958, -16.194139]
  ],
  // ν Hydrae to μ Hydrae:
  [
    [162.405958, -16.194139],
    [156.522958, -16.836083]
  ],
  // μ Hydrae to λ Hydrae:
  [
    [156.522958, -16.836083],
    [152.6475, -12.353833]
  ],
  // λ Hydrae to υ¹ Hydrae:
  [
    [152.6475, -12.353833],
    [147.869558, -14.846603]
  ],
  // υ¹ Hydrae to Alphard:
  [
    [147.869558, -14.846603],
    [141.896847, -8.658602]
  ],
  // Alphard to Ukdah:
  [
    [141.896847, -8.658602],
    [144.964008, -1.14281]
  ],
  // Ukdah to θ Hydrae:
  [
    [144.964008, -1.14281],
    [138.590792, 2.315028]
  ],
  // θ Hydrae to ζ Hydrae:
  [
    [138.590792, 2.315028],
    [133.848667, 5.945528]
  ],
  // ζ Hydrae to Ashlesha:
  [
    [133.848667, 5.945528],
    [131.693794, 6.418809]
  ],
  // Ashlesha to δ Hydrae:
  [
    [131.693794, 6.418809],
    [129.414208, 5.703806]
  ],
  // δ Hydrae to Minchir:
  [
    [129.414208, 5.703806],
    [129.689323, 3.341436]
  ],
  // Minchir to η Hydrae:
  [
    [129.689323, 3.341436],
    [130.806208, 3.398667]
  ],
  // η Hydrae to ρ Hydrae:
  [
    [130.806208, 3.398667],
    [132.10825, 5.837889]
  ]
], g1 = [
  [
    [122.849007, -0.36939],
    [122.921391, 6.630238],
    [140.404259, 6.470069],
    [145.398417, 6.432767],
    [145.348906, -0.567059],
    [145.270272, -11.566781],
    [162.807914, -11.662143],
    [162.77554, -19.662083],
    [164.030586, -19.666622],
    [164.008083, -25.166582],
    [179.09131, -25.195795],
    [190.404525, -25.186401],
    [190.398503, -22.686409],
    [194.16687, -22.677342],
    [215.513091, -22.572775],
    [215.53369, -25.072702],
    [225.576554, -24.99511],
    [225.63077, -29.994879],
    [190.4174, -30.18639],
    [190.427199, -33.686378],
    [185.387435, -33.693893],
    [185.390296, -35.69389],
    [166.479363, -35.674656],
    [163.958515, -35.666496],
    [163.977885, -31.833201],
    [160.201379, -31.818586],
    [160.212894, -29.818613],
    [155.181327, -29.794784],
    [155.199338, -27.128162],
    [147.659283, -27.083504],
    [147.679681, -24.583571],
    [141.904335, -24.542519],
    [137.636776, -24.508631],
    [137.68497, -19.508831],
    [130.163512, -19.442373],
    [130.18434, -17.442471],
    [126.927095, -17.411257],
    [126.98978, -11.411565],
    [122.734179, -11.368799],
    [122.849007, -0.36939]
  ]
], C1 = a("Hydra", "Hydra (mythological creature)", $1, p1, g1), T1 = {
  ra: 31.6378,
  dec: -69.6104
}, f1 = [
  // α Hydri to β Hydri:
  [
    [29.691125, -61.569917],
    [6.413333, -77.255028]
  ],
  // β Hydri to γ Hydri:
  [
    [6.413333, -77.255028],
    [56.809292, -74.23925]
  ],
  // γ Hydri to α Hydri:
  [
    [56.809292, -74.23925],
    [29.691125, -61.569917]
  ]
], y1 = [
  [
    [68.794019, -67.247925],
    [68.581524, -69.746719],
    [67.957485, -74.743164],
    [52.075782, -74.574127],
    [50.091655, -82.064453],
    [1.533391, -81.803955],
    [1.566297, -74.303963],
    [12.332438, -74.318573],
    [12.295415, -75.318527],
    [20.65405, -75.347221],
    [21.206229, -57.848415],
    [33.489425, -57.916157],
    [33.20236, -66.915192],
    [48.36269, -67.03582],
    [68.794019, -67.247925]
  ]
], v1 = a("Hydrus", "lesser water snake", T1, f1, y1), A1 = {
  ra: 318.7596,
  dec: -56.6596
}, P1 = [
  // α Indi to β Indi:
  [
    [309.391625, -47.291667],
    [313.702417, -58.454083]
  ],
  // β Indi to δ Indi:
  [
    [313.702417, -58.454083],
    [329.479292, -54.992556]
  ],
  // δ Indi to θ Indi:
  [
    [329.479292, -54.992556],
    [319.966167, -53.449278]
  ],
  // θ Indi to α Indi:
  [
    [319.966167, -53.449278],
    [309.391625, -47.291667]
  ]
], S1 = [
  [
    [323.184757, -74.454468],
    [351.997833, -74.312462],
    [351.861391, -66.812599],
    [332.398568, -66.889992],
    [332.113695, -56.390835],
    [331.998825, -49.391174],
    [322.117366, -49.458572],
    [322.042321, -44.958858],
    [307.169295, -45.09],
    [307.458801, -56.588577],
    [307.564801, -59.588055],
    [322.348651, -59.457684],
    [323.184757, -74.454468]
  ]
], M1 = a("Indus", "Indian (of unspecified type)", A1, P1, S1), L1 = {
  ra: 336.125,
  dec: 46.75
}, x1 = [
  // β Lacertae to α Lacertae:
  [
    [335.890167, 52.2295],
    [337.822417, 50.282444]
  ],
  // α Lacertae to 4 Lacertae:
  [
    [337.822417, 50.282444],
    [336.129167, 49.476389]
  ],
  // 4 Lacertae to 5 Lacertae:
  [
    [336.129167, 49.476389],
    [337.382583, 47.706889]
  ],
  // 5 Lacertae to 2 Lacertae:
  [
    [337.382583, 47.706889],
    [335.256375, 46.536556]
  ],
  // 2 Lacertae to 6 Lacertae:
  [
    [335.256375, 46.536556],
    [337.621917, 43.123389]
  ],
  // 6 Lacertae to 1 Lacertae:
  [
    [337.621917, 43.123389],
    [333.992375, 37.748722]
  ]
], H1 = [
  [
    [329.461012, 36.595383],
    [329.37664, 44.34512],
    [329.88164, 44.348263],
    [329.878606, 44.598251],
    [330.762663, 44.603645],
    [330.63921, 53.353271],
    [333.174676, 53.367943],
    [333.137626, 55.617844],
    [335.931301, 55.632626],
    [335.91093, 56.882576],
    [344.304027, 56.917961],
    [344.342851, 53.16803],
    [344.465304, 35.168236],
    [343.709193, 35.165615],
    [343.706532, 35.665611],
    [331.359558, 35.606934],
    [331.35046, 36.606907],
    [329.461012, 36.595383]
  ]
], D1 = a("Lacerta", "the lizard", L1, x1, H1), V1 = {
  ra: 162.5,
  dec: 15
}, O1 = [
  // Regulus to η Leonis:
  [
    [152.092962, 11.967209],
    [151.833125, 16.762667]
  ],
  // η Leonis to Algieba:
  [
    [151.833125, 16.762667],
    [154.993144, 19.841489]
  ],
  // Algieba to Adhafera:
  [
    [154.993144, 19.841489],
    [154.172567, 23.417312]
  ],
  // Adhafera to Rasalas:
  [
    [154.172567, 23.417312],
    [148.190903, 26.006953]
  ],
  // Rasalas to ε Leonis:
  [
    [148.190903, 26.006953],
    [146.462917, 23.774278]
  ],
  // η Leonis to Chertan:
  [
    [151.833125, 16.762667],
    [168.560019, 15.429571]
  ],
  // Chertan to Zosma:
  [
    [168.560019, 15.429571],
    [168.527089, 20.523718]
  ],
  // Zosma to Algieba:
  [
    [168.527089, 20.523718],
    [154.993144, 19.841489]
  ],
  // Zosma to Denebola:
  [
    [168.527089, 20.523718],
    [177.26491, 14.572058]
  ],
  // Chertan to Denebola:
  [
    [168.560019, 15.429571],
    [177.26491, 14.572058]
  ],
  // Chertan to ι Leonis:
  [
    [168.560019, 15.429571],
    [170.980708, 10.529694]
  ],
  // ι Leonis to σ Leonis:
  [
    [170.980708, 10.529694],
    [170.284375, 6.029361]
  ]
], B1 = [
  [
    [162.849712, -0.662221],
    [162.87602, 6.33773],
    [145.398417, 6.432767],
    [140.404259, 6.470069],
    [140.645985, 32.969116],
    [150.084385, 32.902279],
    [150.042344, 27.902409],
    [159.238401, 27.852917],
    [159.210878, 22.852978],
    [162.942539, 22.837605],
    [162.951494, 24.837589],
    [166.680937, 24.825045],
    [166.693998, 28.325026],
    [179.608941, 28.304047],
    [179.604535, 13.304049],
    [179.603735, 10.304049],
    [174.365688, 10.308291],
    [174.350525, -0.691698],
    [174.342299, -6.691692],
    [162.827139, -6.662179],
    [162.849712, -0.662221]
  ]
], E1 = a("Leo", "the lion", V1, O1, B1), q1 = {
  ra: 156.971208,
  dec: 36.707472
}, U1 = [
  // β Leonis Minoris to Praecipua:
  [
    [156.971208, 36.707472],
    [163.327937, 34.214872]
  ],
  // Praecipua to HD 90277:
  [
    [163.327937, 34.214872],
    [156.478625, 33.79625]
  ],
  // HD 90277 to HD 87696:
  [
    [156.478625, 33.79625],
    [151.857208, 35.244694]
  ],
  // β Leonis Minoris to HD 87696:
  [
    [156.971208, 36.707472],
    [151.857208, 35.244694]
  ],
  // HD 87696 to HD 82635:
  [
    [151.857208, 35.244694],
    [143.55575, 36.397611]
  ]
], w1 = [
  [
    [140.645985, 32.969116],
    [140.721631, 39.218819],
    [145.681973, 39.181767],
    [145.709238, 41.431675],
    [154.378224, 41.377361],
    [154.359412, 39.377411],
    [163.523169, 39.335613],
    [163.489409, 33.335678],
    [166.714225, 33.324993],
    [166.693998, 28.325026],
    [166.680937, 24.825045],
    [162.951494, 24.837589],
    [162.942539, 22.837605],
    [159.210878, 22.852978],
    [159.238401, 27.852917],
    [150.042344, 27.902409],
    [150.084385, 32.902279],
    [140.645985, 32.969116]
  ]
], G1 = a("Leo Minor", "lesser lion", q1, U1, w1);
// @license        Copyright © 2021-2024 observerly
const j1 = {
  ra: 83.182567,
  dec: -17.822289
}, F1 = [
  // θ Leporis to η Leporis:
  [
    [91.538875, -14.935278],
    [89.101333, -14.168028]
  ],
  // η Leporis to ζ Leporis:
  [
    [89.101333, -14.168028],
    [86.738958, -14.821944]
  ],
  // ζ Leporis to Arneb:
  [
    [86.738958, -14.821944],
    [83.182567, -17.822289]
  ],
  // Arneb to Nihal:
  [
    [83.182567, -17.822289],
    [82.061346, -20.759441]
  ],
  // Nihal to γ Leporis:
  [
    [82.061346, -20.759441],
    [86.110417, -22.421667]
  ],
  // γ Leporis to δ Leporis:
  [
    [86.110417, -22.421667],
    [87.829792, -20.8775]
  ],
  // δ Leporis to θ Leporis:
  [
    [87.829792, -20.8775],
    [91.538875, -14.935278]
  ],
  // Arneb to μ Leporis:
  [
    [83.182567, -17.822289],
    [78.232792, -16.205417]
  ],
  // μ Leporis to ε Leporis:
  [
    [78.232792, -16.205417],
    [76.365208, -22.370861]
  ],
  // ε Leporis to Nihal:
  [
    [76.365208, -22.370861],
    [82.061346, -20.759441]
  ],
  // μ Leporis to λ Leporis:
  [
    [78.232792, -16.205417],
    [79.893875, -13.176778]
  ],
  // μ Leporis to κ Leporis:
  [
    [78.232792, -16.205417],
    [78.307875, -12.941278]
  ]
], k1 = [
  [
    [73.759296, -27.047979],
    [76.254937, -27.077204],
    [92.992566, -27.278799],
    [93.215625, -11.030153],
    [88.96579, -10.978532],
    [77.720031, -10.843229],
    [75.221751, -10.813805],
    [75.178715, -14.313553],
    [73.929798, -14.298972],
    [73.759296, -27.047979]
  ]
], N1 = a("Lepus", "hare", j1, F1, k1), R1 = {
  ra: 227.853012,
  dec: -0.474289
}, I1 = [
  // Brachium to Zubenelgenubi:
  [
    [226.017567, -25.281961],
    [222.719638, -16.041777]
  ],
  // Zubenelgenubi to Zubeneschamali:
  [
    [222.719638, -16.041777],
    [229.251724, -9.382914]
  ],
  // Zubeneschamali to Zubenelhakrabi:
  [
    [229.251724, -9.382914],
    [233.881578, -14.789536]
  ],
  // Zubenelhakrabi to ν Lupi:
  [
    [233.881578, -14.789536],
    [234.664083, -29.777694]
  ],
  // Zubenelgenubi to Zubenelhakrabi:
  [
    [222.719638, -16.041777],
    [233.881578, -14.789536]
  ]
], W1 = [
  [
    [227.853012, -0.474289],
    [221.603093, -0.526939],
    [221.667108, -8.526685],
    [215.408506, -8.573134],
    [215.513091, -22.572775],
    [215.53369, -25.072702],
    [225.576554, -24.99511],
    [225.63077, -29.994879],
    [236.92998, -29.889616],
    [236.813064, -20.390202],
    [240.571776, -20.351618],
    [240.437279, -8.352324],
    [240.386954, -3.602587],
    [227.881951, -3.72416],
    [227.853012, -0.474289]
  ]
], z1 = a("Libra", "balance", R1, I1, W1), _1 = {
  ra: 228.404811,
  dec: -42.7088575
}, K1 = [
  // α Lupi to ζ Lupi:
  [
    [220.482375, -47.388139],
    [228.071667, -52.099083]
  ],
  // ζ Lupi to μ Lupi:
  [
    [228.071667, -52.099083],
    [229.633542, -47.875194]
  ],
  // ζ Lupi to η Lupi:
  [
    [228.071667, -52.099083],
    [240.030583, -38.396639]
  ],
  // μ Lupi to ε Lupi:
  [
    [229.633542, -47.875194],
    [230.670375, -44.689583]
  ],
  // ε Lupi to γ Lupi:
  [
    [230.670375, -44.689583],
    [233.78525, -41.166694]
  ],
  // γ Lupi to η Lupi:
  [
    [233.78525, -41.166694],
    [240.030583, -38.396639]
  ],
  // η Lupi to χ Lupi:
  [
    [240.030583, -38.396639],
    [237.73975, -33.627111]
  ],
  // χ Lupi to φ¹ Lupi:
  [
    [237.73975, -33.627111],
    [230.451833, -36.261167]
  ],
  // φ¹ Lupi to η Lupi:
  [
    [230.451833, -36.261167],
    [240.030583, -38.396639]
  ],
  // γ Lupi to δ Lupi:
  [
    [233.78525, -41.166694],
    [230.343083, -40.647472]
  ],
  // δ Lupi to β Lupi:
  [
    [230.343083, -40.647472],
    [224.633125, -43.133861]
  ]
], J1 = [
  [
    [214.656816, -55.579952],
    [220.234465, -55.540089],
    [228.083511, -55.475494],
    [228.056716, -54.475617],
    [232.353372, -54.436417],
    [232.207246, -48.437107],
    [237.247281, -48.388023],
    [237.124585, -42.388638],
    [242.152806, -42.336678],
    [241.947699, -29.837763],
    [236.92998, -29.889616],
    [225.63077, -29.994879],
    [225.79628, -42.494175],
    [214.450265, -42.580647],
    [214.656816, -55.579952]
  ]
], Q1 = a("Lupus", "the wolf", _1, K1, J1), Y1 = {
  ra: 117.351676,
  dec: 47.466622
}, X1 = [
  // α Lyncis to 38 Lyncis:
  [
    [140.264417, 34.392528],
    [139.711125, 36.802889]
  ],
  // 38 Lyncis to 10 Lyncis:
  [
    [139.711125, 36.802889],
    [135.161458, 41.783444]
  ],
  // 10 Lyncis to Alsciaukat:
  [
    [135.161458, 41.783444],
    [125.708792, 43.188131]
  ],
  // Alsciaukat to 21 Lyncis:
  [
    [125.708792, 43.188131],
    [111.678583, 49.211639]
  ],
  // 21 Lyncis to 15 Lyncis:
  [
    [111.678583, 49.211639],
    [104.319167, 58.423056]
  ],
  // 15 Lyncis to 2 Lyncis:
  [
    [104.319167, 58.423056],
    [94.905792, 59.010917]
  ]
], Z1 = [
  [
    [112.560719, 35.24453],
    [112.734125, 44.243549],
    [104.265303, 44.341839],
    [104.406359, 49.841003],
    [99.91946, 49.894588],
    [100.046031, 53.893829],
    [94.057366, 53.966255],
    [94.131089, 55.965809],
    [94.407456, 61.964127],
    [107.851552, 61.803146],
    [107.753197, 59.803726],
    [122.129101, 59.643398],
    [128.799134, 59.575989],
    [128.440104, 46.577728],
    [139.590711, 46.478279],
    [139.51249, 41.478596],
    [145.709238, 41.431675],
    [145.681973, 39.181767],
    [140.721631, 39.218819],
    [140.645985, 32.969116],
    [121.993231, 33.141514],
    [118.25808, 33.181229],
    [118.289709, 35.181053],
    [112.560719, 35.24453]
  ]
], a5 = a("Lynx", "the lynx", Y1, X1, Z1), e5 = {
  ra: 281.805206,
  dec: 36.773751
}, r5 = [
  // Vega to ε¹ Lyrae:
  [
    [279.234735, 38.783689],
    [281.084583, 39.671111]
  ],
  // ε¹ Lyrae to ζ¹ Lyrae:
  [
    [281.084583, 39.671111],
    [281.193083, 37.605056]
  ],
  // ζ¹ Lyrae to Vega:
  [
    [281.193083, 37.605056],
    [279.234735, 38.783689]
  ],
  // ζ¹ Lyrae to δ¹ Lyrae:
  [
    [281.193083, 37.605056],
    [283.4315, 36.971722]
  ],
  // δ¹ Lyrae to Sulafat:
  [
    [283.4315, 36.971722],
    [284.735928, 32.689557]
  ],
  // Sulafat to β Lyrae:
  [
    [284.735928, 32.689557],
    [282.505, 33.357222]
  ],
  // β Lyrae to ζ¹ Lyrae:
  [
    [282.505, 33.357222],
    [281.193083, 37.605056]
  ]
], n5 = [
  [
    [284.277162, 25.664141],
    [284.269867, 26.164097],
    [276.762886, 26.07435],
    [276.700773, 30.073977],
    [273.824386, 30.039156],
    [273.466874, 47.536987],
    [274.342375, 47.547604],
    [287.120648, 47.699867],
    [288.37552, 47.714394],
    [288.470307, 43.714939],
    [291.983527, 43.755035],
    [292.119655, 36.755802],
    [291.492605, 36.748714],
    [291.598778, 30.249315],
    [290.095253, 30.232197],
    [290.132646, 27.732408],
    [290.161314, 25.732574],
    [284.277162, 25.664141]
  ]
], c5 = a("Lyra", "the harp (lyre)", e5, r5, n5), u5 = {
  ra: 79.088314,
  dec: -79.908413
}, s5 = [
  // α Mensae to β Mensae:
  [
    [92.559167, -74.752528],
    [75.679167, -71.314333]
  ]
], t5 = [
  [
    [109.019709, -85.261444],
    [48.23292, -84.555382],
    [50.091655, -82.064453],
    [52.075782, -74.574127],
    [67.957485, -74.743164],
    [68.581524, -69.746719],
    [98.454423, -70.104134],
    [97.77071, -75.100037],
    [114.214704, -75.289917],
    [111.652115, -82.775886],
    [109.019709, -85.261444]
  ]
], o5 = a("Mensa", "Table Mountain (South Africa)", u5, s5, t5), l5 = {
  ra: 314.413004,
  dec: -36.274842
}, i5 = [
  // α Microscopii to γ Microscopii:
  [
    [312.492, -33.779667],
    [315.32275, -32.257778]
  ],
  // γ Microscopii to ε Microscopii:
  [
    [315.32275, -32.257778],
    [319.484375, -32.172472]
  ]
], m5 = [
  [
    [306.897955, -27.591339],
    [321.831636, -27.459667],
    [321.928053, -36.459297],
    [322.042321, -44.958858],
    [307.169295, -45.09],
    [306.897955, -27.591339]
  ]
], d5 = a("Microscopium", "microscope", l5, i5, m5), b5 = {
  ra: 105.514809,
  dec: 0.386696
}, h5 = [
  // α Monocerotis to ζ Monocerotis:
  [
    [115.312, -9.551083],
    [122.148583, -2.983778]
  ],
  // ζ Monocerotis to δ Monocerotis:
  [
    [122.148583, -2.983778],
    [107.966083, -0.492778]
  ],
  // δ Monocerotis to β Monocerotis:
  [
    [107.966083, -0.492778],
    [97.20625, -7.034444]
  ],
  // δ Monocerotis to 18 Monocerotis:
  [
    [107.966083, -0.492778],
    [101.96525, 2.412194]
  ],
  // β Monocerotis to γ Monocerotis:
  [
    [97.20625, -7.034444],
    [93.713917, -6.274722]
  ],
  // 18 Monocerotis to ε Monocerotis:
  [
    [101.96525, 2.412194],
    [95.942083, 4.592833]
  ],
  // 18 Monocerotis to 13 Monocerotis:
  [
    [101.96525, 2.412194],
    [98.225958, 7.332972]
  ],
  // ε Monocerotis to 13 Monocerotis:
  [
    [95.942083, 4.592833],
    [98.225958, 7.332972]
  ],
  // 13 Monocerotis to S Monocerotis:
  [
    [98.225958, 7.332972],
    [100.244417, 9.89575]
  ]
], $5 = [
  [
    [95.22568, -0.05371],
    [95.348031, 9.945548],
    [96.347665, 9.933448],
    [96.372764, 11.933297],
    [105.742815, 11.821345],
    [105.71846, 9.821487],
    [106.71788, 9.809775],
    [106.664322, 5.310089],
    [106.914275, 5.307168],
    [106.867396, 1.307442],
    [109.616919, 1.275572],
    [109.599666, -0.224329],
    [122.849007, -0.36939],
    [122.734179, -11.368799],
    [111.9734, -11.252145],
    [93.215625, -11.030153],
    [88.96579, -10.978532],
    [89.052372, -3.979057],
    [95.177142, -4.053416],
    [95.22568, -0.05371]
  ]
], p5 = a("Monoceros", "the unicorn", b5, h5, $5), g5 = {
  ra: 189.986122,
  dec: -70.153739
}, C5 = [
  // α Muscae to β Muscae:
  [
    [189.296167, -69.135528],
    [191.570292, -68.108083]
  ],
  // β Muscae to δ Muscae:
  [
    [191.570292, -68.108083],
    [195.56575, -71.548806]
  ],
  // δ Muscae to γ Muscae:
  [
    [195.56575, -71.548806],
    [188.117125, -72.132972]
  ],
  // γ Muscae to α Muscae:
  [
    [188.117125, -72.132972],
    [189.296167, -69.135528]
  ],
  // α Muscae to ε Muscae:
  [
    [189.296167, -69.135528],
    [184.394333, -67.960667]
  ],
  // ε Muscae to λ Muscae:
  [
    [184.394333, -67.960667],
    [176.402375, -66.728833]
  ]
], T5 = [
  [
    [170.084811, -64.684265],
    [169.856973, -75.684013],
    [207.781434, -75.623596],
    [207.46087, -70.624443],
    [207.268023, -65.624954],
    [204.70748, -65.637878],
    [204.680286, -64.63794],
    [194.43838, -64.676964],
    [179.057364, -64.695785],
    [170.084811, -64.684265]
  ]
], f5 = a("Musca", "the fly", g5, C5, T5), y5 = {
  ra: 240.293057,
  dec: -51.351486
}, v5 = [
  // γ² Normae to γ¹ Normae:
  [
    [244.960708, -50.155389],
    [244.253917, -50.068111]
  ],
  // γ¹ Normae to η Normae:
  [
    [244.253917, -50.068111],
    [240.803583, -49.229722]
  ],
  // η Normae to δ Normae:
  [
    [240.803583, -49.229722],
    [241.622583, -45.173278]
  ],
  // δ Normae to ε Normae:
  [
    [241.622583, -45.173278],
    [246.796042, -47.554722]
  ],
  // ε Normae to γ² Normae:
  [
    [246.796042, -47.554722],
    [244.960708, -50.155389]
  ]
], A5 = [
  [
    [232.549868, -60.435493],
    [249.034681, -60.264458],
    [248.570624, -45.767052],
    [248.494778, -42.267479],
    [242.152806, -42.336678],
    [237.124585, -42.388638],
    [237.247281, -48.388023],
    [232.207246, -48.437107],
    [232.353372, -54.436417],
    [228.056716, -54.475617],
    [228.083511, -55.475494],
    [232.381911, -55.436283],
    [232.549868, -60.435493]
  ]
], P5 = a("Norma", "carpenter's level", y5, v5, A5), S5 = {
  ra: 164.399239,
  dec: -81.444379
}, M5 = [
  // β Octantis to ν Octantis:
  [
    [341.5155, -81.381611],
    [325.368625, -77.389472]
  ],
  // ν Octantis to δ Octantis:
  [
    [325.368625, -77.389472],
    [216.73225, -83.667861]
  ],
  // δ Octantis to β Octantis:
  [
    [216.73225, -83.667861],
    [341.5155, -81.381611]
  ]
], L5 = [
  [
    [0.800646, -89.303902],
    [1.533391, -81.803955],
    [50.091655, -82.064453],
    [48.23292, -84.555382],
    [109.019709, -85.261444],
    [111.652115, -82.775886],
    [209.111109, -83.120071],
    [276.865998, -82.458275],
    [274.19506, -74.974518],
    [323.184757, -74.454468],
    [351.997833, -74.312462],
    [1.566306, -74.303963],
    [0.800646, -89.303902],
    [0.800652, -89.303894],
    [0.800646, -89.303902]
  ]
], x5 = a("Octans", "octant (instrument)", S5, M5, L5), H5 = {
  ra: 263.001775,
  dec: -5.399442
}, D5 = [
  // Rasalhague to κ Ophiuchi:
  [
    [263.733627, 12.560035],
    [254.417792, 9.375056]
  ],
  // κ Ophiuchi to Yed Prior:
  [
    [254.417792, 9.375056],
    [243.586411, -3.694323]
  ],
  // Yed Prior to Yed Posterior:
  [
    [243.586411, -3.694323],
    [244.580374, -4.69251]
  ],
  // Yed Posterior to υ Ophiuchi:
  [
    [244.580374, -4.69251],
    [246.950958, -8.371694]
  ],
  // υ Ophiuchi to ζ Ophiuchi:
  [
    [246.950958, -8.371694],
    [249.289708, -10.567139]
  ],
  // ζ Ophiuchi to Sabik:
  [
    [249.289708, -10.567139],
    [257.594529, -15.724907]
  ],
  // Sabik to Cebalrai:
  [
    [257.594529, -15.724907],
    [265.868136, 4.5673]
  ],
  // Cebalrai to Rasalhague:
  [
    [265.868136, 4.5673],
    [263.733627, 12.560035]
  ],
  // Cebalrai to γ Ophiuchi:
  [
    [265.868136, 4.5673],
    [266.973208, 2.707472]
  ],
  // γ Ophiuchi to ν Ophiuchi:
  [
    [266.973208, 2.707472],
    [269.756667, -9.773361]
  ]
], V5 = [
  [
    [245.602627, -0.296377],
    [245.558595, 3.703381],
    [252.80591, 3.785211],
    [252.701482, 12.617938],
    [260.195847, 12.706148],
    [260.176878, 14.206035],
    [275.173274, 14.387479],
    [275.203085, 12.054331],
    [281.388045, 12.128774],
    [281.458569, 6.379194],
    [275.27461, 6.304763],
    [275.296011, 4.554893],
    [277.871131, 4.586016],
    [277.8893, 3.086125],
    [275.314236, 3.055003],
    [275.350599, 0.055224],
    [269.101038, -0.020647],
    [269.149704, -4.020351],
    [271.149674, -3.996055],
    [271.223716, -9.995605],
    [266.723757, -10.050234],
    [266.7447, -11.716777],
    [265.494404, -11.731914],
    [265.47349, -10.06537],
    [259.22207, -10.140438],
    [259.297428, -16.13999],
    [265.80019, -16.061882],
    [266.001835, -30.060663],
    [253.235349, -30.212309],
    [253.15567, -24.796097],
    [245.891446, -24.878118],
    [245.822984, -19.545166],
    [247.450675, -19.527155],
    [247.43823, -18.527226],
    [245.81068, -18.545235],
    [245.691204, -8.29589],
    [240.437279, -8.352324],
    [240.386954, -3.602587],
    [245.638389, -3.54618],
    [245.602627, -0.296377]
  ]
], O5 = a("Ophiuchus", "serpent-bearer", H5, D5, V5), B5 = {
  ra: 83.758621,
  dec: 6.349703
}, E5 = [
  // ν Orionis to ξ Orionis
  [
    [91.893, 14.768528],
    [92.985, 14.208806]
  ],
  // ν Orionis to χ¹ Orionis
  [
    [91.893, 14.768528],
    [88.596167, 20.276417]
  ],
  // ξ Orionis to χ² Orionis:
  [
    [92.985, 14.208806],
    [90.979917, 20.138472]
  ],
  // μ Orionis to ν Orionis
  [
    [90.595792, 9.647361],
    [91.893, 14.768528]
  ],
  // μ Orionis to ξ Orionis:
  [
    [90.595792, 9.647361],
    [92.985, 14.208806]
  ],
  // Betelgeuse to μ Orionis:
  [
    [88.792939, 7.407064],
    [90.595792, 9.647361]
  ],
  // Betelgeuse to Meissa:
  [
    [88.792939, 7.407064],
    [83.784486, 9.934156]
  ],
  // Meissa to Bellatrix:
  [
    [83.784486, 9.934156],
    [81.282764, 6.349703]
  ],
  // Betelgeuse to Bellatrix
  [
    [88.792939, 7.407064],
    [81.282764, 6.349703]
  ],
  // Betelgeuse to Alnitak
  [
    [88.792939, 7.407064],
    [85.189694, -1.942574]
  ],
  // Alnitak to Saiph:
  [
    [85.189694, -1.942574],
    [86.93912, -9.669605]
  ],
  // Alnitak to Alnilam:
  [
    [85.189694, -1.942574],
    [84.053389, -1.201919]
  ],
  // Alnilam to Mintaka:
  [
    [84.053389, -1.201919],
    [83.001667, -0.299095]
  ],
  // Mintaka to η Orionis:
  [
    [83.001667, -0.299095],
    [81.11925, -2.397139]
  ],
  // η Orionis to Rigel:
  [
    [81.11925, -2.397139],
    [78.634467, -8.201638]
  ],
  // Rigel to Saiph:
  [
    [78.634467, -8.201638],
    [86.93912, -9.669605]
  ],
  // Bellatrix to Mintaka:
  [
    [81.282764, 6.349703],
    [83.001667, -0.299095]
  ],
  // Bellatrix to Tabit:
  [
    [81.282764, 6.349703],
    [72.460045, 6.961275]
  ],
  // Tabit to π⁴ Orionis:
  [
    [72.460045, 6.961275],
    [72.801542, 5.605111]
  ],
  // π⁴ Orionis to π⁵ Orionis:
  [
    [72.801542, 5.605111],
    [73.562917, 2.440667]
  ],
  // π⁵ Orionis to π⁶ Orionis:
  [
    [73.562917, 2.440667],
    [74.637083, 1.714028]
  ],
  // Tabit to π² Orionis
  [
    [72.460045, 6.961275],
    [72.653, 8.90025]
  ],
  // π² Orionis to π¹ Orionis:
  [
    [72.653, 8.90025],
    [73.72375, 10.151139]
  ]
], q5 = [
  [
    [70.85236, 0.237501],
    [71.034029, 15.736463],
    [76.288926, 15.675535],
    [76.295279, 16.175499],
    [81.798712, 16.110105],
    [81.792232, 15.610145],
    [85.793646, 15.56192],
    [85.755057, 12.562155],
    [88.25537, 12.531851],
    [88.327167, 18.031416],
    [87.326982, 18.043549],
    [87.393794, 22.876472],
    [90.144037, 22.843086],
    [90.125155, 21.509872],
    [95.124127, 21.449177],
    [95.069575, 17.449507],
    [96.443917, 17.432865],
    [96.372764, 11.933297],
    [96.347665, 9.933448],
    [95.348031, 9.945548],
    [95.22568, -0.05371],
    [95.177142, -4.053416],
    [89.052372, -3.979057],
    [88.96579, -10.978532],
    [77.720031, -10.843229],
    [77.804395, -3.843729],
    [71.556359, -3.77082],
    [71.602314, 0.228916],
    [70.85236, 0.237501]
  ]
], U5 = a("Orion", "Orion (mythological character)", B5, E5, q5), w5 = {
  ra: 295.428238,
  dec: -66.964093
}, G5 = [
  // Peacock to γ Pavonis:
  [
    [306.411904, -56.73509],
    [321.610375, -65.368139]
  ],
  // γ Pavonis to β Pavonis:
  [
    [321.610375, -65.368139],
    [311.239833, -66.20325]
  ],
  // β Pavonis to δ Pavonis:
  [
    [311.239833, -66.20325],
    [302.174417, -66.179333]
  ],
  // δ Pavonis to Peacock:
  [
    [302.174417, -66.179333],
    [306.411904, -56.73509]
  ],
  // δ Pavonis to ε Pavonis:
  [
    [302.174417, -66.179333],
    [300.147458, -72.910194]
  ],
  // δ Pavonis to ζ Pavonis:
  [
    [302.174417, -66.179333],
    [280.758875, -71.427722]
  ],
  // δ Pavonis to λ Pavonis:
  [
    [302.174417, -66.179333],
    [283.054333, -62.187556]
  ],
  // δ Pavonis to κ Pavonis:
  [
    [302.174417, -66.179333],
    [284.237667, -67.233528]
  ],
  // λ Pavonis to ξ Pavonis:
  [
    [283.054333, -62.187556],
    [275.80675, -61.493917]
  ],
  // ξ Pavonis to π Pavonis:
  [
    [275.80675, -61.493917],
    [272.144958, -63.668056]
  ],
  // κ Pavonis to π Pavonis:
  [
    [284.237667, -67.233528],
    [272.144958, -63.668056]
  ],
  // π Pavonis to η Pavonis:
  [
    [272.144958, -63.668056],
    [266.433333, -64.723722]
  ]
], j5 = [
  [
    [274.19506, -74.974518],
    [323.184757, -74.454468],
    [322.348651, -59.457684],
    [307.564801, -59.588055],
    [307.458801, -56.588577],
    [272.672253, -56.983772],
    [265.16819, -57.074776],
    [265.775729, -67.571106],
    [273.280077, -67.48008],
    [274.19506, -74.974518]
  ]
], F5 = a("Pavo", "the peacock", w5, G5, j5), k5 = {
  ra: 11.317612,
  dec: 18.030566
}, N5 = [
  // Alpheratz to Scheat:
  [
    [2.096916, 29.090431],
    [345.943572, 28.082785]
  ],
  // Alpheratz to Algenib:
  [
    [2.096916, 29.090431],
    [3.308963, 15.183594]
  ],
  // Algenib to Markab:
  [
    [3.308963, 15.183594],
    [346.190223, 15.205267]
  ],
  // Scheat to Markab:
  [
    [345.943572, 28.082785],
    [346.190223, 15.205267]
  ],
  // Scheat to Matar:
  [
    [345.943572, 28.082785],
    [340.750579, 30.221244]
  ],
  // Matar to π Pegasi:
  [
    [340.750579, 30.221244],
    [332.496875, 33.178278]
  ],
  // Scheat to Sadalbari:
  [
    [345.943572, 28.082785],
    [342.500809, 24.601577]
  ],
  // Sadalbari to λ Pegasi:
  [
    [342.500809, 24.601577],
    [341.632667, 23.565667]
  ],
  // λ Pegasi to ι Pegasi:
  [
    [341.632667, 23.565667],
    [331.751958, 25.345056]
  ],
  // ι Pegasi to κ Pegasi:
  [
    [331.751958, 25.345056],
    [326.16125, 25.645]
  ],
  // Markab to Homam:
  [
    [346.190223, 15.205267],
    [340.365503, 10.831363]
  ],
  // Homam to Biham:
  [
    [340.365503, 10.831363],
    [332.549939, 6.197863]
  ],
  // Biham to Enif:
  [
    [332.549939, 6.197863],
    [326.046484, 9.875009]
  ]
], R5 = [
  [
    [321.583471, 2.53938],
    [321.501102, 13.039063],
    [318.244515, 13.013201],
    [318.250265, 12.346555],
    [317.248364, 12.338261],
    [317.178783, 20.004641],
    [320.188409, 20.029081],
    [320.1517, 24.028936],
    [322.66202, 24.04821],
    [322.620164, 28.548054],
    [327.395181, 28.581795],
    [327.319965, 36.581547],
    [329.461012, 36.595383],
    [331.35046, 36.606907],
    [331.359558, 35.606934],
    [343.706532, 35.665611],
    [343.709193, 35.165615],
    [344.465304, 35.168236],
    [354.04418, 35.191311],
    [354.049158, 32.774647],
    [357.828082, 32.778507],
    [357.828741, 32.028503],
    [1.606977, 32.029365],
    [1.606216, 28.696035],
    [2.612843, 28.695759],
    [2.610016, 22.695759],
    [3.740645, 22.695192],
    [3.739921, 21.695192],
    [3.734118, 13.195194],
    [1.603175, 13.196035],
    [1.60273, 10.696035],
    [359.097119, 10.695797],
    [359.098034, 8.195797],
    [342.821416, 8.162168],
    [342.842217, 2.662207],
    [331.587267, 2.607607],
    [331.588755, 2.357612],
    [326.587086, 2.325691],
    [326.580219, 3.325668],
    [323.578749, 3.304391],
    [323.58427, 2.554411],
    [321.583471, 2.53938]
  ]
], I5 = a("Pegasus", "Pegasus (mythological winged horse)", k5, N5, R5);
// @license        Copyright © 2021-2024 observerly
const W5 = {
  ra: 42.633374,
  dec: 43.139636
}, z5 = [
  // Mirfak to ι Persei:
  [
    [51.080709, 49.861179],
    [47.262, 49.6135]
  ],
  // ι Persei to θ Persei:
  [
    [47.262, 49.6135],
    [41.048708, 49.228667]
  ],
  // θ Persei to φ Persei:
  [
    [41.048708, 49.228667],
    [25.915083, 50.688778]
  ],
  // ι Persei to Misam:
  [
    [47.262, 49.6135],
    [47.374048, 44.857541]
  ],
  // Misam to Algol:
  [
    [47.374048, 44.857541],
    [47.042215, 40.955648]
  ],
  // Algol to ρ Persei:
  [
    [47.042215, 40.955648],
    [46.29375, 38.840528]
  ],
  // Algol to ε Persei:
  [
    [47.042215, 40.955648],
    [59.463417, 40.010278]
  ],
  // ε Persei to Menkib:
  [
    [59.463417, 40.010278],
    [59.741253, 35.791032]
  ],
  // Menkib to ζ Persei:
  [
    [59.741253, 35.791032],
    [58.533, 31.883667]
  ],
  // ζ Persei to Atik:
  [
    [58.533, 31.883667],
    [56.07972, 32.28824]
  ],
  // ε Persei to δ Persei:
  [
    [59.463417, 40.010278],
    [55.731167, 47.787667]
  ],
  // δ Persei to Mirfak:
  [
    [55.731167, 47.787667],
    [51.080709, 49.861179]
  ],
  // δ Persei to c Persei:
  [
    [55.731167, 47.787667],
    [62.165292, 47.712583]
  ],
  // c Persei to μ Persei:
  [
    [62.165292, 47.712583],
    [63.724417, 48.409361]
  ],
  // μ Persei to b Persei:
  [
    [63.724417, 48.409361],
    [64.56075, 50.295639]
  ],
  // b Persei to λ Persei:
  [
    [64.56075, 50.295639],
    [61.646083, 50.351361]
  ],
  // Mirfak to γ Persei:
  [
    [51.080709, 49.861179],
    [46.18375, 53.519444]
  ],
  // γ Persei to Miram:
  [
    [46.18375, 53.519444],
    [42.674207, 55.895497]
  ],
  // Miram to τ Persei:
  [
    [42.674207, 55.895497],
    [43.564417, 52.7625]
  ],
  // τ Persei to ι Persei:
  [
    [43.564417, 52.7625],
    [47.262, 49.6135]
  ],
  // γ Persei to τ Persei:
  [
    [46.18375, 53.519444],
    [43.564417, 52.7625]
  ]
], _5 = [
  [
    [42.62838, 31.186502],
    [42.666468, 34.519676],
    [40.402383, 34.537514],
    [40.434659, 37.287388],
    [39.679341, 37.293156],
    [39.885479, 51.042374],
    [32.673801, 51.092583],
    [32.621491, 47.592751],
    [26.93144, 47.625843],
    [26.968524, 50.625744],
    [22.407936, 50.647877],
    [22.456014, 54.64777],
    [27.533641, 54.622883],
    [27.595223, 58.122719],
    [30.773624, 58.104675],
    [30.795625, 59.10461],
    [38.802355, 59.051155],
    [38.762337, 57.5513],
    [48.90093, 57.468498],
    [49.913496, 57.459385],
    [49.854022, 55.459652],
    [52.3819, 55.436283],
    [52.313086, 52.936607],
    [72.840285, 52.719647],
    [72.457344, 36.221851],
    [69.573841, 36.254715],
    [69.486938, 30.921875],
    [52.426668, 31.100361],
    [42.62838, 31.186502]
  ]
], K5 = a("Perseus", "Perseus (mythological character)", W5, z5, _5);
// @license        Copyright © 2021-2024 observerly
const J5 = {
  ra: 13.23505,
  dec: -47.585609
}, Q5 = [
  // Ankaa to β Phoenicis:
  [
    [6.570939, -42.306084],
    [16.521292, -46.7185]
  ],
  // β Phoenicis to γ Phoenicis:
  [
    [16.521292, -46.7185],
    [22.091417, -43.317722]
  ],
  // γ Phoenicis to δ Phoenicis:
  [
    [22.091417, -43.317722],
    [22.812417, -49.073083]
  ],
  // δ Phoenicis to Wurren:
  [
    [22.812417, -49.073083],
    [17.096173, -55.245758]
  ],
  // Wurren to β Phoenicis:
  [
    [17.096173, -55.245758],
    [16.521292, -46.7185]
  ],
  // β Phoenicis to ε Phoenicis:
  [
    [16.521292, -46.7185],
    [2.35225, -45.747]
  ],
  // ε Phoenicis to Ankaa:
  [
    [2.35225, -45.747],
    [6.570939, -42.306084]
  ]
], Y5 = [
  [
    [351.692705, -39.312759],
    [351.768522, -56.312687],
    [351.778394, -57.812679],
    [21.206229, -57.848415],
    [21.273263, -52.84856],
    [24.967355, -52.865856],
    [24.993847, -50.865921],
    [28.693257, -50.885922],
    [28.738323, -47.552723],
    [36.152948, -47.600494],
    [36.264014, -39.434216],
    [26.350728, -39.372623],
    [351.692705, -39.312759]
  ]
], X5 = a("Phoenix", "Phoenix (mythological immortal bird)", J5, Q5, Y5);
// @license        Copyright © 2021-2024 observerly
const Z5 = {
  ra: 85.35761,
  dec: -53.578316
}, a6 = [
  // α Pictoris to γ Pictoris:
  [
    [102.048083, -61.941972],
    [87.456583, -56.1665]
  ],
  // γ Pictoris to β Pictoris:
  [
    [87.456583, -56.1665],
    [86.821167, -51.066722]
  ]
], e6 = [
  [
    [90.951777, -43.005779],
    [75.974444, -42.82555],
    [73.48237, -42.796368],
    [73.402083, -46.295902],
    [68.424096, -46.238796],
    [68.362248, -48.738449],
    [68.217745, -53.737637],
    [75.677017, -53.823803],
    [75.547743, -57.32304],
    [83.018804, -57.412262],
    [82.857614, -60.911289],
    [90.345061, -61.002098],
    [90.173643, -64.001053],
    [98.937249, -64.107025],
    [102.703314, -64.151878],
    [103.011117, -58.153702],
    [97.995078, -58.093842],
    [98.114275, -55.094559],
    [93.1074, -55.03405],
    [93.194354, -52.534576],
    [90.693705, -52.504211],
    [90.748902, -50.754547],
    [90.951777, -43.005779]
  ]
], r6 = a("Pictor", "the easel", Z5, a6, e6), n6 = {
  ra: 25.582406,
  dec: 19.172059
}, c6 = [
  // τ Piscium to υ Piscium:
  [
    [17.914958, 30.089722],
    [19.866583, 27.264083]
  ],
  // υ Piscium to φ Piscium:
  [
    [19.866583, 27.264083],
    [18.43725, 24.583778]
  ],
  // φ Piscium to τ Piscium:
  [
    [18.43725, 24.583778],
    [17.914958, 30.089722]
  ],
  // φ Piscium to Alpherg:
  [
    [18.43725, 24.583778],
    [22.870873, 15.345823]
  ],
  // Alpherg to Torcular:
  [
    [22.870873, 15.345823],
    [26.348466, 9.157737]
  ],
  // Torcular to Alrescha:
  [
    [26.348466, 9.157737],
    [30.511772, 2.763735]
  ],
  // Alrescha to ν Piscium:
  [
    [30.511772, 2.763735],
    [25.357958, 5.487611]
  ],
  // ν Piscium to μ Piscium:
  [
    [25.357958, 5.487611],
    [22.545583, 6.143944]
  ],
  // μ Piscium to ε Piscium:
  [
    [22.545583, 6.143944],
    [15.736083, 7.890083]
  ],
  // ε Piscium to δ Piscium:
  [
    [15.736083, 7.890083],
    [12.170417, 7.585194]
  ],
  // δ Piscium to ω Piscium:
  [
    [12.170417, 7.585194],
    [359.8275, 6.863583]
  ],
  // ω Piscium to ι Piscium:
  [
    [359.8275, 6.863583],
    [354.98675, 5.627361]
  ],
  // ι Piscium to θ Piscium:
  [
    [354.98675, 5.627361],
    [351.992375, 6.379111]
  ],
  // θ Piscium to γ Piscium:
  [
    [351.992375, 6.379111],
    [349.289542, 3.28225]
  ],
  // γ Piscium to κ Piscium:
  [
    [349.289542, 3.28225],
    [351.732958, 1.255833]
  ],
  // κ Piscium to λ Piscium:
  [
    [351.732958, 1.255833],
    [355.512, 1.780417]
  ],
  // λ Piscium to ι Piscium:
  [
    [355.512, 1.780417],
    [354.98675, 5.627361]
  ]
], u6 = [
  [
    [342.849713, 0.662221],
    [342.842217, 2.662207],
    [342.821416, 8.162168],
    [359.098034, 8.195797],
    [359.097119, 10.695797],
    [1.60273, 10.696035],
    [1.603175, 13.196035],
    [3.734118, 13.195194],
    [3.739921, 21.695192],
    [14.414815, 21.676638],
    [14.424065, 24.426624],
    [12.413491, 24.431932],
    [12.443064, 33.681896],
    [22.897426, 33.64537],
    [22.86642, 28.645439],
    [26.76471, 28.626282],
    [26.744675, 25.626335],
    [26.655734, 10.54324],
    [31.665248, 10.514395],
    [31.615266, 2.597881],
    [6.603788, 2.692538],
    [6.601329, 0.69254],
    [6.592702, -6.307455],
    [359.103299, -6.304202],
    [359.102211, -3.304202],
    [342.864704, -3.337751],
    [342.849713, 0.662221]
  ]
], s6 = a("Pisces", "fishes", n6, c6, u6);
// @license        Copyright © 2021-2024 observerly
const t6 = {
  ra: 334.23952,
  dec: -30.594519
}, o6 = [
  // Fomalhaut to δ Piscis Austrini:
  [
    [344.412693, -29.622237],
    [343.987042, -32.539694]
  ],
  // δ Piscis Austrini to γ Piscis Austrini:
  [
    [343.987042, -32.539694],
    [343.1315, -32.875444]
  ],
  // γ Piscis Austrini to β Piscis Austrini:
  [
    [343.1315, -32.875444],
    [337.876208, -32.346028]
  ],
  // β Piscis Austrini to μ Piscis Austrini:
  [
    [337.876208, -32.346028],
    [332.095625, -32.988389]
  ],
  // μ Piscis Austrini to ι Piscis Austrini:
  [
    [332.095625, -32.988389],
    [326.236625, -33.025556]
  ],
  // ι Piscis Austrini to θ Piscis Austrini:
  [
    [326.236625, -33.025556],
    [326.934042, -30.898306]
  ],
  // θ Piscis Austrini to μ Piscis Austrini:
  [
    [326.934042, -30.898306],
    [332.095625, -32.988389]
  ],
  // μ Piscis Austrini to ε Piscis Austrini:
  [
    [332.095625, -32.988389],
    [340.163875, -27.043611]
  ],
  // ε Piscis Austrini to Fomalhaut:
  [
    [340.163875, -27.043611],
    [344.412693, -29.622237]
  ]
], l6 = [
  [
    [346.680966, -24.825045],
    [329.770289, -24.904041],
    [321.807775, -24.959761],
    [321.831636, -27.459667],
    [321.928053, -36.459297],
    [346.727514, -36.324974],
    [346.680966, -24.825045],
    [346.680966, -24.825045]
  ]
], i6 = a("Piscis Austrinus", "the southern fish", t6, o6, l6), m6 = {
  ra: 112.365076,
  dec: -32.176715
}, d6 = [
  // Naos to Tureis:
  [
    [120.896031, -40.003148],
    [121.886037, -24.304324]
  ],
  // Tureis to Azmidi:
  [
    [121.886037, -24.304324],
    [117.323563, -24.859786]
  ],
  // Azmidi to κ¹ Puppis:
  [
    [117.323563, -24.859786],
    [114.707833, -26.803889]
  ],
  // Azmidi to l Puppis:
  [
    [117.323563, -24.859786],
    [115.951958, -28.954833]
  ],
  // κ¹ Puppis to p Puppis:
  [
    [114.707833, -26.803889],
    [113.845583, -28.369278]
  ],
  // l Puppis to p Puppis:
  [
    [115.951958, -28.954833],
    [113.845583, -28.369278]
  ],
  // p Puppis to π Puppis:
  [
    [113.845583, -28.369278],
    [109.285667, -37.0975]
  ],
  // π Puppis to ν Puppis:
  [
    [109.285667, -37.0975],
    [99.440292, -43.195917]
  ]
], b6 = [
  [
    [111.9734, -11.252145],
    [111.677199, -33.250469],
    [99.90386, -33.112816],
    [99.708916, -43.111649],
    [90.951777, -43.005779],
    [90.748902, -50.754547],
    [120.861698, -51.102585],
    [121.038279, -43.353504],
    [126.572313, -43.409519],
    [126.677799, -37.160038],
    [126.927095, -17.411257],
    [126.98978, -11.411565],
    [122.734179, -11.368799],
    [111.9734, -11.252145]
  ]
], h6 = a("Puppis", "a ship's poop deck", m6, d6, b6), $6 = {
  ra: 134.289713,
  dec: -27.301515
}, p6 = [
  // γ Pyxidis to α Pyxidis:
  [
    [132.633375, -27.710056],
    [130.898125, -33.186417]
  ],
  // α Pyxidis to β Pyxidis:
  [
    [130.898125, -33.186417],
    [130.025583, -35.308306]
  ]
], g6 = [
  [
    [126.927095, -17.411257],
    [130.18434, -17.442471],
    [130.163512, -19.442373],
    [137.68497, -19.508831],
    [137.636776, -24.508631],
    [141.904335, -24.542519],
    [141.771599, -37.292015],
    [126.677799, -37.160038],
    [126.927095, -17.411257],
    [126.927095, -17.411257]
  ]
], C6 = a("Pyxis", "a mariner's compass", $6, p6, g6), T6 = {
  ra: 58.818737,
  dec: -60.774595
}, f6 = [
  // α Reticuli to β Reticuli:
  [
    [63.605958, -62.473972],
    [56.048125, -64.807083]
  ],
  // β Reticuli to δ Reticuli:
  [
    [56.048125, -64.807083],
    [59.686417, -61.400139]
  ],
  // δ Reticuli to ε Reticuli:
  [
    [59.686417, -61.400139],
    [64.121167, -59.30175]
  ],
  // ε Reticuli to α Reticuli:
  [
    [64.121167, -59.30175],
    [63.605958, -62.473972]
  ]
], y6 = [
  [
    [48.36269, -67.03582],
    [68.794019, -67.247925],
    [69.274535, -58.750664],
    [65.55459, -58.708855],
    [65.650462, -56.209385],
    [60.692919, -56.155586],
    [60.797896, -52.822811],
    [58.318788, -52.796844],
    [53.365002, -52.747078],
    [53.236816, -57.079784],
    [48.791131, -57.037785],
    [48.36269, -67.03582]
  ]
], v6 = a("Reticulum", "an eyepiece graticule", T6, f6, y6), A6 = {
  ra: 294.751863,
  dec: 19.005649
}, P6 = [
  // γ Sagittae to δ Sagittae:
  [
    [299.689125, 19.492083],
    [296.84625, 18.533611]
  ],
  // δ Sagittae to Sham:
  [
    [296.84625, 18.533611],
    [295.024133, 18.013891]
  ],
  // δ Sagittae to β Sagittae:
  [
    [296.84625, 18.533611],
    [295.262208, 17.476111]
  ]
], S6 = [
  [
    [284.373636, 18.664709],
    [284.339133, 21.247835],
    [290.096311, 21.314816],
    [290.121288, 19.398298],
    [298.885689, 19.495539],
    [298.860255, 21.578733],
    [305.125409, 21.643656],
    [305.134049, 20.8937],
    [305.186949, 16.143963],
    [303.558998, 16.127516],
    [298.926, 16.079084],
    [298.921165, 16.495729],
    [286.405477, 16.355068],
    [286.375494, 18.688223],
    [284.373636, 18.664709]
  ]
], M6 = a("Sagitta", "the arrow", A6, P6, S6), L6 = {
  ra: 286.992805,
  dec: -26.484366
}, x6 = [
  // τ Sagittarii to Nunki:
  [
    [286.735167, -27.669806],
    [283.81636, -26.296724]
  ],
  // Nunki to Ascella:
  [
    [286.735167, -27.669806],
    [285.653043, -29.880063]
  ],
  // Nunki to φ Sagittarii:
  [
    [283.81636, -26.296724],
    [281.413958, -26.990778]
  ],
  // Ascella to φ Sagittarii:
  [
    [285.653043, -29.880063],
    [281.413958, -26.990778]
  ],
  // φ Sagittarii to Kaus Borealis:
  [
    [281.413958, -26.990778],
    [276.992668, -25.421701]
  ],
  // φ Sagittarii to Kaus Media:
  [
    [281.413958, -26.990778],
    [275.248508, -29.828104]
  ],
  // Kaus Media to Kaus Borealis:
  [
    [275.248508, -29.828104],
    [276.992668, -25.421701]
  ],
  // Kaus Borealis to Polis:
  [
    [276.992668, -25.421701],
    [273.44087, -21.058832]
  ],
  // Kaus Media to Alnasl:
  [
    [275.248508, -29.828104],
    [271.452025, -30.4241]
  ],
  // Kaus Media to Kaus Australis:
  [
    [275.248508, -29.828104],
    [276.042993, -34.384616]
  ],
  // Alnasl to Kaus Australis:
  [
    [271.452025, -30.4241],
    [276.042993, -34.384616]
  ],
  // Ascella to Kaus Australis:
  [
    [285.653043, -29.880063],
    [276.042993, -34.384616]
  ],
  // Kaus Australis to η Sagittarii:
  [
    [276.042993, -34.384616],
    [274.407208, -36.761278]
  ]
], H6 = [
  [
    [284.744054, -11.866436],
    [284.79372, -15.832812],
    [275.549526, -15.943572],
    [265.80019, -16.061882],
    [266.001835, -30.060663],
    [269.502811, -30.018208],
    [269.625464, -37.01746],
    [289.59632, -36.778565],
    [289.76964, -45.277565],
    [307.169295, -45.09],
    [306.897955, -27.591339],
    [301.91597, -27.641914],
    [301.72637, -11.676234],
    [284.744054, -11.866436]
  ]
], D6 = a("Sagittarius", "the archer", L6, x6, H6), V6 = {
  ra: 251.408812,
  dec: -26.571625
}, O6 = [
  // Shaula to k Scorpii:
  [
    [263.402167, -37.103824],
    [256.205625, -34.122917]
  ],
  // k Scorpii to ι¹ Scorpii:
  [
    [256.205625, -34.122917],
    [266.896167, -40.126972]
  ],
  // ι¹ Scorpii to Sargas:
  [
    [266.896167, -40.126972],
    [264.329711, -42.997824]
  ],
  // Sargas to η Scorpii:
  [
    [264.329711, -42.997824],
    [258.03825, -43.2385]
  ],
  // η Scorpii to ζ¹ Scorpii:
  [
    [258.03825, -43.2385],
    [253.498875, -42.362028]
  ],
  // ζ¹ Scorpii to Xamidimura:
  [
    [253.498875, -42.362028],
    [252.96763, -38.04738]
  ],
  // Xamidimura to Larawag:
  [
    [252.96763, -38.04738],
    [252.540878, -34.293232]
  ],
  // Larawag to Paikauhale:
  [
    [252.540878, -34.293232],
    [248.970637, -28.216017]
  ],
  // Paikauhale to Antares:
  [
    [248.970637, -28.216017],
    [247.351915, -26.432003]
  ],
  // Antares to Alniyat σ Scorpii:
  [
    [247.351915, -26.432003],
    [245.297149, -25.592792]
  ],
  // Alniyat to Dschubba:
  [
    [245.297149, -25.592792],
    [240.083359, -22.62171]
  ],
  // Dschubba to Acrab:
  [
    [240.083359, -22.62171],
    [241.3593, -19.805453]
  ],
  // Acrab to Jabbah ν Scorpii:
  [
    [241.3593, -19.805453],
    [242.998894, -19.460708]
  ],
  // Dschubba to Fang:
  [
    [240.083359, -22.62171],
    [239.712972, -26.114108]
  ],
  // Fang to Iklil:
  [
    [239.712972, -26.114108],
    [239.221151, -29.214073]
  ]
], B6 = [
  [
    [240.437279, -8.352324],
    [245.691204, -8.29589],
    [245.81068, -18.545235],
    [247.43823, -18.527226],
    [247.450675, -19.527155],
    [245.822984, -19.545166],
    [245.891446, -24.878118],
    [253.15567, -24.796097],
    [253.235349, -30.212309],
    [266.001835, -30.060663],
    [269.502811, -30.018208],
    [269.625464, -37.01746],
    [269.809284, -45.516346],
    [248.570624, -45.767052],
    [248.494778, -42.267479],
    [242.152806, -42.336678],
    [241.947699, -29.837763],
    [236.92998, -29.889616],
    [236.813064, -20.390202],
    [240.571776, -20.351618],
    [240.437279, -8.352324]
  ]
], E6 = a("Scorpius", "the scorpion", V6, O6, B6), q6 = {
  ra: 2.815945,
  dec: -32.099686
}, U6 = [
  // α Sculptoris to ι Sculptoris:
  [
    [14.651458, -29.357472],
    [5.379917, -28.981306]
  ],
  // ι Sculptoris to δ Sculptoris:
  [
    [5.379917, -28.981306],
    [357.231167, -28.130028]
  ],
  // δ Sculptoris to γ Sculptoris:
  [
    [357.231167, -28.130028],
    [349.705958, -32.531833]
  ],
  // γ Sculptoris to β Sculptoris:
  [
    [349.705958, -32.531833],
    [353.242458, -37.818361]
  ]
], w6 = [
  [
    [346.680966, -24.825045],
    [359.110565, -24.804201],
    [26.458889, -24.872909],
    [26.350728, -39.372623],
    [351.692705, -39.312759],
    [351.683378, -36.312767],
    [346.727514, -36.324974],
    [346.680966, -24.825045]
  ]
], G6 = a("Sculptor", "the sculptor", q6, U6, w6), j6 = {
  ra: 280.171623,
  dec: -9.888625
}, F6 = [
  // α Scuti to γ Scuti:
  [
    [278.801833, -8.243306],
    [277.299375, -14.565806]
  ],
  // γ Scuti to δ Scuti:
  [
    [277.299375, -14.565806],
    [280.568417, -9.052556]
  ],
  // δ Scuti to β Scuti:
  [
    [280.568417, -9.052556],
    [281.793667, -4.747833]
  ],
  // β Scuti to α Scuti:
  [
    [281.793667, -4.747833],
    [278.801833, -8.243306]
  ]
], k6 = [
  [
    [275.549526, -15.943572],
    [284.79372, -15.832812],
    [284.744054, -11.866436],
    [284.647293, -3.833677],
    [280.398188, -3.884223],
    [275.399123, -3.944483],
    [275.549526, -15.943572]
  ]
], N6 = a("Scutum", "shield (of Sobieski)", j6, F6, k6), R6 = {
  ra: 236.706764,
  dec: 8.226139
}, I6 = [
  // μ Serpentis to ε Serpentis:
  [
    [237.405292, -3.430139],
    [237.703708, 4.477583]
  ],
  // ε Serpentis to Unukalhai:
  [
    [237.703708, 4.477583],
    [236.066976, 6.425629]
  ],
  // Unukalhai to δ Serpentis:
  [
    [236.066976, 6.425629],
    [233.700417, 10.539167]
  ],
  // δ Serpentis to β Serpentis:
  [
    [233.700417, 10.539167],
    [236.546708, 15.421917]
  ],
  // β Serpentis to ι Serpentis:
  [
    [236.546708, 15.421917],
    [235.387875, 19.6705]
  ],
  // ι Serpentis to Gudja:
  [
    [235.387875, 19.6705],
    [237.184903, 18.141564]
  ],
  // Gudja to γ Serpentis:
  [
    [237.184903, 18.141564],
    [239.112458, 15.664722]
  ],
  // γ Serpentis to β Serpentis:
  [
    [239.112458, 15.664722],
    [236.546708, 15.421917]
  ]
], W6 = [
  [
    [227.853012, -0.474289],
    [227.781486, 7.525393],
    [227.605491, 25.524611],
    [229.099516, 25.538057],
    [241.805735, 25.664141],
    [241.856575, 21.664411],
    [240.111007, 21.645968],
    [240.181074, 15.646335],
    [242.67663, 15.6728],
    [242.809668, 3.673514],
    [245.558595, 3.703381],
    [245.602627, -0.296377],
    [245.638389, -3.54618],
    [240.386954, -3.602587],
    [227.881951, -3.72416],
    [227.853012, -0.474289]
  ]
], z6 = {
  ra: 274.463214,
  dec: -6.079471
}, _6 = [
  // Alya to η Serpentis:
  [
    [284.054949, 4.203602],
    [275.328833, -2.897111]
  ],
  // η Serpentis to ξ Serpentis:
  [
    [275.328833, -2.897111],
    [264.396792, -15.398417]
  ]
], K6 = [
  [
    [275.350599, 0.055224],
    [275.314236, 3.055003],
    [277.939224, 3.086727],
    [277.921056, 4.586618],
    [275.296011, 4.554893],
    [275.27461, 6.304763],
    [281.458569, 6.379194],
    [284.525985, 6.415608],
    [284.576425, 2.165905],
    [280.326233, 2.115346],
    [280.350209, 0.115489],
    [280.398188, -3.884223],
    [275.399123, -3.944483],
    [275.549526, -15.943572],
    [265.80019, -16.061882],
    [259.297428, -16.13999],
    [259.22207, -10.140438],
    [265.47349, -10.06537],
    [265.494404, -11.731914],
    [266.7447, -11.716777],
    [266.723757, -10.050234],
    [271.223716, -9.995605],
    [271.149674, -3.996055],
    [269.149704, -4.020351],
    [269.101038, -0.020647],
    [275.350599, 0.055224]
  ]
], J6 = a("Serpens Caput", "the snake's head", R6, I6, W6), Q6 = a("Serpens Cauda", "the snake's tail", z6, _6, K6), Y6 = {
  ra: 154.112,
  dec: -0.504
}, X6 = [
  // α Sextantis to β Sextantis:
  [
    [151.9845833333, -0.3716388889],
    [157.5729166667, -0.6369722222]
  ]
], Z6 = [
  [
    [145.348906, -0.567059],
    [145.398417, 6.432767],
    [162.87602, 6.33773],
    [162.849712, -0.662221],
    [162.827139, -6.662179],
    [162.807914, -11.662143],
    [145.270272, -11.566781],
    [145.348906, -0.567059]
  ]
], a7 = a("Sextans", "the sextant", Y6, X6, Z6), e7 = {
  ra: 70.3996565,
  dec: 17.0555438
}, r7 = [
  // Tianguan to Aldebaran:
  [
    [84.411189, 21.142544],
    [68.980163, 16.509302]
  ],
  // Aldebaran to Chamukuy:
  [
    [68.980163, 16.509302],
    [67.165586, 15.870882]
  ],
  // Chamukuy to Prima Hyadum:
  [
    [67.165586, 15.870882],
    [64.948349, 15.627643]
  ],
  // Elnath to Ain:
  [
    [81.572971, 28.607452],
    [67.154163, 19.180435]
  ],
  // Ain to Secunda Hyadum:
  [
    [67.154163, 19.180435],
    [65.733719, 17.542514]
  ],
  // Secunda Hyadum to Pleione:
  [
    [65.733719, 17.542514],
    [57.296738, 24.13671]
  ],
  // Secunda Hyadum to Prima Hyadum:
  [
    [65.733719, 17.542514],
    [64.948349, 15.627643]
  ],
  // Prima Hyadum to λ Tauri:
  [
    [64.948349, 15.627643],
    [60.1700833333, 12.4903888889]
  ],
  // λ Tauri to ξ Tauri:
  [
    [60.1700833333, 12.4903888889],
    [51.7921666667, 9.7327777778]
  ]
], n7 = [
  [
    [50.836683, -1.302952],
    [50.852984, 0.446972],
    [50.946411, 10.363207],
    [51.037235, 19.446114],
    [52.290623, 19.434334],
    [52.426668, 31.100361],
    [69.486938, 30.921875],
    [69.476789, 30.25526],
    [73.235343, 30.212309],
    [73.212475, 28.71244],
    [90.228903, 28.509243],
    [90.221071, 28.009291],
    [90.144037, 22.843086],
    [87.393794, 22.876472],
    [87.326982, 18.043549],
    [88.327167, 18.031416],
    [88.25537, 12.531851],
    [85.755057, 12.562155],
    [85.793646, 15.56192],
    [81.792232, 15.610145],
    [81.798712, 16.110105],
    [76.295279, 16.175499],
    [76.288926, 15.675535],
    [71.034029, 15.736463],
    [70.85236, 0.237501],
    [55.352905, 0.403726],
    [55.335582, -1.346189],
    [50.836683, -1.302952]
  ]
], c7 = a("Taurus", "the bull", e7, r7, n7), u7 = {
  ra: 283.650222,
  dec: -47.997898
}, s7 = [
  // ε Telescopii to α Telescopii:
  [
    [272.807417, -45.954333],
    [276.743458, -45.968333]
  ],
  // α Telescopii to ζ Telescopii:
  [
    [276.743458, -45.968333],
    [277.20725, -49.070028]
  ]
], t7 = [
  [
    [307.458801, -56.588577],
    [307.169295, -45.09],
    [289.76964, -45.277565],
    [272.309017, -45.485973],
    [272.672253, -56.983772],
    [307.458801, -56.588577]
  ]
], o7 = a("Telescopium", "the telescope", u7, s7, t7), l7 = {
  ra: 30.328817,
  dec: 32.137849
}, i7 = [
  // Mothallahto β Trianguli:
  [
    [28.27045, 29.578826],
    [32.3855, 34.987389]
  ],
  // β Trianguli to γ Trianguli:
  [
    [32.3855, 34.987389],
    [34.3285, 33.847333]
  ],
  // γ Trianguli to Mothallah:
  [
    [34.3285, 33.847333],
    [28.27045, 29.578826]
  ]
], m7 = [
  [
    [26.744675, 25.626335],
    [26.76471, 28.626282],
    [22.86642, 28.645439],
    [22.897426, 33.64537],
    [22.910835, 35.645336],
    [31.85425, 35.597138],
    [31.871091, 37.347084],
    [39.679341, 37.293156],
    [40.434659, 37.287388],
    [40.402383, 34.537514],
    [42.666468, 34.519676],
    [42.62838, 31.186502],
    [38.103194, 31.221315],
    [38.070149, 27.804764],
    [30.530616, 27.855019],
    [30.513711, 25.60507],
    [26.744675, 25.626335]
  ]
], d7 = a("Triangulum", "the triangle", l7, i7, m7), b7 = {
  ra: 240.8936041,
  dec: -67.7123117
}, h7 = [
  // Atria to β Trianguli Australis:
  [
    [252.166229, -69.027712],
    [238.786708, -63.42975]
  ],
  // β Trianguli Australis to γ Trianguli Australis:
  [
    [238.786708, -63.42975],
    [229.727875, -68.679472]
  ],
  // γ Trianguli Australis to Atria:
  [
    [229.727875, -68.679472],
    [252.166229, -69.027712]
  ]
], $7 = [
  [
    [224.166441, -70.511543],
    [224.003634, -68.012207],
    [226.557126, -67.990929],
    [226.353535, -64.075127],
    [230.166579, -64.041565],
    [230.05457, -61.458748],
    [232.589765, -61.435307],
    [232.549868, -60.435493],
    [249.034681, -60.264458],
    [249.08163, -61.264195],
    [251.537847, -61.236458],
    [251.676321, -63.818996],
    [254.195137, -63.790093],
    [254.283515, -65.206253],
    [255.542393, -65.191643],
    [255.724983, -67.690582],
    [258.242482, -67.661087],
    [258.470679, -70.159744],
    [224.166441, -70.511543]
  ]
], p7 = a("Triangulum Australe", "the southern triangle", b7, h7, $7), g7 = {
  ra: 350.4512756,
  dec: -64.5226708
}, C7 = [
  // α Tucanae to γ Tucanae:
  [
    [334.62575, -60.2595],
    [349.357542, -58.235917]
  ],
  // γ Tucanae to β¹ Tucanae:
  [
    [349.357542, -58.235917],
    [7.885667, -62.958083]
  ],
  // β¹ Tucanae to ζ Tucanae:
  [
    [7.885667, -62.958083],
    [5.007958, -64.877611]
  ],
  // ζ Tucanae to ε Tucanae:
  [
    [5.007958, -64.877611],
    [359.978792, -65.577083]
  ],
  // ε Tucanae to δ Tucanae:
  [
    [359.978792, -65.577083],
    [336.832792, -64.966389]
  ],
  // δ Tucanae to α Tucanae:
  [
    [336.832792, -64.966389],
    [334.62575, -60.2595]
  ]
], T7 = [
  [
    [351.997833, -74.312462],
    [1.566297, -74.303963],
    [12.332438, -74.318573],
    [12.295415, -75.318527],
    [20.65405, -75.347221],
    [21.206229, -57.848415],
    [351.778394, -57.812679],
    [351.768522, -56.312687],
    [332.113695, -56.390835],
    [332.398568, -66.889992],
    [351.861391, -66.812599],
    [351.997833, -74.312462]
  ]
], f7 = a("Tucana", "the tucan", g7, C7, T7), y7 = {
  ra: 178.745522,
  dec: 54.244607
}, v7 = [
  // Alkaid to Mizar:
  [
    [206.885157, 49.313267],
    [200.981429, 54.925362]
  ],
  // Mizar to Alioth:
  [
    [200.981429, 54.925362],
    [193.50729, 55.959823]
  ],
  // Alioth to Megrez:
  [
    [193.50729, 55.959823],
    [183.856503, 57.032615]
  ],
  // Megrez to Dubhe:
  [
    [183.856503, 57.032615],
    [165.931965, 61.751035]
  ],
  // Dubhe to Merak:
  [
    [165.931965, 61.751035],
    [165.460319, 56.382426]
  ],
  // Merak to Phecda:
  [
    [165.460319, 56.382426],
    [178.457679, 53.694758]
  ],
  // Megrez to Phecda:
  [
    [183.856503, 57.032615],
    [178.457679, 53.694758]
  ],
  // Phecda to Taiyangshou:
  [
    [178.457679, 53.694758],
    [176.512559, 47.779406]
  ],
  // Taiyangshou to Alula Borealis:
  [
    [176.512559, 47.779406],
    [169.619737, 33.094305]
  ],
  // Alula Borealis to Alula Australis:
  [
    [169.619737, 33.094305],
    [169.545423, 31.529161]
  ],
  // Taiyangshou to ψ Ursae Majoris:
  [
    [176.512559, 47.779406],
    [167.416083, 44.498556]
  ],
  // ψ Ursae Majoris to Tania Australis:
  [
    [167.416083, 44.498556],
    [155.58225, 41.499519]
  ],
  // Tania Australis to Tania Borealis:
  [
    [155.58225, 41.499519],
    [154.274095, 42.914356]
  ],
  // Dubhe to h Ursae Majoris:
  [
    [165.931965, 61.751035],
    [142.881542, 63.061806]
  ],
  // Merak to υ Ursae Majoris:
  [
    [165.460319, 56.382426],
    [147.748708, 59.039111]
  ],
  // υ Ursae Majoris to h Ursae Majoris:
  [
    [147.748708, 59.039111],
    [142.881542, 63.061806]
  ],
  // h Ursae Majoris to Muscida:
  [
    [142.881542, 63.061806],
    [127.566128, 60.71817]
  ],
  // υ Ursae Majoris to Muscida:
  [
    [147.748708, 59.039111],
    [127.566128, 60.71817]
  ],
  // υ Ursae Majoris to θ Ursae Majoris:
  [
    [147.748708, 59.039111],
    [143.218042, 51.678611]
  ],
  // θ Ursae Majoris to Alkaphrah:
  [
    [143.218042, 51.678611],
    [135.906365, 47.156525]
  ],
  // Alkaphrah to Talitha:
  [
    [135.906365, 47.156525],
    [134.80189, 48.041826]
  ]
], A7 = [
  [
    [145.709238, 41.431675],
    [139.51249, 41.478596],
    [139.590711, 46.478279],
    [128.440104, 46.577728],
    [128.799134, 59.575989],
    [122.129101, 59.643398],
    [123.086229, 73.138374],
    [140.615474, 72.974136],
    [171.96137, 72.8125],
    [171.849346, 65.812607],
    [181.579255, 65.803963],
    [181.58156, 63.303963],
    [203.550539, 63.359344],
    [203.573641, 62.359398],
    [217.045254, 62.441482],
    [217.251249, 54.942238],
    [211.584391, 54.903576],
    [211.698732, 47.903938],
    [203.795114, 47.859928],
    [203.742399, 52.359806],
    [182.818523, 52.304336],
    [182.826434, 44.304336],
    [181.591416, 44.303963],
    [181.594506, 33.303963],
    [181.595664, 28.303963],
    [179.608941, 28.304047],
    [166.693998, 28.325026],
    [166.714225, 33.324993],
    [163.489409, 33.335678],
    [163.523169, 39.335613],
    [154.359412, 39.377411],
    [154.378224, 41.377361],
    [145.709238, 41.431675]
  ]
], P7 = a("Ursa Major", "the greater bear", y7, v7, A7), S7 = {
  ra: 242.350231,
  dec: 76.957563
}, M7 = [
  // Polaris to Yildun:
  [
    [37.954561, 89.264109],
    [263.054126, 86.586462]
  ],
  // Yildun to ε Ursae Minoris:
  [
    [263.054126, 86.586462],
    [251.492333, 82.03725]
  ],
  // ε Ursae Minoris to ζ Ursae Minoris:
  [
    [251.492333, 82.03725],
    [236.014417, 77.7945]
  ],
  // ζ Ursae Minoris to Kochab:
  [
    [236.014417, 77.7945],
    [222.676357, 74.155504]
  ],
  // Kochab to Pherkad:
  [
    [222.676357, 74.155504],
    [230.18215, 71.834017]
  ],
  // Pherkad to η Ursae Minoris:
  [
    [230.18215, 71.834017],
    [244.377083, 75.754694]
  ],
  // η Ursae Minoris to ζ Ursae Minoris:
  [
    [244.377083, 75.754694],
    [236.014417, 77.7945]
  ]
], L7 = [
  [
    [195.820613, 76.328911],
    [196.097474, 69.329361],
    [210.650811, 69.399117],
    [210.820555, 65.399651],
    [235.329565, 65.602348],
    [235.05063, 69.600944],
    [247.841062, 69.738304],
    [247.220707, 74.734787],
    [261.536637, 74.903313],
    [260.217905, 79.895348],
    [267.65602, 79.985748],
    [261.72223, 85.94957],
    [308.72097, 86.465622],
    [308.331355, 86.63063],
    [343.510666, 86.836891],
    [339.260988, 88.663887],
    [135.832471, 87.568916],
    [130.40275, 86.097542],
    [213.022957, 85.930809],
    [216.782856, 79.444984],
    [203.80919, 79.36293],
    [204.157019, 76.363815],
    [195.820613, 76.328911]
  ]
], x7 = a("Ursa Minor", "the lesser bear", S7, M7, L7), H7 = {
  ra: 140.891294,
  dec: -47.922385
}, D7 = [
  // Alsephina to γ¹ Velorum:
  [
    [131.175944, -54.708819],
    [122.372083, -47.345833]
  ],
  // γ¹ Velorum to Suhail:
  [
    [122.372083, -47.345833],
    [136.998993, -43.432589]
  ],
  // Suhail to ψ Velorum:
  [
    [136.998993, -43.432589],
    [142.675458, -40.466889]
  ],
  // ψ Velorum to q Velorum:
  [
    [142.675458, -40.466889],
    [153.684458, -42.122056]
  ],
  // q Velorum to μ Velorum:
  [
    [153.684458, -42.122056],
    [161.692167, -49.420139]
  ],
  // μ Velorum to φ Velorum:
  [
    [161.692167, -49.420139],
    [149.215625, -54.567806]
  ],
  // φ Velorum to Markeb:
  [
    [149.215625, -54.567806],
    [140.528407, -55.010667]
  ],
  // Markeb to Alsephina:
  [
    [140.528407, -55.010667],
    [131.175944, -54.708819]
  ]
], V7 = [
  [
    [166.337256, -57.174442],
    [166.456505, -40.424622],
    [141.734061, -40.291874],
    [141.771599, -37.292015],
    [126.677799, -37.160038],
    [126.572313, -43.409519],
    [121.038279, -43.353504],
    [120.861698, -51.102585],
    [123.381129, -51.128529],
    [123.320116, -53.37822],
    [127.609291, -53.420677],
    [127.567119, -54.920471],
    [133.380174, -54.97422],
    [133.323655, -56.973972],
    [166.337256, -57.174442]
  ]
], O7 = a("Vela", "the sails", H7, D7, V7), B7 = {
  ra: 192.537888,
  dec: 2.844354
}, E7 = [
  // Spica to θ Virginis:
  [
    [201.298247, -11.161319],
    [197.487542, -5.538917]
  ],
  // θ Virginis to Porrima:
  [
    [197.487542, -5.538917],
    [190.415181, -1.449373]
  ],
  // Porrima to Heze:
  [
    [190.415181, -1.449373],
    [203.6733, -0.59582]
  ],
  // Porrima to Minelauva:
  [
    [190.415181, -1.449373],
    [193.900869, 3.39747]
  ],
  // Minelauva to Vindemiatrix:
  [
    [193.900869, 3.39747],
    [195.544157, 10.959149]
  ],
  // Porrima to Zaniah:
  [
    [190.415181, -1.449373],
    [184.976476, -0.666793]
  ],
  // Zaniah to ο Virginis:
  [
    [184.976476, -0.666793],
    [181.302792, 8.732833]
  ],
  // ο Virginis to ν Virginis:
  [
    [181.302792, 8.732833],
    [176.464875, 6.529806]
  ],
  // ν Virginis to Zavijava:
  [
    [176.464875, 6.529806],
    [177.673826, 1.764717]
  ],
  // Zavijava to Zaniah:
  [
    [177.673826, 1.764717],
    [184.976476, -0.666793]
  ],
  // Heze to τ Virginis:
  [
    [203.6733, -0.59582],
    [210.411583, 1.544583]
  ],
  // Heze to Syrma:
  [
    [203.6733, -0.59582],
    [214.003623, -6.000545]
  ],
  // Syrma to μ Virginis:
  [
    [214.003623, -6.000545],
    [220.764833, -5.657417]
  ]
], q7 = [
  [
    [174.350525, -0.691698],
    [174.365688, 10.308291],
    [179.603735, 10.304049],
    [179.604535, 13.304049],
    [194.062027, 13.322513],
    [194.059066, 14.322509],
    [204.02893, 14.360494],
    [204.063849, 7.360577],
    [227.781486, 7.525393],
    [227.853012, -0.474289],
    [221.603093, -0.526939],
    [221.667108, -8.526685],
    [215.408506, -8.573134],
    [215.513091, -22.572775],
    [194.16687, -22.677342],
    [194.133052, -11.677388],
    [179.09676, -11.695797],
    [179.098606, -6.695797],
    [174.342299, -6.691692],
    [174.350525, -0.691698]
  ]
], U7 = a("Virgo", "the virgin (or maiden)", B7, E7, q7);
// @license        Copyright © 2021-2024 observerly
const w7 = {
  ra: 118.701768,
  dec: -68.203183
}, G7 = [
  // α Volantis to β Volantis:
  [
    [135.611667, -66.395833],
    [126.434375, -66.136528]
  ],
  // β Volantis to ε Volantis:
  [
    [126.434375, -66.136528],
    [121.982667, -68.617139]
  ],
  // ε Volantis to δ Volantis:
  [
    [121.982667, -68.617139],
    [109.207625, -67.957167]
  ],
  // δ Volantis to γ¹ Volantis:
  [
    [109.207625, -67.957167],
    [107.176417, -70.497333]
  ],
  // γ¹ Volantis to ε Volantis:
  [
    [107.176417, -70.497333],
    [121.982667, -68.617139]
  ],
  // α Volantis to ε Volantis:
  [
    [135.611667, -66.395833],
    [121.982667, -68.617139]
  ]
], j7 = [
  [
    [98.937249, -64.107025],
    [98.454423, -70.104134],
    [97.77071, -75.100037],
    [114.214704, -75.289917],
    [135.243687, -75.495468],
    [136.094727, -64.499039],
    [102.703314, -64.151878],
    [98.937249, -64.107025]
  ]
], F7 = a("Volans", "the flying fish", w7, G7, j7), k7 = {
  ra: 304.49975,
  dec: 24.767073
}, N7 = [
  // Anser to 13 Vulpeculae:
  [
    [292.176375, 24.664903],
    [298.365399, 24.079613]
  ]
], R7 = [
  [
    [284.339133, 21.247835],
    [284.277162, 25.664141],
    [290.161314, 25.732574],
    [290.132646, 27.732408],
    [296.272201, 27.801174],
    [296.250944, 29.301058],
    [315.072584, 29.487139],
    [315.083915, 28.487188],
    [322.620164, 28.548054],
    [322.66202, 24.04821],
    [320.1517, 24.028936],
    [320.188409, 20.029081],
    [317.178783, 20.004641],
    [309.907665, 19.939997],
    [309.896937, 20.939947],
    [305.134049, 20.8937],
    [305.125409, 21.643656],
    [298.860255, 21.578733],
    [298.885689, 19.495539],
    [290.121288, 19.398298],
    [290.096311, 21.314816],
    [284.339133, 21.247835]
  ]
], I7 = a("Vulpecula", "the fox", k7, N7, R7), W7 = /* @__PURE__ */ new Map([
  [
    "Andromeda",
    {
      name: "Andromeda",
      meaning: "The Chained Princess",
      abbreviation: "And",
      feature: p
    }
  ],
  [
    "Antila",
    {
      name: "Antila",
      meaning: "The Air Pump",
      abbreviation: "Ant",
      feature: f
    }
  ],
  [
    "Apus",
    {
      name: "Apus",
      meaning: "The Bird of Paradise",
      abbreviation: "Aps",
      feature: P
    }
  ],
  [
    "Aquarius",
    {
      name: "Aquarius",
      meaning: "The Water Bearer",
      abbreviation: "Aqr",
      feature: x
    }
  ],
  [
    "Aquila",
    {
      name: "Aquila",
      meaning: "The Eagle",
      abbreviation: "Aql",
      feature: O
    }
  ],
  [
    "Ara",
    {
      name: "Ara",
      meaning: "The Altar",
      abbreviation: "Ara",
      feature: U
    }
  ],
  [
    "Aries",
    {
      name: "Aries",
      meaning: "The Ram",
      abbreviation: "Ari",
      feature: F
    }
  ],
  [
    "Auriga",
    {
      name: "Auriga",
      meaning: "The Charioteer",
      abbreviation: "Aur",
      feature: I
    }
  ],
  [
    "Boötes",
    {
      name: "Boötes",
      meaning: "The Herdsman",
      abbreviation: "Boo",
      feature: K
    }
  ],
  [
    "Caelum",
    {
      name: "Caelum",
      meaning: "The Chisel",
      abbreviation: "Cae",
      feature: X
    }
  ],
  [
    "Camelopardalis",
    {
      name: "Camelopardalis",
      meaning: "The Giraffe",
      abbreviation: "Cam",
      feature: r3
    }
  ],
  [
    "Cancer",
    {
      name: "Cancer",
      meaning: "The Crab",
      abbreviation: "Cnc",
      feature: s3
    }
  ],
  [
    "Canes Venatici",
    {
      name: "Canes Venatici",
      meaning: "The Hunting Dogs",
      abbreviation: "CVn",
      feature: i3
    }
  ],
  [
    "Canis Major",
    {
      name: "Canis Major",
      meaning: "The Great Dog",
      abbreviation: "CMa",
      feature: h3
    }
  ],
  [
    "Canis Minor",
    {
      name: "Canis Minor",
      meaning: "The Lesser Dog",
      abbreviation: "CMi",
      feature: C3
    }
  ],
  [
    "Capricornus",
    {
      name: "Capricornus",
      meaning: "The Sea Goat",
      abbreviation: "Cap",
      feature: v3
    }
  ],
  [
    "Carina",
    {
      name: "Carina",
      meaning: "The Keel",
      abbreviation: "Car",
      feature: M3
    }
  ],
  [
    "Cassiopeia",
    {
      name: "Cassiopeia",
      meaning: "The Queen",
      abbreviation: "Cas",
      feature: D3
    }
  ],
  [
    "Centaurus",
    {
      name: "Centaurus",
      meaning: "The Centaur",
      abbreviation: "Cen",
      feature: E3
    }
  ],
  [
    "Cepheus",
    {
      name: "Cepheus",
      meaning: "The King",
      abbreviation: "Cep",
      feature: G3
    }
  ],
  [
    "Cetus",
    {
      name: "Cetus",
      meaning: "The Whale",
      abbreviation: "Cet",
      feature: N3
    }
  ],
  [
    "Chamaeleon",
    {
      name: "Chamaeleon",
      meaning: "The Chameleon",
      abbreviation: "Cha",
      feature: z3
    }
  ],
  [
    "Circinus",
    {
      name: "Circinus",
      meaning: "The Compasses",
      abbreviation: "Cir",
      feature: Q3
    }
  ],
  [
    "Columba",
    {
      name: "Columba",
      meaning: "The Dove",
      abbreviation: "Col",
      feature: a2
    }
  ],
  [
    "Coma Berenices",
    {
      name: "Coma Berenices",
      meaning: "Berenice's Hair",
      abbreviation: "Com",
      feature: c2
    }
  ],
  [
    "Corona Australis",
    {
      name: "Corona Australis",
      meaning: "The Southern Crown",
      abbreviation: "CrA",
      feature: o2
    }
  ],
  [
    "Corona Borealis",
    {
      name: "Corona Borealis",
      meaning: "The Northern Crown",
      abbreviation: "CrB",
      feature: d2
    }
  ],
  [
    "Corvus",
    {
      name: "Corvus",
      meaning: "The Crow",
      abbreviation: "Crv",
      feature: p2
    }
  ],
  [
    "Crater",
    {
      name: "Crater",
      meaning: "The Cup",
      abbreviation: "Crt",
      feature: f2
    }
  ],
  [
    "Crux",
    {
      name: "Crux",
      meaning: "The Southern Cross",
      abbreviation: "Cru",
      feature: P2
    }
  ],
  [
    "Cygnus",
    {
      name: "Cygnus",
      meaning: "The Swan",
      abbreviation: "Cyg",
      feature: x2
    }
  ],
  [
    "Delphinus",
    {
      name: "Delphinus",
      meaning: "The Dolphin",
      abbreviation: "Del",
      feature: O2
    }
  ],
  [
    "Dorado",
    {
      name: "Dorado",
      meaning: "The Swordfish",
      abbreviation: "Dor",
      feature: U2
    }
  ],
  [
    "Draco",
    {
      name: "Draco",
      meaning: "The Dragon",
      abbreviation: "Dra",
      feature: F2
    }
  ],
  [
    "Equuleus",
    {
      name: "Equuleus",
      meaning: "The Little Horse",
      abbreviation: "Equ",
      feature: I2
    }
  ],
  [
    "Eridanus",
    {
      name: "Eridanus",
      meaning: "The River",
      abbreviation: "Eri",
      feature: K2
    }
  ],
  [
    "Fornax",
    {
      name: "Fornax",
      meaning: "The Furnace",
      abbreviation: "For",
      feature: X2
    }
  ],
  [
    "Gemini",
    {
      name: "Gemini",
      meaning: "The Twins",
      abbreviation: "Gem",
      feature: r1
    }
  ],
  [
    "Grus",
    {
      name: "Grus",
      meaning: "The Crane",
      abbreviation: "Gru",
      feature: s1
    }
  ],
  [
    "Hercules",
    {
      name: "Hercules",
      meaning: "The Hero",
      abbreviation: "Her",
      feature: i1
    }
  ],
  [
    "Horologium",
    {
      name: "Horologium",
      meaning: "The Pendulum Clock",
      abbreviation: "Hor",
      feature: h1
    }
  ],
  [
    "Hydra",
    {
      name: "Hydra",
      meaning: "The Water Snake",
      abbreviation: "Hya",
      feature: C1
    }
  ],
  [
    "Hydrus",
    {
      name: "Hydrus",
      meaning: "The Water Snake",
      abbreviation: "Hyi",
      feature: v1
    }
  ],
  [
    "Indus",
    {
      name: "Indus",
      meaning: "The Indian",
      abbreviation: "Ind",
      feature: M1
    }
  ],
  [
    "Lacerta",
    {
      name: "Lacerta",
      meaning: "The Lizard",
      abbreviation: "Lac",
      feature: D1
    }
  ],
  [
    "Leo",
    {
      name: "Leo",
      meaning: "The Lion",
      abbreviation: "Leo",
      feature: E1
    }
  ],
  [
    "Leo Minor",
    {
      name: "Leo Minor",
      meaning: "The Lesser Lion",
      abbreviation: "LMi",
      feature: G1
    }
  ],
  [
    "Lepus",
    {
      name: "Lepus",
      meaning: "The Hare",
      abbreviation: "Lep",
      feature: N1
    }
  ],
  [
    "Libra",
    {
      name: "Libra",
      meaning: "The Scales",
      abbreviation: "Lib",
      feature: z1
    }
  ],
  [
    "Lupus",
    {
      name: "Lupus",
      meaning: "The Wolf",
      abbreviation: "Lup",
      feature: Q1
    }
  ],
  [
    "Lynx",
    {
      name: "Lynx",
      meaning: "The Lynx",
      abbreviation: "Lyn",
      feature: a5
    }
  ],
  [
    "Lyra",
    {
      name: "Lyra",
      meaning: "The Lyre",
      abbreviation: "Lyr",
      feature: c5
    }
  ],
  [
    "Mensa",
    {
      name: "Mensa",
      meaning: "The Table Mountain",
      abbreviation: "Men",
      feature: o5
    }
  ],
  [
    "Microscopium",
    {
      name: "Microscopium",
      meaning: "The Microscope",
      abbreviation: "Mic",
      feature: d5
    }
  ],
  [
    "Monoceros",
    {
      name: "Monoceros",
      meaning: "The Unicorn",
      abbreviation: "Mon",
      feature: p5
    }
  ],
  [
    "Musca",
    {
      name: "Musca",
      meaning: "The Fly",
      abbreviation: "Mus",
      feature: f5
    }
  ],
  [
    "Norma",
    {
      name: "Norma",
      meaning: "The Carpenter's Square",
      abbreviation: "Nor",
      feature: P5
    }
  ],
  [
    "Octans",
    {
      name: "Octans",
      meaning: "The Octant",
      abbreviation: "Oct",
      feature: x5
    }
  ],
  [
    "Ophiuchus",
    {
      name: "Ophiuchus",
      meaning: "The Serpent Bearer",
      abbreviation: "Oph",
      feature: O5
    }
  ],
  [
    "Orion",
    {
      name: "Orion",
      meaning: "Orion the Hunter",
      abbreviation: "Ori",
      feature: U5
    }
  ],
  [
    "Pavo",
    {
      name: "Pavo",
      meaning: "The Peacock",
      abbreviation: "Pav",
      feature: F5
    }
  ],
  [
    "Pegasus",
    {
      name: "Pegasus",
      meaning: "The Winged Horse",
      abbreviation: "Peg",
      feature: I5
    }
  ],
  [
    "Perseus",
    {
      name: "Perseus",
      meaning: "Perseus",
      abbreviation: "Per",
      feature: K5
    }
  ],
  [
    "Phoenix",
    {
      name: "Phoenix",
      meaning: "The Phoenix",
      abbreviation: "Phe",
      feature: X5
    }
  ],
  [
    "Pictor",
    {
      name: "Pictor",
      meaning: "The Painter's Easel",
      abbreviation: "Pic",
      feature: r6
    }
  ],
  [
    "Pisces",
    {
      name: "Pisces",
      meaning: "The Fishes",
      abbreviation: "Psc",
      feature: s6
    }
  ],
  [
    "Piscis Austrinus",
    {
      name: "Piscis Austrinus",
      meaning: "The Southern Fish",
      abbreviation: "PsA",
      feature: i6
    }
  ],
  [
    "Puppis",
    {
      name: "Puppis",
      meaning: "The Poop Deck",
      abbreviation: "Pup",
      feature: h6
    }
  ],
  [
    "Pyxis",
    {
      name: "Pyxis",
      meaning: "The Compass",
      abbreviation: "Pyx",
      feature: C6
    }
  ],
  [
    "Reticulum",
    {
      name: "Reticulum",
      meaning: "The Reticle",
      abbreviation: "Ret",
      feature: v6
    }
  ],
  [
    "Sagitta",
    {
      name: "Sagitta",
      meaning: "The Arrow",
      abbreviation: "Sge",
      feature: M6
    }
  ],
  [
    "Sagittarius",
    {
      name: "Sagittarius",
      meaning: "The Archer",
      abbreviation: "Sgr",
      feature: D6
    }
  ],
  [
    "Scorpius",
    {
      name: "Scorpius",
      meaning: "The Scorpion",
      abbreviation: "Sco",
      feature: E6
    }
  ],
  [
    "Sculptor",
    {
      name: "Sculptor",
      meaning: "The Sculptor's Studio",
      abbreviation: "Scl",
      feature: G6
    }
  ],
  [
    "Scutum",
    {
      name: "Scutum",
      meaning: "The Shield",
      abbreviation: "Sct",
      feature: N6
    }
  ],
  [
    "Serpens Caput",
    {
      name: "Serpens Caput",
      meaning: "The Serpent's Head",
      abbreviation: "SerCap",
      feature: J6
    }
  ],
  [
    "Serpens Cauda",
    {
      name: "Serpens Cauda",
      meaning: "The Serpent's Tail",
      abbreviation: "SerCad",
      feature: Q6
    }
  ],
  [
    "Sextans",
    {
      name: "Sextans",
      meaning: "The Sextant",
      abbreviation: "Sex",
      feature: a7
    }
  ],
  [
    "Taurus",
    {
      name: "Taurus",
      meaning: "The Bull",
      abbreviation: "Tau",
      feature: c7
    }
  ],
  [
    "Telescopium",
    {
      name: "Telescopium",
      meaning: "The Telescope",
      abbreviation: "Tel",
      feature: o7
    }
  ],
  [
    "Triangulum",
    {
      name: "Triangulum",
      meaning: "The Triangle",
      abbreviation: "Tri",
      feature: d7
    }
  ],
  [
    "Triangulum Australe",
    {
      name: "Triangulum Australe",
      meaning: "The Southern Triangle",
      abbreviation: "TrA",
      feature: p7
    }
  ],
  [
    "Tucana",
    {
      name: "Tucana",
      meaning: "The Toucan",
      abbreviation: "Tuc",
      feature: f7
    }
  ],
  [
    "Ursa Major",
    {
      name: "Ursa Major",
      meaning: "The Great Bear",
      abbreviation: "UMa",
      feature: P7
    }
  ],
  [
    "Ursa Minor",
    {
      name: "Ursa Minor",
      meaning: "The Little Bear",
      abbreviation: "UMi",
      feature: x7
    }
  ],
  [
    "Vela",
    {
      name: "Vela",
      meaning: "The Sails",
      abbreviation: "Vel",
      feature: O7
    }
  ],
  [
    "Virgo",
    {
      name: "Virgo",
      meaning: "The Virgin",
      abbreviation: "Vir",
      feature: U7
    }
  ],
  [
    "Volans",
    {
      name: "Volans",
      meaning: "The Flying Fish",
      abbreviation: "Vol",
      feature: F7
    }
  ],
  [
    "Vulpecula",
    {
      name: "Vulpecula",
      meaning: "The Little Fox",
      abbreviation: "Vul",
      feature: I7
    }
  ]
]), K7 = (e) => {
  const c = l(new Date(1875, 0, 0), e), s = e.ra + c.ra % 360, t = e.dec + c.dec, u = s / 15, r = d.find((n) => !(t < n.decl || u < n.ral || u >= n.rau));
  if (m(r))
    return r ? W7.get(r.name) : void 0;
};
export {
  W7 as constellations,
  K7 as getConstellation
};
