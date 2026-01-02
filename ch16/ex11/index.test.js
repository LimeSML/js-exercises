import net from "net";
import querystring from "querystring";

let serverInstance;

beforeEach(() => {
  serverInstance = net.createServer();
});

afterEach(() => {
  if (serverInstance) {
    serverInstance.close();
  }
});

describe("HTTP Server", () => {
  test("GET / returns 200 OK with form HTML", (done) => {
    const socket = net.createConnection({ port: 8000 }, () => {
      socket.write("GET / HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    let response = "";
    socket.on("data", (chunk) => {
      response += chunk.toString();
      if (response.includes("</html>")) {
        expect(response).toContain("HTTP/1.1 200 OK");
        expect(response).toContain("Greeting Form");
        socket.destroy();
        done();
      }
    });
  });

  test("POST /greeting returns 200 OK with greeting message", (done) => {
    const postData = querystring.stringify({ name: "Raimu", greeting: "Hello" });
    const socket = net.createConnection({ port: 8000 }, () => {
      socket.write(
        `POST /greeting HTTP/1.1\r\nHost: localhost\r\nContent-Length: ${postData.length}\r\n\r\n${postData}`
      );
    });

    let response = "";
    socket.on("data", (chunk) => {
      response += chunk.toString();
      if (response.includes("</html>")) {
        expect(response).toContain("HTTP/1.1 200 OK");
        expect(response).toContain("Hello Raimu");
        socket.destroy();
        done();
      }
    });
  });

  test("POST / returns 405 Method Not Allowed", (done) => {
    const socket = net.createConnection({ port: 8000 }, () => {
      socket.write("POST / HTTP/1.1\r\nHost: localhost\r\nContent-Length: 0\r\n\r\n");
    });

    let response = "";
    socket.on("data", (chunk) => {
      response += chunk.toString();
      expect(response).toContain("HTTP/1.1 405 Method Not Allowed");
      socket.destroy();
      done();
    });
  });

  test("GET /greeting returns 405 Method Not Allowed", (done) => {
    const socket = net.createConnection({ port: 8000 }, () => {
      socket.write("GET /greeting HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    let response = "";
    socket.on("data", (chunk) => {
      response += chunk.toString();
      expect(response).toContain("HTTP/1.1 405 Method Not Allowed");
      socket.destroy();
      done();
    });
  });

  test("GET /unknown returns 404 Not Found", (done) => {
    const socket = net.createConnection({ port: 8000 }, () => {
      socket.write("GET /unknown HTTP/1.1\r\nHost: localhost\r\n\r\n");
    });

    let response = "";
    socket.on("data", (chunk) => {
      response += chunk.toString();
      expect(response).toContain("HTTP/1.1 404 Not Found");
      socket.destroy();
      done();
    });
  });
});