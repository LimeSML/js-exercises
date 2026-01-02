import crypto from "crypto";
import fs from "fs/promises";

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  // 32 * 8 = 256ビット
  return crypto.randomBytes(32);
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  const iv = crypto.randomBytes(16);

  // 暗号化とBase64エンコード
  // 暗号化オブジェクトを生成
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    key,
    iv
  );

  // 文字列をUTF-8のバイト列に変換
  const plainBuffer = Buffer.from(text, "utf8");
  // 平文バイト列を暗号化できる分だけ暗号化する
  const encryptedPart = cipher.update(plainBuffer);
  // 残っているデータとパディングを処理し、暗号化を確定させる
  const encryptedFinal = cipher.final();
  // 暗号文を結合
  const encryptedBuffer = Buffer.concat([
    encryptedPart,
    encryptedFinal,
  ]);
  // 暗号文（バイト列）を Base64 文字列にエンコード
  const encryptedBase64 = encryptedBuffer.toString("base64");

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  await fs.writeFile(
    "key.json",
    JSON.stringify({ key: key.toString("base64") }),
    "utf8"
  );
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  await fs.writeFile(
    "encrypted.json",
    JSON.stringify(data),
    "utf8"
  );
}

async function readKey() {
  const json = await fs.readFile("key.json", "utf8");
  const obj = JSON.parse(json);
  // Base64 文字列をバイト列にデコードして返す
  return Buffer.from(obj.key, "base64");
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  const json = await fs.readFile("encrypted.json", "utf8");
  return JSON.parse(json);
}

// 復号して平文を返す
function decrypt64(data, key) {
  const iv = Buffer.from(data.iv, "base64");
  
  // 復号オブジェクトを生成
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    iv
  );
  
  const encrypted = Buffer.from(data.value, "base64");
  // 復号化できる分だけ復号化する
  const decryptedPart = decipher.update(encrypted);
  // 残っているデータとパディングを処理し、復号化を確定させる
  const decryptedFinal = decipher.final();
  // 復号文を結合
  const decryptedBuffer = Buffer.concat([
    decryptedPart,
    decryptedFinal,
  ]);

  return decryptedBuffer.toString("utf8");
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();