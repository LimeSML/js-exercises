import { template } from "./index";

describe("template", () => {
  test("should return type of string value", () => {
    const result = template`type of 'A' is ${"A"}`;
    expect(result).toBe("type of 'A' is string");
  });

  test("should return type of number value", () => {
    const result = template`type of 42 is ${42}`;
    expect(result).toBe("type of 42 is number");
  });

  test("should return type of boolean value", () => {
    const result = template`type of true is ${true}`;
    expect(result).toBe("type of true is boolean");
  });

  test("should return type of object", () => {
    const result = template`type of object is ${{}}`;
    expect(result).toBe("type of object is object");
  });

  test("should return type of null value", () => {
    const result = template`type of null is ${null}`;
    expect(result).toBe("type of null is object");
  });

  test("should return type of undefined value", () => {
    const result = template`type of undefined is ${undefined}`;
    expect(result).toBe("type of undefined is undefined");
  });

  test("should return type of array", () => {
    const result = template`type of [] is ${[]}`;
    expect(result).toBe("type of [] is object");
  });

  test("should return type of function", () => {
    const result = template`type of () => { } is ${() => {}}`;
    expect(result).toBe("type of () => { } is function");
  });

  test("should return type of symbol", () => {
    const result = template`type of Symbol('s') is ${Symbol("s")}`;
    expect(result).toBe("type of Symbol('s') is symbol");
  });

  test("should return types of multiple values", () => {
    const result = template`types: ${42}, ${true}, ${null}, ${undefined}`;
    expect(result).toBe("types: number, boolean, object, undefined");
  });

  test("should work with no interpolations", () => {
    const result = template`no values`;
    expect(result).toBe("no values");
  });
});
