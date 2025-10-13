class Example {
  valueOf() {
    return 0;
  }

  toString() {
    return "Example";
  }
}

let obj = new Example();
console.log(Number(obj));
console.log(String(obj));
