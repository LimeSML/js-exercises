export function fizzbuzz() {
  let answer = "";
  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      answer += "FizzBuzz\n";
    } else if (i % 3 === 0) {
      answer += "Fizz\n";
    } else if (i % 5 === 0) {
      answer += "Buzz\n";
    } else {
      answer += `${i}\n`;
    }
  }
  return answer;
}
