/* eslint-disable @typescript-eslint/no-explicit-any */
function f(input: any) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

f("eval(console.log('実行されたよ'));");
f("(function () { console.log('即時実行されたよ');})();");
