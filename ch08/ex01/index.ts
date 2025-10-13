// 自然数nと英数文字cを引数にとり、文字cをn回コンソール出力してから文字cをn個含む配列を返す
// 引数を2つ受け取るため、括弧の省略はできない
// return文だけの処理でないため、return、セミコロン、中括弧は省略できない
export const repeatChar = (n: number, c: string): string[] => {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer");
  }
  if (!/^[a-zA-Z0-9]$/.test(c)) {
    throw new Error("c must be a single alphanumeric character");
  }

  for (let i = 0; i < n; i++) {
    console.log(c);
  }
  return new Array(n).fill(c);
};

// 数値xを引数にとり、xの二乗の数値を返す
// 引数を1つ受け取るため、JS的には括弧の省略が可能だが、TSでは省略できない
// return文だけの処理のため、return、セミコロン、中括弧は省略できる
export const square = (x: number) => x * x;

// 引数なしで、現在時刻のプロパティnowを含むオブジェクトを返す
// 引数を受け取らないため、括弧を省略できない
// return文だけの処理のため、return、セミコロン、中括弧は省略できる
// ただし、オブジェクトリテラルを返すため、オブジェクトリテラルの前に丸括弧をつける必要がある
export const getNow = () => ({ now: new Date().toLocaleString() });
