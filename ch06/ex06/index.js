export function getAllPropertyKeys(obj) {
  if (typeof obj !== "object" || obj === null) {
    throw new TypeError("Argument must be a non-null object");
  }

  const allPropertyKeys = [];

  // 独自プロパティ（列挙不可 + Symbol 含む）
  Object.getOwnPropertyNames(obj).forEach((key) => allPropertyKeys.push(key));
  Object.getOwnPropertySymbols(obj).forEach((sym) => allPropertyKeys.push(sym));

  // 継承プロパティ（列挙可能）
  let proto = Object.getPrototypeOf(obj);
  while (proto && proto !== Object.prototype) {
    for (const key in proto) {
      if (!obj.hasOwnProperty(key)) {
        allPropertyKeys.push(key);
      }
    }
    proto = Object.getPrototypeOf(proto);
  }

  return allPropertyKeys;
}
