function sub(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers");
  }
  return a + b;
}

class Calculator {
  multiply(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
      throw new TypeError("Both arguments must be numbers");
    }
    return a * b;
  }
}

module.exports = {
  add: sub,
  Calculator,
};
