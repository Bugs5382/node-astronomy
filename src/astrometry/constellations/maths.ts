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
 * Geodesic interpolation helpers used by the constellation polygon
 * builder.
 *
 * Vendored from `@observerly/astrometry`'s `maths.js` (Copyright ©
 * 2021-2024 observerly, MIT licensed). See NOTICE.
 *
 * @since 0.2.0
 */

type Coord = readonly [number, number];

/**
 * Linearly interpolate between two 2-D coordinates with at most
 * `step`-degree spacing.
 *
 * @since 0.2.0
 */
export function interpolate(
  from: Coord,
  to: Coord,
  step: number,
): [number, number][] {
  const out: [number, number][] = [];
  const [x0, y0] = from;
  const [x1, y1] = to;
  const distance = Math.hypot(x1 - x0, y1 - y0);
  const steps = Math.ceil(distance / step);
  for (let index = 0; index <= steps; index++) {
    const t = index / steps;
    out.push([x0 + t * (x1 - x0), y0 + t * (y1 - y0)]);
  }
  return out;
}

/**
 * Geodesic interpolation that wraps RA across the 0/360 boundary.
 *
 * @since 0.2.0
 */
export function interpolateGeodesic(
  from: Coord,
  to: Coord,
  step: number,
): [number, number][] {
  const out: [number, number][] = [];
  const [x0, y0] = from;
  const [x1, y1] = to;
  let xEnd = x1;
  if (Math.abs(x1 - x0) > 180) {
    xEnd = x1 > x0 ? x1 - 360 : x1 + 360;
  }
  const distance = Math.hypot(xEnd - x0, y1 - y0);
  const steps = Math.ceil(distance / step);
  for (let index = 0; index <= steps; index++) {
    const t = index / steps;
    let x = x0 + t * (xEnd - x0);
    let y = y0 + t * (y1 - y0);
    x = (x + 360) % 360;
    y = Math.max(-90, Math.min(90, y));
    out.push([x, y]);
  }
  return out;
}

/**
 * Apply `interpolate` along every adjacent pair in an array of points.
 *
 * @since 0.2.0
 */
export function interpolateRank2DArray(
  coordinates: Coord[],
  step = 1,
): [number, number][] {
  const out: [number, number][] = [];
  for (let index = 0; index < coordinates.length - 1; index++) {
    out.push(...interpolate(coordinates[index], coordinates[index + 1], step));
  }
  return out;
}

/**
 * Apply `interpolateGeodesic` along every adjacent pair (RA-aware).
 *
 * @since 0.2.0
 */
export function interpolateRank2DGeodesicCoordinateArray(
  coordinates: Coord[],
  step = 1,
): [number, number][] {
  const out: [number, number][] = [];
  for (let index = 0; index < coordinates.length - 1; index++) {
    out.push(
      ...interpolateGeodesic(coordinates[index], coordinates[index + 1], step),
    );
  }
  return out;
}
