// 参考：https://qiita.com/takaminmin/items/698dad16a0d3a654b7e5#3-sha-256%E3%81%AE%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0

const H0 = [
  0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
  0x1f83d9ab, 0x5be0cd19,
];

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

function padding(message) {
  if (typeof message !== "string") {
    throw new TypeError("message must be a string");
  }

  // メッセージをASCIIコードの配列に変換
  const asciiCodes = message.split("").map((char) => char.charCodeAt(0));
  const messageLength = asciiCodes.length;

  // 1ビット目が1で残りが0の64バイトのパディングベース
  const paddingBlock = new Array(64).fill(0);
  paddingBlock[0] = 0x80;

  // メッセージバイト配列のコピー
  let paddedMessage = asciiCodes.concat();

  // 56バイトに満たない分だけパディング追加（メッセージ長フィールド除く）
  if (messageLength % 64 < 56) {
    paddedMessage = paddedMessage.concat(
      paddingBlock.slice(0, 56 - (messageLength % 64)),
    );
  } else {
    paddedMessage = paddedMessage.concat(
      paddingBlock.slice(0, 64 + 56 - (messageLength % 64)),
    );
  }

  // メッセージ長をビット単位に変換
  const messageBitLength = messageLength * 8;

  // 64ビットでメッセージ長を格納する配列
  const lengthBytes = new Array(8).fill(0);

  // JavaScriptは32ビット整数までしか扱えないため高位部分はゼロ
  lengthBytes[4] = (messageBitLength & 0xff000000) >>> 24;
  lengthBytes[5] = (messageBitLength & 0x00ff0000) >>> 16;
  lengthBytes[6] = (messageBitLength & 0x0000ff00) >>> 8;
  lengthBytes[7] = messageBitLength & 0x000000ff;

  // パディング済みメッセージにメッセージ長を追加
  paddedMessage = paddedMessage.concat(lengthBytes);

  return paddedMessage;
}

function rotr(x, n) {
  return (x >>> n) | (x << (32 - n));
}

function shr(x, n) {
  return x >>> n;
}

function ch(x, y, z) {
  return (x & y) ^ (~x & z);
}

function maj(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}

function sigma0(x) {
  return rotr(x, 7) ^ rotr(x, 18) ^ shr(x, 3);
}

function sigma1(x) {
  return rotr(x, 17) ^ rotr(x, 19) ^ shr(x, 10);
}

function SIGMA0(x) {
  return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22);
}

function SIGMA1(x) {
  return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25);
}

function compute(paddedMessage) {
  if (!Array.isArray(paddedMessage) || paddedMessage.length % 64 !== 0) {
    throw new Error(
      "paddedMessage must be an array with length multiple of 64",
    );
  }

  // メッセージを N 個のメッセージブロック M^(0), ..., M^(N) に分割
  const N = paddedMessage.length / 64;
  const W = [];
  const H = [];
  for (let i = 0; i < H0.length; i++) {
    H[i] = H0[i];
  }

  // 各メッセージブロックに対して処理
  for (let i = 1; i <= N; i++) {
    for (let t = 0; t < 64; t++) {
      if (t < 16) {
        // W[t] のスタートライン
        let p = (i - 1) * 64 + t * 4;
        // 8 ビットずつ左につめて、32 ビットの M_t^(i) を作成.
        W[t] =
          (paddedMessage[p] << 24) +
          (paddedMessage[p + 1] << 16) +
          (paddedMessage[p + 2] << 8) +
          paddedMessage[p + 3];
      } else {
        W[t] =
          (sigma1(W[t - 2]) + W[t - 7] + sigma0(W[t - 15]) + W[t - 16]) &
          0xffffffff;
      }
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];
    let f = H[5];
    let g = H[6];
    let h = H[7];

    for (let t = 0; t < 64; t++) {
      const T1 = (h + SIGMA1(e) + ch(e, f, g) + K[t] + W[t]) & 0xffffffff;
      const T2 = (SIGMA0(a) + maj(a, b, c)) & 0xffffffff;
      h = g;
      g = f;
      f = e;
      e = (d + T1) & 0xffffffff;
      d = c;
      c = b;
      b = a;
      a = (T1 + T2) & 0xffffffff;
    }

    // ハッシュ値を符号なし32ビット整数に変換
    H[0] = (a + H[0]) >>> 0;
    H[1] = (b + H[1]) >>> 0;
    H[2] = (c + H[2]) >>> 0;
    H[3] = (d + H[3]) >>> 0;
    H[4] = (e + H[4]) >>> 0;
    H[5] = (f + H[5]) >>> 0;
    H[6] = (g + H[6]) >>> 0;
    H[7] = (h + H[7]) >>> 0;
  }

  // ハッシュ値を16進数表現に変換して返す
  return H.map((value) => value.toString(16).padStart(8, "0")).join("");
}

function generateHash(message) {
  if (typeof message !== "string") {
    throw new TypeError("message must be a string");
  }
  if (message.length === 0) {
    throw new Error("message must not be empty");
  }

  const paddedMessage = padding(message);
  const hash = compute(paddedMessage);
  return hash;
}

export class HashTable {
  #size = 0;
  #entries;

  get size() {
    return this.#size;
  }

  constructor(capacity) {
    if (capacity <= 0 || !Number.isInteger(capacity)) {
      throw new Error("capacity must be a positive integer");
    }
    this.#entries = new Array(capacity).fill(null);
  }

  get(key) {
    if (typeof key !== "string") {
      throw new TypeError("key must be a string");
    }

    const index = generateHash(key) % this.#entries.length;
    let entry = this.#entries[index];

    while (entry) {
      if (entry.key === key) {
        return entry.value;
      }
      entry = entry.next;
    }

    return undefined;
  }

  put(key, value) {
    if (typeof key !== "string") {
      throw new TypeError("key must be a string");
    }
    if (value === undefined) {
      throw new TypeError("value must not be undefined");
    }

    const index = generateHash(key) % this.#entries.length;
    let entry = this.#entries[index];

    // 新しいエントリの作成
    if (!entry) {
      this.#entries[index] = { key, value, next: undefined };
      this.#size++;
      return;
    }

    let prev = null;
    while (entry) {
      // 既存のキーが見つかった場合、値を更新
      if (entry.key === key) {
        entry.value = value;
        return;
      }
      prev = entry;
      entry = entry.next;
    }

    prev.next = { key, value, next: undefined };
    this.#size++;
  }

  remove(key) {
    if (typeof key !== "string") {
      throw new TypeError("key must be a string");
    }

    const index = generateHash(key) % this.#entries.length;
    let entry = this.#entries[index];
    let prev = null;

    while (entry) {
      if (entry.key === key) {
        if (prev) {
          prev.next = entry.next;
        } else {
          this.#entries[index] = entry.next;
        }
        this.#size--;
        return true;
      }
      prev = entry;
      entry = entry.next;
    }

    return false;
  }
}

const hashTable = new HashTable(10);
hashTable.put("key1", "value1");
hashTable.put("key2", { value: "value2" });

console.log(`size=${hashTable.size}`); // => size=2
console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

hashTable.put("key2", "new value");

console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

hashTable.remove("key2");

console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
console.log(`size=${hashTable.size}`); // => size=1
