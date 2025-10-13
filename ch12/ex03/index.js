export function* counterGenerator() {
  let count = 0;
  while (true) {
    try {
      yield count++;
    } catch (e) {
      count = 0;
    }
  }
}

const cntGen = counterGenerator();
console.log(cntGen.next());
console.log(cntGen.next());
console.log(cntGen.next());

// { value: 0, done: false }
// { value: 1, done: false }
// { value: 2, done: false }

console.log(cntGen.throw("error"));
console.log(cntGen.next());
console.log(cntGen.next());
console.log(cntGen.next());

// { value: 0, done: false }
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
