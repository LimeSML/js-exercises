import { cache } from "./index";

describe("cache", () => {
  it("should throw an Error if input is not a function", () => {
    expect(() => cache(null)).toThrow("input must be a function");
    expect(() => cache(123)).toThrow("input must be a function");
    expect(() => cache({})).toThrow("input must be a function");
  });

  it("should return a function", () => {
    const fn = jest.fn();
    const cached = cache(fn);
    expect(typeof cached).toBe("function");
  });

  it("should cache results for the same object argument", () => {
    const fn = jest.fn((obj) => ({ result: obj.value }));
    const cached = cache(fn);

    const obj = { value: 42 };
    const res1 = cached(obj);
    const res2 = cached(obj);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(res1).toBe(res2);
  });

  it("should not cache results for different object arguments", () => {
    const fn = jest.fn((obj) => ({ result: obj.value }));
    const cached = cache(fn);

    const obj1 = { value: 1 };
    const obj2 = { value: 1 };
    const res1 = cached(obj1);
    const res2 = cached(obj2);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(res1).not.toBe(res2);
  });
});
