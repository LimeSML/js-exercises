import fs from 'fs';

export function checkEntry(path) {
  if (typeof path !== 'string') {
    throw new TypeError('path must be a string');
  }
  
  try {
    const stats = fs.statSync(path);
    if (stats.isFile()) {
      return "file";
    }
    if (stats.isDirectory()) {
      return "directory";
    }
    return "other";
  } catch (err) {
    if (err.code === "ENOENT") {
      return "notfound";
    }
    throw err;
  }
}

console.log(checkEntry('index.test.js'));
console.log(checkEntry('dir')); 
console.log(checkEntry('file'));