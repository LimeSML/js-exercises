import { equalArrays } from "./index.js";

test("ch03-ex07", () => {
  const x = { length: 0, x: 'test' };
  const y = { length: 0, y: 'test' };

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});
