import fs from "fs";

const MAX_FILE_SIZE_GB = 1;

function checkFileSize(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File not found");
  }

  const stats = fs.statSync(filePath);
  const fileSizeGb = stats.size / 1024 ** 3;

  if (fileSizeGb > MAX_FILE_SIZE_GB) {
    throw new FileSizeError(
      `File size ${fileSizeGb.toFixed(
        2,
      )}GB exceeds max allowed ${MAX_FILE_SIZE_GB}GB`,
      fileSizeGb,
    );
  }

  // console.log(stats);
}

class FileSizeError extends Error {
  constructor(message, fileSizeGb) {
    super(message);
    this.fileSizeGb = fileSizeGb;
    this.name = "FileSizeError";
  }
}

checkFileSize("/home/raimuhoshi/js-exercises/package.json");
