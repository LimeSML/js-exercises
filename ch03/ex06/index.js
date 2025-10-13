export function slice(str, indexStart, indexEnd) {
  if (typeof str !== "string") {
    throw new TypeError("First argument must be a string");
  }

  indexStart = indexStart === undefined ? 0 : Number(indexStart);
  indexEnd = indexEnd === undefined ? str.length : Number(indexEnd);

  if (isNaN(indexStart)) {
    indexStart = 0;
  }

  if (isNaN(indexEnd)) {
    indexEnd = 0;
  }

  if (!isFinite(indexStart)) {
    indexStart = str.length;
  }

  if (!isFinite(indexEnd)) {
    indexEnd = str.length;
  }

  indexStart = Math.trunc(indexStart);
  indexEnd = Math.trunc(indexEnd);

  if (indexStart < 0) {
    indexStart = Math.max(indexStart + str.length, 0);
  }

  if (indexEnd < 0) {
    indexEnd = Math.max(indexEnd + str.length, 0);
  }

  if (indexEnd >= str.length) {
    indexEnd = str.length;
  }

  if (indexStart >= str.length || indexEnd <= indexStart) {
    return "";
  }

  return str.substring(indexStart, indexEnd);
}
