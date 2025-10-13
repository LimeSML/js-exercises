import { PositiveNumber } from "./index.ts";

describe("PositiveNumber", () => {
  it("should create an object with positive number", () => {
    const pn = PositiveNumber(1);
    expect(pn.getX()).toBe(1);
  });

  it("should throw error if initialized with zero", () => {
    expect(() => PositiveNumber(0)).toThrow("require : x > 0");
  });

  it("should throw error if initialized with negative number", () => {
    expect(() => PositiveNumber(-1)).toThrow("require : x > 0");
  });

  it("should update x with setX if positive", () => {
    const pn = PositiveNumber(1);
    pn.setX(3);
    expect(pn.getX()).toBe(3);
  });

  it("should throw error if setX is called with zero", () => {
    const pn = PositiveNumber(2);
    expect(() => pn.setX(0)).toThrow("require : x > 0");
  });

  it("should throw error if setX is called with negative number", () => {
    const pn = PositiveNumber(2);
    expect(() => pn.setX(-1)).toThrow("require : x > 0");
  });
});
