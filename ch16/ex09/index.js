// const http = require("http");
// const url = require("url");
// const path = require("path");
// const fs = require("fs/promises");

// import http from "http";
// import url from "url";
// import path from "path";
// import fs from "fs";

// function serve(rootDirectory, port) {
//   const server = new http.Server();
//   server.listen(port);
//   console.log(`Listening on http://localhost:${port}/`);

//   server.on("request", (request, response) => {
//     const endpoint = url.parse(request.url).pathname;

//     if (endpoint === "/test/mirror") {
//       response.setHeader("Content-Type", "text/plain; charset=utf-8");
//       response.writeHead(200);
//       response.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);

//       const headers = request.rawHeaders;
//       for (let i = 0; i < headers.length; i += 2) {
//         response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
//       }
//       response.write("\r\n");
      
//       request.pipe(response);
//     } else {
//       let filename = endpoint.substring(1); // 先頭の "/" を取り除く
//       filename = filename.replace(/\.\.\//g, "");
//       filename = path.resolve(rootDirectory, filename);

//       let type;
//       switch (path.extname(filename)) {
//         case ".html":
//         case ".htm":
//           type = "text/html";
//           break;
//         case ".js":
//           type = "text/javascript";
//           break;
//         case ".css":
//           type = "text/css";
//           break;
//         case ".png":
//           type = "image/png";
//           break;
//         case ".txt":
//           type = "text/plain";
//           break;
//         default:
//           type = "application/octet-stream";
//           break;
//       }

//       const stream = fs.createReadStream(filename);
//       stream.once("readable", () => {
//         response.setHeader("Content-Type", type);
//         response.writeHead(200);
//         stream.pipe(response);
//       });

//       stream.on("error", (err) => {
//         response.setHeader("Content-Type", "text/plain; charset=utf-8");
//         response.writeHead(404);
//         response.end(err.message);
//       });
//     }
//   });
// }

// serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);

import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serve(rootDirectory, port) {
  const app = express();

  console.log(`Listening on http://localhost:${port}/`);

  // /test/mirror
  app.all("/test/mirror", (request, response) => {
    response.set("Content-Type", "text/plain; charset=utf-8");
    response.status(200);

    response.write(
      `${request.method} ${request.originalUrl} HTTP/${request.httpVersion}\r\n`
    );

    for (const [key, value] of Object.entries(request.headers)) {
      response.write(`${key}: ${value}\r\n`);
    }

    response.write("\r\n");

    request.pipe(response);
  });

  // 静的ファイル配信
  app.use(async (req, res) => {
    let filename = req.path.substring(1); // 先頭の "/" を取り除く
    filename = filename.replace(/\.\.\//g, "");
    filename = path.resolve(rootDirectory, filename);

    let type;
    switch (path.extname(filename)) {
      case ".html":
      case ".htm":
        type = "text/html";
        break;
      case ".js":
        type = "text/javascript";
        break;
      case ".css":
        type = "text/css";
        break;
      case ".png":
        type = "image/png";
        break;
      case ".txt":
        type = "text/plain";
        break;
      default:
        type = "application/octet-stream";
        break;
    }

    const stream = fs.createReadStream(filename);

    stream.once("open", () => {
      res.set("Content-Type", type);
      res.status(200);
      stream.pipe(res);
    });

    stream.on("error", (err) => {
      res.set("Content-Type", "text/plain; charset=utf-8");
      res.status(404);
      res.send(err.message);
    });
  });

  app.listen(port);
}

serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);