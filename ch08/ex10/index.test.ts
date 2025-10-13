import { addMyCall } from "./index.ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("addMyCall", () => {
  test("When given function has no arg, then it can call this", () => {
    const f = function (this: any) {
      return this.a;
    };
    addMyCall(f);
    expect((f as any).myCall({ a: 1 })).toBe(1);
  });

  test("When given function has 1 arg, then it can call this", () => {
    const f = function (this: any, x: number) {
      return this.a + x;
    };
    addMyCall(f);
    expect((f as any).myCall({ a: 1 }, 2)).toBe(3);
  });

  test("When given function has multiple args, then it can call this", () => {
    const f = function (
      this: any,
      x: number,
      y: number,
      z: number,
      u: number,
      v: number,
    ) {
      return this.a + x + y + z + u + v;
    };
    addMyCall(f);
    expect((f as any).myCall({ a: 1 }, 2, 3, 4, 5, 6)).toBe(21);
  });
});
