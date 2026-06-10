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
 * Generalised solar-transit (NOAA-style sunrise/noon/sunset) helper.
 *
 * Vendored from `@observerly/astrometry`'s `night.js::getGeneralizedSolarTransit`
 * (Copyright © 2021-2023 observerly, MIT licensed). See NOTICE.
 *
 * The algorithm is the standard NOAA approximation: convert the date to
 * a Julian-day cycle, compute the solar mean anomaly and equation of
 * centre, then derive the sunrise/sunset hour angle for the observer's
 * latitude. Returns the three event UTC instants plus the cycle index
 * `J` and hour angle `ha` in degrees.
 *
 * @since 0.2.0
 */

import { degreesToRadians as rad } from "@/util/angles";
import { type GeographicCoordinate } from "@/util/coordinates";
import { getJulianDate, J1970, J2000 } from "@/util/time";

/**
 * Approximate solar transit times (sunrise / solar noon / sunset) at
 * `date` for the supplied observer.
 *
 * Returns `{ sunrise, noon, sunset, J, ha }` where `J` is the integer
 * cycle index used internally and `ha` is the hour angle in degrees.
 *
 * @since 0.2.0
 */
export function getGeneralizedSolarTransit(
  date: Date,
  observer: GeographicCoordinate,
): {
  ha: number;
  J: number;
  noon: Date;
  sunrise: Date;
  sunset: Date;
} {
  const { latitude, longitude } = observer;
  const JD = getJulianDate(date);
  const cycle =
    Math.ceil(JD - (J2000 + 9e-4) + 69.184 / 86_400) - longitude / 360;

  const meanAnomalyDeg = (357.5291 + 0.985_600_28 * cycle) % 360;
  const C =
    1.9148 * Math.sin(rad(meanAnomalyDeg)) +
    0.02 * Math.sin(rad(2 * meanAnomalyDeg)) +
    3e-4 * Math.sin(rad(3 * meanAnomalyDeg));
  const eclipticLongitudeDeg = (meanAnomalyDeg + C + 180 + 102.9372) % 360;

  const solarTransitJD =
    J2000 +
    cycle +
    5.3e-3 * Math.sin(rad(meanAnomalyDeg)) -
    6.9e-3 * Math.sin(rad(2 * eclipticLongitudeDeg));

  const sunDeclinationDeg = degOf(
    Math.asin(Math.sin(rad(eclipticLongitudeDeg)) * Math.sin(rad(23.45))),
  );
  const hourAngleDeg = degOf(
    Math.acos(
      (Math.sin(
        rad(-0.833) -
          Math.sin(rad(latitude)) * Math.sin(rad(sunDeclinationDeg)),
      ) /
        Math.cos(rad(latitude))) *
        Math.cos(rad(sunDeclinationDeg)),
    ),
  );

  const sunriseJD = solarTransitJD - hourAngleDeg / 360;
  const sunsetJD = solarTransitJD + hourAngleDeg / 360;

  return {
    ha: hourAngleDeg,
    J: cycle,
    noon: new Date((solarTransitJD - J1970) * 86_400 * 1000),
    sunrise: new Date((sunriseJD - J1970) * 86_400 * 1000),
    sunset: new Date((sunsetJD - J1970) * 86_400 * 1000),
  };
}

function degOf(rad: number): number {
  return (rad * 180) / Math.PI;
}
