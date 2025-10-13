import { add, mul, Matrix } from "./index.ts";

describe("Matrix addition", () => {
  it("adds two 2x2 matrices", () => {
    const a: Matrix = [
      [1, 2],
      [3, 4],
    ];
    const b: Matrix = [
      [5, 6],
      [7, 8],
    ];
    expect(add(a, b)).toEqual([
      [6, 8],
      [10, 12],
    ]);
  });

  it("adds two 3x3 matrices", () => {
    const a: Matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const b: Matrix = [
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1],
    ];
    expect(add(a, b)).toEqual([
      [10, 10, 10],
      [10, 10, 10],
      [10, 10, 10],
    ]);
  });

  it("should throw an error when matrices have different dimensions", () => {
    const a: Matrix = [
      [1, 2],
      [3, 4],
    ];
    const b: Matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    expect(() => add(a, b)).toThrow("Matrices must have the same dimensions");
  });

  it("should throw an error wehn a matrix is invalid", () => {
    const a: Matrix = [[1, 2], [3]];
    const b: Matrix = [
      [1, 2],
      [3, 4],
    ];
    expect(() => add(a, b)).toThrow("Matrices are invalid");
  });
});

describe("Matrix multiplication", () => {
  it("multiplies two 2x2 matrices", () => {
    const a: Matrix = [
      [1, 2],
      [3, 4],
    ];
    const b: Matrix = [
      [2, 0],
      [1, 2],
    ];
    expect(mul(a, b)).toEqual([
      [4, 4],
      [10, 8],
    ]);
  });

  it("multiplies 2x3 and 3x2 matrices", () => {
    const a: Matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const b: Matrix = [
      [7, 8],
      [9, 10],
      [11, 12],
    ];
    expect(mul(a, b)).toEqual([
      [58, 64],
      [139, 154],
    ]);
  });

  it("should throw an error when matrices are not compatible for multiplication", () => {
    const a: Matrix = [
      [1, 2],
      [3, 4],
    ];
    const b: Matrix = [[1, 2]];
    expect(() => mul(a, b)).toThrow(
      "Matrix dimensions are not compatible for multiplication",
    );
  });

  it("should throw an error a matrix is invalid", () => {
    const a: Matrix = [[1, 2], [3]];
    const b: Matrix = [
      [1, 2],
      [3, 4],
    ];
    expect(() => mul(a, b)).toThrow("Matrices are invalid");
  });
});
