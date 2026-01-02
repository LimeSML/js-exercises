import iconv from "iconv-lite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToRead = path.join(__dirname, "hello.txt");

fs.createReadStream(fileToRead)
  .pipe(iconv.decodeStream("Shift_JIS"))
  .pipe(process.stdout);