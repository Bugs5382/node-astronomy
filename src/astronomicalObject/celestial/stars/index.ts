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
import { Celestial } from "@/astronomicalObject/celestial";
import {
  NAMED_STARS,
  NamedStar,
} from "@/astronomicalObject/celestial/stars/data";
import { IStarProperties } from "@/astronomicalObject/celestial/stars/properties";
import {
  IStar,
  IStarCatalogEntry,
  IStarEquatorialCoordinate,
} from "@/astronomicalObject/celestial/stars/types";

/**
 * Snapshot of one named bright star. Observer-free — see
 * {@link StarTimes} for rise/set/alt-az.
 *
 * @since 0.2.0
 * @example
 * ```ts
 * const polaris = new Star({ star: "Polaris" });
 * polaris.equatorialCoordinate(); // { ra ≈ 38°, dec ≈ 89° }
 * polaris.magnitude();            // 1.98
 * polaris.constellation();        // "Ursa Minor"
 * ```
 */
export class Star extends Celestial implements IStar {
  /** Underlying catalog entry. */
  readonly catalogEntry: IStarCatalogEntry;
  /** Common name. */
  readonly starName: NamedStar;

  /**
   * Build a Star snapshot.
   *
   * @since 0.2.0
   * @param properties - `star` (required) and optional `time`.
   */
  constructor(properties: IStarProperties) {
    super({ name: properties.star, time: properties.time });
    const entry = NAMED_STARS[properties.star];
    if (!entry) {
      throw new Error(`Unknown star: ${String(properties.star)}`);
    }
    this.starName = properties.star;
    this.catalogEntry = entry;
  }

  /**
   * Bayer designation (e.g. `"α UMi"` for Polaris).
   *
   * @since 0.2.0
   */
  bayer(): string {
    return this.catalogEntry.bayer;
  }

  /**
   * The IAU constellation the star belongs to.
   *
   * @since 0.2.0
   */
  constellation(): string {
    return this.catalogEntry.constellation;
  }

  /**
   * J2000 equatorial coordinate. Note: this does NOT apply proper motion
   * — at the arcsecond level over decades, named-star coordinates drift
   * very slightly. Sufficient for "is it above the horizon" queries
   * across a typical app's lifetime.
   *
   * @since 0.2.0
   */
  equatorialCoordinate(): IStarEquatorialCoordinate {
    return {
      dec: this.catalogEntry.decDeg,
      ra: this.catalogEntry.raDeg,
    };
  }

  /**
   * Hipparcos catalog number.
   *
   * @since 0.2.0
   */
  hip(): number {
    return this.catalogEntry.hip;
  }

  /**
   * Apparent visual magnitude.
   *
   * @since 0.2.0
   */
  magnitude(): number {
    return this.catalogEntry.magnitude;
  }

  /**
   * Spectral classification (e.g. `"A0V"` for Vega).
   *
   * @since 0.2.0
   */
  spectralClass(): string {
    return this.catalogEntry.spectralClass;
  }
}

/**
 * Look up a single named star's catalog entry.
 *
 * @since 0.2.0
 */
export function getNamedStar(name: NamedStar): IStarCatalogEntry {
  const entry = NAMED_STARS[name];
  if (!entry) throw new Error(`Unknown star: ${String(name)}`);
  return entry;
}

/**
 * List every supported named star (catalog keys).
 *
 * @since 0.2.0
 */
export function listNamedStars(): NamedStar[] {
  return Object.keys(NAMED_STARS) as NamedStar[];
}

export default Star;
