// import fs from "fs";

// // NOTE: file.txt の内容をアップロード
// console.log("before:", process.memoryUsage().rss);

// await fetch("http://localhost:8000/foo/bar/hello.bin", {
//   method: "PUT",
//   body: fs.createReadStream("bigfile.bin"),
//   duplex: "half",
// });

// console.log("after:", process.memoryUsage().rss);

// before: 48373760
// after: 181415936

import fs from "fs/promises";

console.log("before:", process.memoryUsage().rss);

const buffer = await fs.readFile("bigfile.bin");
await fetch("http://localhost:8000/foo/bar/hello.bin", {
  method: "PUT",
  body: buffer,
  duplex: "half",
});

console.log("after:", process.memoryUsage().rss);

// before: 47857664
// after: 374231040