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
/**
 * Public type surface for the constellation data layer.
 *
 * @since 0.2.0
 */

import type { FeatureCollection } from "geojson";

/**
 * One constellation's static data (name, abbreviation, English meaning,
 * polygon FeatureCollection).
 *
 * @since 0.2.0
 */
export interface Constellation {
  abbreviation: string;
  feature: FeatureCollection;
  meaning: string;
  name: ConstellationName;
}

/**
 * The 88 IAU constellation names (canonical English/Latin spellings).
 * Single source of truth — both the data Map and downstream code key
 * off this union.
 *
 * @since 0.2.0
 */
export type ConstellationName =
  | "Andromeda"
  | "Antila"
  | "Apus"
  | "Aquarius"
  | "Aquila"
  | "Ara"
  | "Aries"
  | "Auriga"
  | "Boötes"
  | "Caelum"
  | "Camelopardalis"
  | "Cancer"
  | "Canes Venatici"
  | "Canis Major"
  | "Canis Minor"
  | "Capricornus"
  | "Carina"
  | "Cassiopeia"
  | "Centaurus"
  | "Cepheus"
  | "Cetus"
  | "Chamaeleon"
  | "Circinus"
  | "Columba"
  | "Coma Berenices"
  | "Corona Australis"
  | "Corona Borealis"
  | "Corvus"
  | "Crater"
  | "Crux"
  | "Cygnus"
  | "Delphinus"
  | "Dorado"
  | "Draco"
  | "Equuleus"
  | "Eridanus"
  | "Fornax"
  | "Gemini"
  | "Grus"
  | "Hercules"
  | "Horologium"
  | "Hydra"
  | "Hydrus"
  | "Indus"
  | "Lacerta"
  | "Leo"
  | "Leo Minor"
  | "Lepus"
  | "Libra"
  | "Lupus"
  | "Lynx"
  | "Lyra"
  | "Mensa"
  | "Microscopium"
  | "Monoceros"
  | "Musca"
  | "Norma"
  | "Octans"
  | "Ophiuchus"
  | "Orion"
  | "Pavo"
  | "Pegasus"
  | "Perseus"
  | "Phoenix"
  | "Pictor"
  | "Pisces"
  | "Piscis Austrinus"
  | "Puppis"
  | "Pyxis"
  | "Reticulum"
  | "Sagitta"
  | "Sagittarius"
  | "Scorpius"
  | "Sculptor"
  | "Scutum"
  | "Serpens"
  | "Sextans"
  | "Taurus"
  | "Telescopium"
  | "Triangulum"
  | "Triangulum Australe"
  | "Tucana"
  | "Ursa Major"
  | "Ursa Minor"
  | "Vela"
  | "Virgo"
  | "Volans"
  | "Vulpecula";
