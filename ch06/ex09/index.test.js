import { jest, test } from "@jest/globals";

test("toJSON method", () => {
  const mock = jest.fn();

  const obj = {
    x: 0,
    y: 0,
    sum() {
      mock();
      return this.x + this.y;
    },
  };

  obj.toJSON = function () {
    return { x: this.x, y: this.y, sum: this.sum() };
  };

  obj.x = 1;
  obj.y = 2;
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});
