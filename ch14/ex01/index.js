export function unwritableAndUnconfigurableObj() {
  return Object.defineProperties(
    {},
    {
      a: { value: 1, writable: false, enumerable: true, configurable: false },
    },
  );
}

export function writableAndUnconfigurableObj() {
  return Object.defineProperties(
    {},
    {
      b: { value: 2, writable: true, enumerable: true, configurable: false },
    },
  );
}

export function nestedUnwritableObj() {
  // const eObj = { e: 3 };
  // Object.preventExtensions(eObj);
  // const dObj = { d: eObj };
  // Object.preventExtensions(dObj);
  // const cObj = { c: dObj };
  // Object.preventExtensions(cObj);

  // return cObj;

  const obj = { c: { d: { e: 3 } } };
  return deepPreventExtensions(obj);
}

function deepPreventExtensions(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (!Object.isExtensible(obj)) {
    return obj;
  }

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    deepPreventExtensions(obj[prop]);
  });

  return Object.preventExtensions(obj);
}
