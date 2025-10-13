import { push, pop, shift, unshift } from "./index.ts";

describe("push", () => {
  it("should add an element to the end of the array", () => {
    expect(push([1, 2, 3], 4)).toEqual([1, 2, 3, 4]);
  });

  it("should not mutate the original array", () => {
    const arr = [1, 2];
    push(arr, 3);
    expect(arr).toEqual([1, 2]);
  });

  it("should work with empty arrays", () => {
    expect(push([], 1)).toEqual([1]);
  });
});

describe("pop", () => {
  it("should remove the last element from the array", () => {
    expect(pop([1, 2, 3])).toEqual([1, 2]);
  });

  it("should return undefined for empty arrays", () => {
    expect(pop([])).toBeUndefined();
  });

  it("should not mutate the original array", () => {
    const arr = [1, 2, 3];
    pop(arr);
    expect(arr).toEqual([1, 2, 3]);
  });

  it("should return an empty array when popping from a single element array", () => {
    expect(pop([1])).toEqual([]);
  });
});

describe("shift", () => {
  it("should remove the first element from the array", () => {
    expect(shift([1, 2, 3])).toEqual([2, 3]);
  });

  it("should return undefined for empty arrays", () => {
    expect(shift([])).toBeUndefined();
  });

  it("should not mutate the original array", () => {
    const arr = [1, 2, 3];
    shift(arr);
    expect(arr).toEqual([1, 2, 3]);
  });

  it("should return an empty array when shifting a single element array", () => {
    expect(shift([1])).toEqual([]);
  });
});

describe("unshift", () => {
  it("should add an element to the start of the array", () => {
    expect(unshift([2, 3], 1)).toEqual([1, 2, 3]);
  });

  it("should not mutate the original array", () => {
    const arr = [2, 3];
    unshift(arr, 1);
    expect(arr).toEqual([2, 3]);
  });

  it("should work with empty arrays", () => {
    expect(unshift([], 1)).toEqual([1]);
  });
});
