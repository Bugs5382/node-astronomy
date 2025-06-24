import { describe, expect, test } from "vitest";

import { Sun } from "../src/astronomicalObject/sun";

describe("sun", () => {
  describe("sanity checks", () => {
    test("... the instance", () => {
      const sunObject = new Sun();
      expect(sunObject).toBeInstanceOf(Sun);
    });
  });
})