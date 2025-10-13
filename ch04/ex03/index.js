function add(a, b) {
  // ここでの !== などの使用は許してください...
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers");
  }
  if (!isFinite(a) || !isFinite(b)) {
    throw new TypeError("Both arguments must be finite numbers");
  }

  let sum = a;
  let carry = b;

  // リプルキャリーアダーのアルゴリズムを使用して加算
  while (carry & carry) {
    // carry !== 0 をビット演算に置き換え
    const temp = sum ^ carry;
    carry = (sum & carry) << 1;
    sum = temp;
  }

  return sum;
}

export function sub(a, b) {
  // ここでの !== などの使用は許してください...
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers");
  }
  if (!isFinite(a) || !isFinite(b)) {
    throw new TypeError("Both arguments must be finite numbers");
  }

  // 右側のオペランドを2の補数に変換
  b = ~b;
  b = add(b, 1);

  // 加算
  return add(a, b);
}
