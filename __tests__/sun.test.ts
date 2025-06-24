import { beforeAll, describe, expect, test } from "vitest";

import { Sun, SunTimes } from "../src/astronomicalObject/sun";
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
      test("... astronomicalTwilight value", () => {
        expect(sunTimes.angles.astronomicalTwilight).toBeCloseTo(
          -0.3141592653589793,
        );
      });

      test("... nauticalTwilight value", () => {
        expect(sunTimes.angles.nauticalTwilight).toBeCloseTo(
          -0.20943951023931953,
        );
      });

      test("... civilTwilight value", () => {
        expect(sunTimes.angles.civilTwilight).toBeCloseTo(-0.10471975511965977);
      });

      test("... sunriseStart value", () => {
        expect(sunTimes.angles.sunriseStart).toBeCloseTo(-0.01454441043328608);
      });

      test("... sunriseEnd value", () => {
        expect(sunTimes.angles.sunriseEnd).toBeCloseTo(-0.005235987755982988);
      });

      test("... sunNoon value", () => {
        expect(sunTimes.angles.sunNoon).toBeCloseTo(1.5707963267948966);
      });

      test("... sunsetStart value", () => {
        expect(sunTimes.angles.sunsetStart).toBeCloseTo(-0.005235987755982988);
      });

      test("... sunsetEnd value", () => {
        expect(sunTimes.angles.sunsetEnd).toBeCloseTo(-0.01454441043328608);
      });

      test("... civilDusk value", () => {
        expect(sunTimes.angles.civilDusk).toBeCloseTo(-0.10471975511965977);
      });

      test("... nauticalDusk value", () => {
        expect(sunTimes.angles.nauticalDusk).toBeCloseTo(-0.20943951023931953);
      });

      test("... astronomicalDusk value", () => {
        expect(sunTimes.angles.astronomicalDusk).toBeCloseTo(
          -0.3141592653589793,
        );
      });
    });
  });
});
