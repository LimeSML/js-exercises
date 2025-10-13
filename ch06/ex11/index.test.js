import { p } from "./index";

describe("Polar Coordinate Object", () => {
  beforeEach(() => {
    p.r = 0;
    p.theta = 0;
  });

  test("should calculate x and y correctly from r and theta", () => {
    p.r = 5;
    p.theta = Math.PI / 4; // 45 degrees
    expect(p.x).toBeCloseTo(3.5355, 4);
    expect(p.y).toBeCloseTo(3.5355, 4);
  });

  test("should calculate r and theta correctly when x is set", () => {
    p.y = 4;
    p.x = 3;
    expect(p.r).toBeCloseTo(5, 4);
    expect(p.theta).toBeCloseTo(Math.atan2(4, 3), 4);
  });

  test("should calculate r and theta correctly when y is set", () => {
    p.x = 3;
    p.y = 4;
    expect(p.r).toBeCloseTo(5, 4);
    expect(p.theta).toBeCloseTo(Math.atan2(4, 3), 4);
  });

  test("should throw an error when setting x to NaN", () => {
    expect(() => {
      p.x = NaN;
    }).toThrow("x must not be NaN");
  });

  test("should throw an error when setting y to NaN", () => {
    expect(() => {
      p.y = NaN;
    }).toThrow("y must not be NaN");
  });
});
