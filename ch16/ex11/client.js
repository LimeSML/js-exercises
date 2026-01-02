// client.js
import net from "net";

const sockets = [];
let success = 0;
let failed = 0;

function connect() {
  const socket = net.createConnection({ port: 8000 });

  socket.on("connect", () => {
    success++;
    sockets.push(socket);

    if (success % 100 === 0) {
      console.log("connected:", success);
    }

    setImmediate(connect);
  });

  socket.on("error", (err) => {
    failed++;
    console.error("FAILED at", success + failed, err.code);
    console.log("success:", success, "failed:", failed);
  });
}

connect();
