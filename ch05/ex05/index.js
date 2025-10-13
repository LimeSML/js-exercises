export function filterEvenValues(obj) {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError("Argument must be an object");
  }

  const evenPropertiesObject = {};
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] !== "number") {
      continue;
    }
    if (!isFinite(obj[key])) {
      continue;
    }

    if (obj[key] % 2 === 0) {
      evenPropertiesObject[key] = obj[key];
    }
  }

  return evenPropertiesObject;
}
