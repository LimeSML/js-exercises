const obj1 = { x: 1 };
const obj2 = Object.create(obj1);

console.log(Object.getPrototypeOf(obj2) === obj1); // true