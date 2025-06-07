const o = {};
o.x = 1;
const p = Object.create(o);
p.y = 2;
const q = Object.create(p);
q.z = 3;

// o が p および q のプロトタイプチェーン上に存在すること
console.log(o.isPrototypeOf(p)); // true
console.log(o.isPrototypeOf(q)); // true

// p が q のプロトタイプチェーン上に存在すること
console.log(p.isPrototypeOf(q)); // true

let obj = {};
let arr = [];
let date = new Date();
let map = new Map();

// Object
console.log(Object.prototype.isPrototypeOf(obj));  // true
console.log(Object.prototype.isPrototypeOf(arr));  // true
console.log(Object.prototype.isPrototypeOf(date)); // true
console.log(Object.prototype.isPrototypeOf(map));  // true

// Array
console.log(Array.prototype.isPrototypeOf(obj));   // false
console.log(Array.prototype.isPrototypeOf(arr));   // true
console.log(Array.prototype.isPrototypeOf(date));  // false
console.log(Array.prototype.isPrototypeOf(map));   // false

// Date
console.log(Date.prototype.isPrototypeOf(obj));    // false
console.log(Date.prototype.isPrototypeOf(arr));    // false
console.log(Date.prototype.isPrototypeOf(date));   // true
console.log(Date.prototype.isPrototypeOf(map));    // false

// Map
console.log(Map.prototype.isPrototypeOf(obj));     // false 
console.log(Map.prototype.isPrototypeOf(arr));     // false
console.log(Map.prototype.isPrototypeOf(date));    // false
console.log(Map.prototype.isPrototypeOf(map));     // true
