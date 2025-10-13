import { primes } from "./index";

describe("primes generator", () => {
  test("should return prime numbers in order", () => {
    const primeGen = primes();
    expect(primeGen.next()).toEqual({ value: 2, done: false });
    expect(primeGen.next()).toEqual({ value: 3, done: false });
    expect(primeGen.next()).toEqual({ value: 5, done: false });
    expect(primeGen.next()).toEqual({ value: 7, done: false });
    expect(primeGen.next()).toEqual({ value: 11, done: false });
    expect(primeGen.next()).toEqual({ value: 13, done: false });
    expect(primeGen.next()).toEqual({ value: 17, done: false });
    expect(primeGen.next()).toEqual({ value: 19, done: false });
    expect(primeGen.next()).toEqual({ value: 23, done: false });
    expect(primeGen.next()).toEqual({ value: 29, done: false });
  });
});
