import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("returns the sum of an array", () => {
      expect(sum([1, 2, 3, -4])).toBe(2);
    });

    it("returns zero value when empty array given", () => {
      expect(sum([])).toBe(0);
    });
  });

  describe("factorial", () => {
    it("returns the factorial of a number", () => {
      expect(factorial(5)).toBe(120);
    });
    it("returns one value when zero given", () => {
      expect(factorial(0)).toBe(1);
    });
    it("returns one value when one given", () => {
      expect(factorial(1)).toBe(1);
    });
  });
});
