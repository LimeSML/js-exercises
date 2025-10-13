import { filterEvenValues } from "./index";

describe("filterEvenValues", () => {
  test("should return an object with only even number properties", () => {
    const input = { x: 1, y: 2, z: 3 };
    const expected = { y: 2 };
    expect(filterEvenValues(input)).toEqual(expected);
  });

  test("should return an empty object if no even numbers are present", () => {
    const input = { x: 1, y: 3, z: 5 };
    const expected = {};
    expect(filterEvenValues(input)).toEqual(expected);
  });

  test("should ignore non-numeric properties", () => {
    const input = { x: 2, y: "string", z: null };
    const expected = { x: 2 };
    expect(filterEvenValues(input)).toEqual(expected);
  });

  test("should ignore non-finite numbers", () => {
    const input = { x: 2, y: Infinity, z: 4, w: NaN };
    const expected = { x: 2, z: 4 };
    expect(filterEvenValues(input)).toEqual(expected);
  });

  test("should throw a TypeError if the argument is not an object", () => {
    expect(() => filterEvenValues(null)).toThrow(TypeError);
    expect(() => filterEvenValues(42)).toThrow(TypeError);
    expect(() => filterEvenValues("string")).toThrow(TypeError);
  });

  test("should return an empty object if the input object is empty", () => {
    const input = {};
    const expected = {};
    expect(filterEvenValues(input)).toEqual(expected);
  });
});
