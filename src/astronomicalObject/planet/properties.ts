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
import {
  ObservablePlanetName,
  PlanetName,
} from "@/astronomicalObject/planet/enum";
import { IPlanet } from "@/astronomicalObject/planet/types";

/**
 * Constructor input for the base {@link Planet} class. The `planet` key
 * is what the per-planet subclasses (Mars, Jupiter, ...) pre-fill.
 *
 * @since 0.2.0
 */
export interface IPlanetProperties extends IPlanet {
  /**
   * Which planet this snapshot represents.
   * @since 0.2.0
   */
  planet?: PlanetName;
}

/**
 * Constructor input for {@link PlanetTimes}.
 *
 * @since 0.2.0
 */
export interface IPlanetTimesProperties extends IPlanet {
  /**
   * Observer latitude in decimal degrees (positive north).
   * @since 0.2.0
   */
  latitude: number;
  /**
   * Observer longitude in decimal degrees (positive east).
   * @since 0.2.0
   */
  longitude: number;
  /**
   * Which planet to evaluate. Earth is not allowed — it has no
   * meaningful rise/set from itself.
   * @since 0.2.0
   */
  planet: ObservablePlanetName;
  /**
   * IANA timezone name for output formatting. Defaults to UTC.
   * @default "UTC"
   * @since 0.2.0
   */
  timezone?: string;
}
