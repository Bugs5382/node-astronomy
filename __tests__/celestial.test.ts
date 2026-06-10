/*
MIT License

Copyright (c) 2026 Shane Froebel

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
