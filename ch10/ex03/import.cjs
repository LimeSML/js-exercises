const { add, Calculator } = require('./export.cjs');

console.log("2 + 3 =", add(2, 3));

const calc = new Calculator();
console.log("4 × 5 =", calc.multiply(4, 5));