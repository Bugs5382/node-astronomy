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
import { ISunProperties } from "@/astronomicalObject/sun/types";

/**
 * Constructor input for {@link SunTimes}.
 *
 * @since 0.1.0
 */
export interface ISunTimesProperties extends ISunProperties {
  /**
   * Observer latitude in decimal degrees (positive north, negative south).
   *
   * @since 0.1.0
   */
  latitude: number;
  /**
   * Observer longitude in decimal degrees (positive east, negative west).
   *
   * @since 0.1.0
   */
  longitude: number;
  /**
   * Sampling step in seconds for the internal twilight-band scan.
   *
   * Lowering this slows construction but does not improve accuracy past
   * `1` (the band-edge resolution is already ±`stepSeconds` seconds, so
   * `1` is the precision floor). Raise it to e.g. `60` if you only need
   * minute-level boundaries and want a much faster constructor.
   *
   * @default 1
   * @since 0.2.0
   */
  stepSeconds?: number;
  /**
   * IANA timezone name used to anchor the snapshot's civil day
   * (e.g. `"America/New_York"`). The snapshot covers the local civil day
   * that contains `time`; without this, the day is anchored to UTC.
   *
   * @default "UTC"
   * @since 0.1.0
   */
  timezone?: string;
}
