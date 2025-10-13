import { fibonacciIterator } from "./index";

describe("fibonacciIterator", () => {
  it("should return an iterator object with next and Symbol.iterator methods", () => {
    const iter = fibonacciIterator();
    expect(typeof iter.next).toBe("function");
    expect(typeof iter[Symbol.iterator]).toBe("function");
  });

  it("should return the correct Fibonacci numbers", () => {
    const iter = fibonacciIterator();
    const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
    const results = [];
    for (let i = 0; i < expected.length; i++) {
      results.push(iter.next().value);
    }
    expect(results).toEqual(expected);
  });

  it("should be iterable with for of loop and return the correct Fibonacci numbers", () => {
    const iter = fibonacciIterator();
    const expected = [0, 1, 1, 2, 3, 5];
    const results = [];
    let count = 0;
    for (const num of iter) {
      results.push(num);
      count++;
      if (count === expected.length) break;
    }
    expect(results).toEqual(expected);
  });
});
