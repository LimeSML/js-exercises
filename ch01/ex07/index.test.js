import { Point } from "./index.js";

describe("Point class", () => {
  describe("add method", () => {
    it("adds positive values to the point's coordinates", () => {
      const point = new Point(1, 1);
      point.add(2, 3);
      expect(point.x).toBe(3);
      expect(point.y).toBe(4);
    });

    it("adds negative values to the point's coordinates", () => {
      const point = new Point(5, 5);
      point.add(-2, -3);
      expect(point.x).toBe(3);
      expect(point.y).toBe(2);
    });

    it("adds zero to the point's coordinates", () => {
      const point = new Point(1, 1);
      point.add(0, 0);
      expect(point.x).toBe(1);
      expect(point.y).toBe(1);
    });

    it("handles mixed positive and negative values", () => {
      const point = new Point(1, -1);
      point.add(3, -2);
      expect(point.x).toBe(4);
      expect(point.y).toBe(-3);
    });
  });
});
