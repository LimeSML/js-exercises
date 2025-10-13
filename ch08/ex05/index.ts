/* eslint-disable @typescript-eslint/no-explicit-any */
export function sequenceToObject(...values: any[]) {
  if (values.length % 2 !== 0) {
    throw new Error("values must be an even length array");
  }

  const result: Record<string, any> = {};
  for (let i = 0; i < values.length; i += 2) {
    if (typeof values[i] !== "string") {
      throw new Error(`key at index ${i} must be a string`);
    }
    result[values[i]] = values[i + 1];
  }

  return result;
}
