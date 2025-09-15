import { beforeAll, describe, expect, test } from "vitest";

import { Moon } from "../src/astronomicalObject/moon";

describe("moon tests", () => {
  let moon: Moon;
  beforeAll(async () => {
    // create the moon
    moon = new Moon();
  });

  describe("sanity checks", () => {
    test("... the instance ... moon", () => {
      expect(moon).toBeInstanceOf(Moon);
    });
  });
});
