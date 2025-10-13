/* eslint-disable @typescript-eslint/no-explicit-any */
import { any, catching } from "./index.ts";

describe("any", () => {
  it("should return false if no functions are provided", () => {
    const fn = any();
    expect(fn(1)).toBe(false);
  });

  it("should return true if at least one function returns true", () => {
    const fn = any(
      (n: number) => n > 0,
      (n: number) => n < 0,
    );
    expect(fn(1)).toBe(true);
    expect(fn(-1)).toBe(true);
  });

  it("should return false if all functions return false", () => {
    const fn = any(
      (n: number) => n > 10,
      (n: number) => n < -10,
    );
    expect(fn(0)).toBe(false);
    expect(fn(5)).toBe(false);
  });
});

describe("catching", () => {
  it("should return result of fn if no exception is thrown", () => {
    const fn = catching(
      (x: number) => x * 2,
      () => "error",
    );
    expect(fn(3)).toBe(6);
  });

  it("should call handler if exception is thrown", () => {
    const fn = catching(
      () => {
        throw new Error("fail");
      },
      (e: Error) => e.message,
    );
    expect(fn()).toBe("fail");
  });
});
