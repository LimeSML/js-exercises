/* eslint-disable @typescript-eslint/no-explicit-any */

// const args = [];
// function call() {
//   args.push(Array.from(arguments));
// }

// call(1, 2, 3);
// call("A", "B");

// console.log(args[0]); // [1, 2, 3]
// console.log(args[1]); // ["A", "B"]

const args: any[] = [];
function call(...argments: any[]) {
  args.push(argments);
}

call(1, 2, 3);
call("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]
