export type Matrix = number[][];

function isValidMatrix(matrix: Matrix): boolean {
  if (matrix.length === 0) {
    return false;
  }
  const rowLength = matrix[0].length;
  return matrix.every((row) => row.length === rowLength);
}

export function add(a: Matrix, b: Matrix): Matrix {
  if (!isValidMatrix(a) || !isValidMatrix(b)) {
    throw new Error("Matrices are invalid");
  }
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }

  return a.map((row, i) => row.map((value, j) => value + b[i][j]));
}

export function mul(a: Matrix, b: Matrix): Matrix {
  if (!isValidMatrix(a) || !isValidMatrix(b)) {
    throw new Error("Matrices are invalid");
  }
  if (a[0].length !== b.length) {
    throw new Error("Matrix dimensions are not compatible for multiplication");
  }

  const result: Matrix = [];
  for (let i = 0; i < a.length; i++) {
    const row: number[] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }

  return result;
}
