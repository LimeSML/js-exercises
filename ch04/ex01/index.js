export const add = function (o1, o2) {
  if (!isValidComplex(o1)) {
    throw new TypeError("o1 is not a valid complex number");
  }
  if (!isValidComplex(o2)) {
    throw new TypeError("o2 is not a valid complex number");
  }

  return {
    real: o1.real + o2.real,
    imaginary: o1.imaginary + o2.imaginary,
  };
};

export const sub = function (o1, o2) {
  if (!isValidComplex(o1)) {
    throw new TypeError("o1 is not a valid complex number");
  }
  if (!isValidComplex(o2)) {
    throw new TypeError("o2 is not a valid complex number");
  }

  return {
    real: o1.real - o2.real,
    imaginary: o1.imaginary - o2.imaginary,
  };
};

export const mul = function (o1, o2) {
  if (!isValidComplex(o1)) {
    throw new TypeError("o1 is not a valid complex number");
  }
  if (!isValidComplex(o2)) {
    throw new TypeError("o2 is not a valid complex number");
  }

  return {
    real: o1.real * o2.real - o1.imaginary * o2.imaginary,
    imaginary: o1.imaginary * o2.real + o1.real * o2.imaginary,
  };
};

export const div = function (o1, o2) {
  if (!isValidComplex(o1)) {
    throw new TypeError("o1 is not a valid complex number");
  }
  if (!isValidComplex(o2)) {
    throw new TypeError("o2 is not a valid complex number");
  }
  if (o2.real === 0 && o2.imaginary === 0) {
    throw new TypeError("Cannot divide by zero");
  }

  const denominator = o2.real * o2.real + o2.imaginary * o2.imaginary;

  return {
    real: (o1.real * o2.real + o1.imaginary * o2.imaginary) / denominator,
    imaginary: (o1.imaginary * o2.real - o1.real * o2.imaginary) / denominator,
  };
};

const isValidComplex = function (o) {
  if (!o) {
    return false;
  }
  if (typeof o !== "object") {
    return false;
  }
  if (!("real" in o)) {
    return false;
  }
  if (!("imaginary" in o)) {
    return false;
  }
  if (typeof o.real !== "number") {
    return false;
  }
  if (typeof o.imaginary !== "number") {
    return false;
  }
  if (!isFinite(o.real)) {
    return false;
  }
  if (!isFinite(o.imaginary)) {
    return false;
  }

  return true;
};
