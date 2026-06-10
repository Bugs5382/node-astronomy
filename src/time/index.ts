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
import { ITimeOfInterest } from "@/time/properties";

/**
 * Time of Interest — the single instant every astronomical calculation in
 * this package is anchored to.
 *
 * The instant is captured **at construction time**, not at method-call
 * time. If `properties.time` is omitted, `new Date()` is sampled inside
 * the constructor and stored on `this.time` for the lifetime of the
 * instance. Reusing a `TimeOfInterest` (or any subclass like `Sun`,
 * `SunTimes`) much later in a long-running process will keep returning
 * results for the construction instant, not "now". For a fresh
 * computation against a fresh instant, construct a new instance.
 *
 * @since 0.1.0
 * @example
 * ```ts
 * const toi = new TimeOfInterest({ time: new Date("2026-04-30T22:00:00Z") });
 * toi.time; // 2026-04-30T22:00:00.000Z
 * ```
 */
export class TimeOfInterest implements ITimeOfInterest {
  /**
   * The captured instant for this snapshot. Always set in the
   * constructor; `!` here only suppresses the strict-init check —
   * the assignment is unconditional.
   *
   * @since 0.1.0
   */
  public time!: Date;

  /**
   * Build a TimeOfInterest. The `time` is captured *now*, not at the
   * first method call.
   *
   * @since 0.1.0
   * @param properties - Optional `time` (default: `new Date()` sampled at
   *   construction).
   */
  constructor(properties: ITimeOfInterest = {}) {
    this.time = properties.time ?? new Date();
  }
}

export default TimeOfInterest;
