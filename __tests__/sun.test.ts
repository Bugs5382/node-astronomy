import { beforeAll, describe, expect, test } from "vitest";

import { Sun } from "../src/astronomicalObject/sun";
import { SunTimes } from "../src/astronomicalObject/sun/sunTimes";
import { TimeOfInterest } from "../src/time";

describe("sun", () => {
  let toi: TimeOfInterest, sun: Sun, sunTimes: SunTimes;
  beforeAll(async () => {
    // create global toi
    toi = new TimeOfInterest({
      time: new Date("2017-07-02T15:30:00Z"),
    });

    // create the sun
    sun = new Sun({ toi });

    // create the times of the sun
    sunTimes = new SunTimes({
      toi,
      latitude: 40.6676,
      longitude: -73.9851,
      refraction: 0,
    });

    // verify that JD is what we expect it to be
    expect(toi.jd).toEqual(2457937.1458333335);
  });

  describe("sanity checks", () => {
    test("... the instance ... sun", () => {
      const sunObject = new Sun({ toi });
      expect(sunObject).toBeInstanceOf(Sun);
    });
    test("... the instance ... sunTimes", () => {
      const sunTimesObject = new SunTimes({ toi });
      expect(sunTimesObject).toBeInstanceOf(SunTimes);
    });

    describe("sun angle constants", () => {
      let sunTimesObject: SunTimes;
      beforeAll(async () => {
        sunTimesObject = new SunTimes({ toi });
      });
      test("... astronomicalTwilight value", () => {
        expect(sunTimesObject.angles.astronomicalTwilight).toBeCloseTo(
          -0.3141592653589793,
        );
      });

      test("... nauticalTwilight value", () => {
        expect(sunTimesObject.angles.nauticalTwilight).toBeCloseTo(
          -0.20943951023931953,
        );
      });

      test("... civilTwilight value", () => {
        expect(sunTimesObject.angles.civilTwilight).toBeCloseTo(
          -0.10471975511965977,
        );
      });

      test("... sunriseStart value", () => {
        expect(sunTimesObject.angles.sunriseStart).toBeCloseTo(
          -0.01454441043328608,
        );
      });

      test("... sunriseEnd value", () => {
        expect(sunTimesObject.angles.sunriseEnd).toBeCloseTo(
          -0.005235987755982988,
        );
      });

      test("... sunNoon value", () => {
        expect(sunTimesObject.angles.sunNoon).toBeCloseTo(1.5707963267948966);
      });

      test("... sunsetStart value", () => {
        expect(sunTimesObject.angles.sunsetStart).toBeCloseTo(
          -0.005235987755982988,
        );
      });

      test("... sunsetEnd value", () => {
        expect(sunTimesObject.angles.sunsetEnd).toBeCloseTo(
          -0.01454441043328608,
        );
      });

      test("... civilDusk value", () => {
        expect(sunTimesObject.angles.civilDusk).toBeCloseTo(
          -0.10471975511965977,
        );
      });

      test("... nauticalDusk value", () => {
        expect(sunTimesObject.angles.nauticalDusk).toBeCloseTo(
          -0.20943951023931953,
        );
      });

      test("... astronomicalDusk value", () => {
        expect(sunTimesObject.angles.astronomicalDusk).toBeCloseTo(
          -0.3141592653589793,
        );
      });
    });
  });
});
