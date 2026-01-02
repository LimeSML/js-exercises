import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

function serve(rootDirectory, port) {
  const server = new http.Server();
  server.listen(port);
  console.log(`Listening on http://localhost:${port}/`);

  server.on("request", async (request, response) => {
    const endpoint = url.parse(request.url).pathname;

    if (endpoint === "/test/mirror") {
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.writeHead(200);
      response.write(
        `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`
      );

      const headers = request.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
      }
      response.write("\r\n");

      request.pipe(response);
      return;
    }

    let filename = endpoint.substring(1);
    filename = filename.replace(/\.\.\//g, "");
    filename = path.resolve(rootDirectory, filename);

    // アップロード
    if (request.method === "PUT") {
      // 親ディレクトリを作成
      await fs.promises.mkdir(path.dirname(filename), { recursive: true });

      const out = fs.createWriteStream(filename);
      request.pipe(out);
      
      out.on("finish", () => {
        response.writeHead(201);
        response.end("Uploaded\n");
      });

      out.on("error", (err) => {
        response.writeHead(500);
        response.end(err.message);
      });

      return;
    }

    // ダウンロード
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
    }

    const stream = fs.createReadStream(filename);
    stream.once("readable", () => {
      response.setHeader("Content-Type", type);
      response.writeHead(200);
      stream.pipe(response);
    });

    stream.on("error", (err) => {
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.writeHead(404);
      response.end(err.message);
    });
  });
}

serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
