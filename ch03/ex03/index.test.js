import { isAlmostEqual } from "./index.js";

describe("isAlmostEqual method", () => {
  it("returns false if either argument is not a number", () => {
    expect(isAlmostEqual("a", 1)).toBe(false);
    expect(isAlmostEqual(1, "b")).toBe(false);
    expect(isAlmostEqual("a", "b")).toBe(false);
    expect(isAlmostEqual(null, 1)).toBe(false);
    expect(isAlmostEqual(1, undefined)).toBe(false);
  });

  it("returns true if both arguments are NaN", () => {
    expect(isAlmostEqual(NaN, NaN)).toBe(true);
  });

  it("returns true if both arguments are the same non-finite value", () => {
    expect(isAlmostEqual(Infinity, Infinity)).toBe(true);
    expect(isAlmostEqual(-Infinity, -Infinity)).toBe(true);
  });

  it("returns false if one argument is finite and the other is non-finite", () => {
    expect(isAlmostEqual(Infinity, 1)).toBe(false);
    expect(isAlmostEqual(-Infinity, 0)).toBe(false);
    expect(isAlmostEqual(NaN, 1)).toBe(false);
  });

  it("returns true if two finite numbers are almost equal within epsilon", () => {
    expect(isAlmostEqual(0.3 - 0.2, 0.1)).toBe(true);
    expect(isAlmostEqual(0.2 - 0.1, 0.1)).toBe(true);
  });
});