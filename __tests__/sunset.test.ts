import { beforeAll, describe, expect, test } from "vitest";

import { SunTimes } from "../src/astronomicalObject/sun";

describe("sun tests", () => {
  let sunTimes: SunTimes;
  beforeAll(async () => {
    // create the times of the sun
    sunTimes = new SunTimes({
      time: new Date("2017-07-02"),
      latitude: 40.6676,
      longitude: -73.9851,
      refraction: 0,
    });
  });

  describe("sanity checks", () => {
    test("... the instance ... sunTimes", () => {
      expect(sunTimes).toBeInstanceOf(SunTimes);
    });

    describe("sun angle constants", () => {
      test("... astronomicalTwilight value", () => {
        expect(sunTimes.angles.astronomicalDawn).toBeCloseTo(
          -0.3141592653589793,
        );
      });

      test("... nauticalTwilight value", () => {
        expect(sunTimes.angles.nauticalDawn).toBeCloseTo(-0.20943951023931953);
      });

      test("... civilTwilight value", () => {
        expect(sunTimes.angles.civilDawn).toBeCloseTo(-0.10471975511965977);
      });

      test("... sunriseStart value", () => {
        expect(sunTimes.angles.sunriseStart).toBeCloseTo(-0.01454441043328608);
      });

      test("... sunriseEnd value", () => {
        expect(sunTimes.angles.sunriseEnd).toBeCloseTo(-0.005235987755982988);
      });

      test("... solarNoon value", () => {
        expect(sunTimes.angles.solarNoon).toBeCloseTo(1.5707963267948966);
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

  describe("time checks", () => {
    test.skip("... astronomical dawn", () => {});
  });
});
