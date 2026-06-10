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
 * Named lunar phases.
 *
 * Re-exported as our own const so consumers don't have to depend on
 * `@observerly/astrometry` types directly. Values match astrometry's
 * `Phases` strings 1:1, so the cast in `Moon.phase()` is safe.
 *
 * @since 0.2.0
 */
export const MoonPhase = {
  FirstQuarter: "First Quarter",
  Full: "Full",
  Invalid: "Invalid",
  LastQuarter: "Last Quarter",
  New: "New",
  WaningCrescent: "Waning Crescent",
  WaningGibbous: "Waning Gibbous",
  WaxingCrescent: "Waxing Crescent",
  WaxingGibbous: "Waxing Gibbous",
} as const;

export type MoonPhase = (typeof MoonPhase)[keyof typeof MoonPhase];
