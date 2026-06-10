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
export { AstronomicalObject } from "./astronomicalObject";

export type { IAstronomicalObject } from "./astronomicalObject";
export { Celestial } from "./astronomicalObject/celestial";
export {
  Constellation,
  findConstellationAt,
} from "./astronomicalObject/celestial/constellations";
export type {
  IConstellationProperties,
  IConstellationVisibilityProperties,
  IVisibleConstellationsQuery,
} from "./astronomicalObject/celestial/constellations/properties";
export type {
  IConstellation,
  IConstellationEquatorialCoordinate,
  IConstellationFeature,
  IConstellationHorizontalCoordinate,
  IConstellationName,
} from "./astronomicalObject/celestial/constellations/types";
export {
  ConstellationVisibility,
  visibleConstellations,
} from "./astronomicalObject/celestial/constellations/visibility";
export {
  getNamedStar,
  listNamedStars,
  Star,
} from "./astronomicalObject/celestial/stars";
export type { NamedStar } from "./astronomicalObject/celestial/stars/data";
export type {
  IStarProperties,
  IStarTimesProperties,
} from "./astronomicalObject/celestial/stars/properties";
export { StarTimes } from "./astronomicalObject/celestial/stars/times";
export type {
  IStar,
  IStarArcSample,
  IStarCatalogEntry,
  IStarEquatorialCoordinate,
  IStarTimeResultProperties,
} from "./astronomicalObject/celestial/stars/types";
export { Moon } from "./astronomicalObject/moon";
export { MoonPhase } from "./astronomicalObject/moon/enum";
export type {
  IMoonProperties,
  IMoonTimesProperties,
} from "./astronomicalObject/moon/properties";
export { MoonTimes } from "./astronomicalObject/moon/times";
export type {
  IEquatorialCoordinate,
  IHorizontalCoordinate,
  IMoon,
  IMoonAngularDiameter,
  IMoonArcSample,
  IMoonPeak,
  IMoonTimeResultProperties,
} from "./astronomicalObject/moon/types";
export { Planet } from "./astronomicalObject/planet";
export { Earth } from "./astronomicalObject/planet/earth";
export { PlanetName } from "./astronomicalObject/planet/enum";
export type { ObservablePlanetName } from "./astronomicalObject/planet/enum";
export { Jupiter } from "./astronomicalObject/planet/jupiter";
export { Mars } from "./astronomicalObject/planet/mars";
export { Mercury } from "./astronomicalObject/planet/mercury";
export { Neptune } from "./astronomicalObject/planet/neptune";
export { Pluto } from "./astronomicalObject/planet/pluto";
export type {
  IPlanetProperties,
  IPlanetTimesProperties,
} from "./astronomicalObject/planet/properties";
export { Saturn } from "./astronomicalObject/planet/saturn";
export { PlanetTimes } from "./astronomicalObject/planet/times";
export type {
  IEclipticCoordinate,
  IHeliocentricPosition,
  IPlanet,
  IPlanetArcSample,
  IPlanetEquatorialCoordinate,
  IPlanetPeak,
  IPlanetTimeResultProperties,
} from "./astronomicalObject/planet/types";
export { Uranus } from "./astronomicalObject/planet/uranus";
export { Venus } from "./astronomicalObject/planet/venus";
export { Sun } from "./astronomicalObject/sun";
export { TwilightExtended } from "./astronomicalObject/sun/enum";
export type { ISunTimesProperties } from "./astronomicalObject/sun/properties";
export { SunTimes } from "./astronomicalObject/sun/times";
export type {
  ISun,
  ISunPosition,
  ISunProperties,
  ISunTimeResultProperties,
  ISunTimes,
  TPolarRegion,
  TSolarNoon,
  TTwilightBlock,
} from "./astronomicalObject/sun/types";
export { TimeOfInterest } from "./time";
export type { ITimeOfInterest } from "./time/properties";
