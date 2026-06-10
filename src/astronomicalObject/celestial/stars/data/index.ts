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
import { IStarCatalogEntry } from "@/astronomicalObject/celestial/stars/types";

import rawData from "./named-stars.json" with { type: "json" };

/**
 * The curated named-stars catalog. Keys are common names (e.g.
 * `"Polaris"`, `"Sirius"`); values are full {@link IStarCatalogEntry}
 * records with J2000 RA/Dec, magnitude, spectral class, and IAU
 * constellation.
 *
 * @since 0.2.0
 */
export const NAMED_STARS = rawData as Record<string, IStarCatalogEntry>;

/**
 * Union of every supported star name. Use this as the parameter type
 * for {@link Star} and {@link StarTimes} constructors.
 *
 * @since 0.2.0
 */
export type NamedStar = keyof typeof rawData;
