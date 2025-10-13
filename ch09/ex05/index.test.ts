import { instanceOf } from "./index.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("instanceOf", () => {
  class A {}
  class B extends A {}
  class C extends B {}
  class X {}

  it("should return true for direct instance of the constructor", () => {
    const obj = new C();
    expect(instanceOf(obj, C)).toBe(true);
  });

  it("should return true for inherited constructor in prototype chain", () => {
    const obj = new C();
    expect(instanceOf(obj, B)).toBe(true);
    expect(instanceOf(obj, A)).toBe(true);
  });

  it("should return false if the constructor is not in the prototype chain", () => {
    const obj = new C();
    expect(instanceOf(obj, X)).toBe(false);
  });

  it("should throw error if object is null", () => {
    expect(() => instanceOf(null, A)).toThrow(
      "object must be a non-null object",
    );
  });

  it("should throw error if constructor is not a function", () => {
    const obj = new A();
    expect(() => instanceOf(obj, 123 as any)).toThrow(
      "constructor must be a function",
    );
    expect(() => instanceOf(obj, {} as any)).toThrow(
      "constructor must be a function",
    );
  });

  it("should work correctly with built-in constructors like Array", () => {
    const arr: number[] = [];
    expect(instanceOf(arr, Array)).toBe(true);
  });

  it("should work correctly with Date constructor", () => {
    const date = new Date();
    expect(instanceOf(date, Date)).toBe(true);
  });
});
