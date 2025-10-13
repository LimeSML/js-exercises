import { pow } from "./index.ts";

describe("pow", () => {
  it("should return 1 if exponent is 0", () => {
    expect(pow(2, 0)).toBe(1);
    expect(pow(10, 0)).toBe(1);
    expect(pow(-5, 0)).toBe(1);
  });

  it("should calculate positive integer exponents correctly", () => {
    expect(pow(2, 3)).toBe(8);
    expect(pow(5, 2)).toBe(25);
    expect(pow(3, 4)).toBe(81);
  });

  it("should handle base 0 correctly", () => {
    expect(pow(0, 3)).toBe(0);
    expect(pow(0, 1)).toBe(0);
  });

  it("should handle base 1 and -1 correctly", () => {
    expect(pow(1, 100)).toBe(1);
    expect(pow(-1, 2)).toBe(1);
    expect(pow(-1, 3)).toBe(-1);
  });

  it("should throw an error for negative exponents", () => {
    expect(() => pow(2, -1)).toThrow("exponent must be a non-negative integer");
    expect(() => pow(5, -10)).toThrow(
      "exponent must be a non-negative integer",
    );
  });

  it("should throw error for non-integer exponents", () => {
    expect(() => pow(2, 1.5)).toThrow(
      "exponent must be a non-negative integer",
    );
    expect(() => pow(3, NaN)).toThrow(
      "exponent must be a non-negative integer",
    );
  });
});
