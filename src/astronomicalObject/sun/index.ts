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
import AstronomicalObject from "@/astronomicalObject";
import { ISun, ISunProperties } from "@/astronomicalObject/sun/types";

/**
 * Snapshot of the sun bound to a single moment in time.
 *
 * `Sun` is the lightweight base for `SunTimes`. By itself it carries no
 * observer location and therefore exposes no rise/set or altitude data —
 * use `SunTimes` for those. The class extends `AstronomicalObject` so the
 * `name` and `time` fields follow the same convention as every other body
 * in the package.
 *
 * @since 0.1.0
 * @example
 * ```ts
 * const sun = new Sun({ time: new Date("1982-05-03T00:00:00Z") });
 * sun.time; // 1982-05-03T00:00:00.000Z
 * ```
 */
export class Sun extends AstronomicalObject implements ISun {
  /**
   * Build the Sun snapshot.
   *
   * @since 0.1.0
   * @param properties - Optional `time` (default: `new Date()`).
   */
  constructor(properties?: ISunProperties) {
    super("sun", properties);
  }
}

export default Sun;
