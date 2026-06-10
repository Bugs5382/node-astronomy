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
 * Lunar event predicates and search.
 *
 * Vendored from `@observerly/astrometry`'s `moon.js` (Copyright ©
 * 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

import {
  getLunarIllumination,
  getLunarPhase,
  LUNAR_SYNODIC_MONTH,
} from "@/astrometry/moon/phase";

/**
 * UTC instant of the next full moon at or after `date`.
 *
 * @since 0.2.0
 */
export function getNextFullMoon(date: Date): Date {
  let cursor = new Date(new Date(date).setHours(0, 0, 0, 0));
  while (!isFullMoon(cursor)) {
    cursor = new Date(cursor.getTime() + 60 * 60 * 1000);
  }
  let scan = cursor.getTime() - 12 * 60 * 60 * 1000;
  const end = cursor.getTime() + 12 * 60 * 60 * 1000;
  let bestIllumination = Number.NEGATIVE_INFINITY;
  let best = cursor;
  let plateau = 0;
  while (scan <= end) {
    const sample = getLunarIllumination(new Date(scan));
    if (sample > bestIllumination) {
      bestIllumination = sample;
      best = new Date(scan);
      plateau = 0;
    } else {
      plateau += 1;
    }
    scan += 1e4;
    if (plateau > 100) break;
  }
  return best;
}

/**
 * UTC instant of the next new moon at or after `date`.
 *
 * Search strategy: hour-step until we land in the "New" phase window,
 * then minimise illumination over a 24-hour bracket around that hit.
 *
 * @since 0.2.0
 */
export function getNextNewMoon(date: Date): Date {
  let cursor = new Date(new Date(date).setHours(0, 0, 0, 0));
  while (!isNewMoon(cursor)) {
    cursor = new Date(cursor.getTime() + 60 * 60 * 1000);
  }
  let scan = cursor.getTime() - 12 * 60 * 60 * 1000;
  const end = cursor.getTime() + 12 * 60 * 60 * 1000;
  let bestIllumination = Number.POSITIVE_INFINITY;
  let best = cursor;
  let plateau = 0;
  while (scan <= end) {
    const sample = getLunarIllumination(new Date(scan));
    if (sample < bestIllumination) {
      bestIllumination = sample;
      best = new Date(scan);
      plateau = 0;
    } else {
      plateau += 1;
    }
    scan += 1e4;
    if (plateau > 100) break;
  }
  return best;
}

/**
 * Whether `date` is a "blue moon" — a second full moon falling within
 * the same calendar month as a previous one.
 *
 * Mirrors astrometry's heuristic: the moon must already be Full *and*
 * fall on day 29-31, with the additional time-of-day check that gates
 * day-29 cases against `(synodic - 29) days` from the start of the
 * month.
 *
 * @since 0.2.0
 */
export function isBlueMoon(date: Date): boolean {
  const day = date.getDate();
  const dayThresholdMs = (LUNAR_SYNODIC_MONTH - 29) * 24 * 60 * 60 * 1000;
  const fractionalMs =
    date.getHours() * 60 * 60 * 1000 +
    date.getMinutes() * 60 * 1000 +
    date.getSeconds() * 1000 +
    date.getMilliseconds();
  if (
    (day !== 29 && day !== 30 && day !== 31) ||
    (day === 29 && fractionalMs < dayThresholdMs)
  ) {
    return false;
  }
  return isFullMoon(date);
}

/**
 * Whether `date` falls inside the "Full" phase window.
 *
 * @since 0.2.0
 */
export function isFullMoon(date: Date): boolean {
  return getLunarPhase(date) === "Full";
}

/**
 * Whether `date` falls inside the "New" phase window.
 *
 * @since 0.2.0
 */
export function isNewMoon(date: Date): boolean {
  return getLunarPhase(date) === "New";
}
