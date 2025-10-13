for (let i = 1; i < 101; i++) {
  if (!(i % 15)) {
    console.log("FizzBuzz");
    continue;
  }
  if (!(i % 3)) {
    console.log("Fizz");
    continue;
  }
  if (!(i % 5)) {
    console.log("Buzz");
    continue;
  }
  console.log(i);
}
//console.log(i % 15 ? (i % 3 ? (i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz");
