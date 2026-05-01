import { describe, expect, test } from "vitest";

import {
  directionToAzimuthWindow,
  isInWindow,
} from "../src/astronomicalObject/celestial/constellations/direction";

describe("directionToAzimuthWindow", () => {
  test("single compass points produce ±45° windows", () => {
    expect(directionToAzimuthWindow("N")).toEqual({
      azimuthMax: 45,
      azimuthMin: 315,
    });
    expect(directionToAzimuthWindow("E")).toEqual({
      azimuthMax: 135,
      azimuthMin: 45,
    });
    expect(directionToAzimuthWindow("S")).toEqual({
      azimuthMax: 225,
      azimuthMin: 135,
    });
    expect(directionToAzimuthWindow("W")).toEqual({
      azimuthMax: 315,
      azimuthMin: 225,
    });
  });

  test("'west-east' is the southern half-dome (W → S → E)", () => {
    const window = directionToAzimuthWindow("west-east");
    expect(window).toBeDefined();
    // The window should INCLUDE south (180°) and EXCLUDE north (0°).
    expect(isInWindow(180, window!)).toBe(true);
    expect(isInWindow(0, window!)).toBe(false);
    expect(isInWindow(90, window!)).toBe(true); // east edge
    expect(isInWindow(270, window!)).toBe(true); // west edge
  });

  test("'east-west' is the northern half-dome (E → N → W)", () => {
    const window = directionToAzimuthWindow("east-west");
    expect(window).toBeDefined();
    expect(isInWindow(0, window!)).toBe(true); // north included
    expect(isInWindow(180, window!)).toBe(false); // south excluded
    expect(isInWindow(90, window!)).toBe(true);
    expect(isInWindow(270, window!)).toBe(true);
  });

  test("explicit AzimuthWindow is normalised but otherwise passed through", () => {
    const window = directionToAzimuthWindow({
      azimuthMax: 100,
      azimuthMin: 350,
    });
    expect(window).toEqual({ azimuthMax: 100, azimuthMin: 350 });
  });

  test("wrapping window through 0° is honored", () => {
    const window = { azimuthMax: 10, azimuthMin: 350 };
    expect(isInWindow(355, window)).toBe(true);
    expect(isInWindow(5, window)).toBe(true);
    expect(isInWindow(180, window)).toBe(false);
  });

  test("unrecognised direction returns undefined", () => {
    expect(directionToAzimuthWindow("zzz" as unknown as "N")).toBeUndefined();
  });

  test("case-insensitive parsing", () => {
    expect(directionToAzimuthWindow("WEST-EAST")).toEqual(
      directionToAzimuthWindow("west-east"),
    );
    expect(directionToAzimuthWindow("ne")).toEqual({
      azimuthMax: 90,
      azimuthMin: 0,
    });
  });
});

describe("isInWindow", () => {
  test("non-wrapping window includes endpoints", () => {
    const window = { azimuthMax: 180, azimuthMin: 90 };
    expect(isInWindow(90, window)).toBe(true);
    expect(isInWindow(180, window)).toBe(true);
    expect(isInWindow(135, window)).toBe(true);
    expect(isInWindow(89, window)).toBe(false);
    expect(isInWindow(181, window)).toBe(false);
  });

  test("equal min and max behaves as a full sweep", () => {
    const window = { azimuthMax: 100, azimuthMin: 100 };
    expect(isInWindow(0, window)).toBe(true);
    expect(isInWindow(360, window)).toBe(true);
  });

  test("normalises out-of-range azimuths", () => {
    const window = { azimuthMax: 90, azimuthMin: 0 };
    expect(isInWindow(450, window)).toBe(true); // 450 % 360 = 90
    expect(isInWindow(-10, window)).toBe(false); // -10 → 350
  });
});
