import net from "net";
import querystring from "querystring";

const FORM_HTML = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Greeting Form</title>
  </head>
  <body>
    <form action="/greeting" method="POST">
      <label for="greeting">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="text" id="greeting" name="greeting" />
      <button type="submit">Submit</button>
    </form>
  </body>
</html>`;

function response(socket, status, body = "", contentType = "text/html; charset=utf-8") {
  socket.write(
    `HTTP/1.1 ${status}\r\n` +
    `Content-Type: ${contentType}\r\n` +
    `Content-Length: ${Buffer.byteLength(body)}\r\n` +
    `\r\n` +
    body
  );
  socket.end();
}

const server = net.createServer();
server.on("connection", (socket) => {
  let data = "";

  socket.on("data", (chunk) => {
    data += chunk.toString();

    // ヘッダが揃うまで待つ
    if (!data.includes("\r\n\r\n")) {
      return;
    }

    const [header, body] = data.split("\r\n\r\n");
    const lines = header.split("\r\n");
    const [method, path] = lines[0].split(" ");

    // GET 
    if (path === "/") {
      if (method !== "GET") {
        response(socket, "405 Method Not Allowed");
        return;
      }
      response(socket, "200 OK", FORM_HTML);
      return;
    }

    // POST /greeting
    if (path === "/greeting") {
      if (method !== "POST") {
        response(socket, "405 Method Not Allowed");
        return;
      }

      const params = querystring.parse(body);
      const html = `
        <!doctype html>
        <html lang="ja">
          <head><meta charset="UTF-8"></head>
          <body>
            <h1>${params.greeting} ${params.name}</h1>
            <a href="/">back</a>
          </body>
        </html>
      `;

      response(socket, "200 OK", html);
      return;
    }

    // 未対応パス
    response(socket, "404 Not Found");
  });
});

server.listen(8000, () => {
  console.log("Listening on http://localhost:8000");
});
