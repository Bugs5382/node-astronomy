import { describe, expect, test } from "vitest";

import { Celestial } from "../src";

describe("Celestial", () => {
  test("default constructor sets name to 'celestial'", () => {
    const c = new Celestial();
    expect(c).toBeInstanceOf(Celestial);
    expect(c.name).toBe("celestial");
    expect(c.time).toBeInstanceOf(Date);
  });

  test("supplied name is honored", () => {
    const c = new Celestial({ name: "supernova" });
    expect(c.name).toBe("supernova");
  });

  test("supplied time is captured at construction", () => {
    const t = new Date("2000-01-01T00:00:00Z");
    const c = new Celestial({ time: t });
    expect(c.time.getTime()).toBe(t.getTime());
  });
});
