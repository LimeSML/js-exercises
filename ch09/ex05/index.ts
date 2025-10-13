/* eslint-disable @typescript-eslint/no-explicit-any */
export function instanceOf(object: object, constructor: any): boolean {
  if (typeof object !== "object" || object === null) {
    throw new Error("object must be a non-null object");
  }
  if (typeof constructor !== "function") {
    throw new Error("constructor must be a function");
  }

  let proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
