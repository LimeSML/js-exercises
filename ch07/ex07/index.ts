export function sort<T>(array: T[]): T[] {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[Math.floor(array.length / 2)];
  const left = [];
  const right = [];

  for (let i = 0; i < array.length; i++) {
    if (i === Math.floor(array.length / 2)) {
      continue;
    }
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...sort(left), pivot, ...sort(right)];
}
