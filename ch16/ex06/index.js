import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToTruncate = path.join(__dirname, "empty.txt");

fs.truncate(fileToTruncate, 10, (err) => {
  if (err) {
    console.error("Error truncating file:", err);
  } else {
    console.log("File truncated successfully.");
  }
});