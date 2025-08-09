import sub, {add, Calculator as Calc } from './export.js';

console.log("5 - 2 =", sub(5, 2));
console.log("2 + 3 =", add(2, 3));

const calc = new Calc();
console.log("4 × 5 =", calc.multiply(4, 5));