function isPrime(n) {
  if (typeof n !== "number" || !Number.isInteger(n)) {
    throw new TypeError("input must be an integer");
  }

  if (n <= 1) {
    return false;
  }
  if (n === 2) {
    return true;
  }
  if (n % 2 === 0) {
    return false;
  }

  const sqrt = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function* counterGenerator() {
  let count = 0;
  while (true) {
    try {
      yield count++;
    } catch (e) {
      count = 0;
    }
  }
}

export function* primes() {
  const counter = counterGenerator();
  while (true) {
    const { value: num } = counter.next();
    if (isPrime(num)) {
      yield num;
    }
  }
}

const primeGen = primes();
console.log(primeGen.next());
console.log(primeGen.next());
console.log(primeGen.next());
console.log(primeGen.next());
console.log(primeGen.next());
console.log(primeGen.next());

// { value: 2, done: false }
// { value: 3, done: false }
// { value: 5, done: false }
// { value: 7, done: false }
// { value: 11, done: false }
// { value: 13, done: false }
