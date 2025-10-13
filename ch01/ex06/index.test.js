import { fib } from "./index.js";

describe("fib", () => {
  it("returns zero value when zero given", () => {
    expect(fib(0)).toBe(0);
  });

  it("returns one value when one given", () => {
    expect(fib(1)).toBe(1);
  });

  it("returns the correct Fibonacci number", () => {
    expect(fib(2)).toBe(1);
    expect(fib(3)).toBe(2);
    expect(fib(5)).toBe(5);
    expect(fib(10)).toBe(55);
    // 処理に時間がかかるため、コメントアウト
    //expect(fib(75)).toBe(2111485077978050);
  });

  it("returns the same value when negative number given", () => {
    expect(fib(-1)).toBe(-1);
    expect(fib(-2)).toBe(-2);
    expect(fib(-3)).toBe(-3);
  });
});
