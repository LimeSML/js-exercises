export class TypeMap {
  #map;

  constructor() {
    this.#map = new Map();
  }

  set(key, value) {
    if (typeof key !== "function") {
      throw new Error("key must be a function");
    }
    if (value.constructor !== key) {
      throw new Error("value must be an instance of key");
    }

    this.#map.set(key, value);
  }

  get(key) {
    if (typeof key !== "function") {
      throw new Error("key must be a function");
    }
    return this.#map.get(key);
  }
}

class Foo {}

const typeMap = new TypeMap();
typeMap.set(String, "string");
typeMap.set(Number, 123);
typeMap.set(Foo, new Foo());
// typeMap.set(Date, "not a date"); // -> Error

console.log(typeMap.get(String)); // -> "string"
console.log(typeMap.get(Number)); // -> 123
