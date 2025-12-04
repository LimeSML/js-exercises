const ws = new WebSocket("ws://localhost:3003");

const pendingRequests = new Map();

ws.onmessage = (event) => {
  try {
    const message = JSON.parse(event.data);
    const id = message.id;
    if (id && pendingRequests.has(id)) {
      const { resolve } = pendingRequests.get(id);
      resolve(message.body);
      pendingRequests.delete(id);
    }
  } catch (err) {
    console.error("JSON parse error:", event.data);
  }
};

ws.onclose = () => {
  for (const { reject } of pendingRequests.values()) {
    reject(new Error("WebSocket closed"));
  }
  pendingRequests.clear();
};

export function sendRequest(body, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const id = crypto.randomUUID();
    pendingRequests.set(id, { resolve, reject });

    ws.send(JSON.stringify({ id, body }));

    const timer = setTimeout(() => {
      if (pendingRequests.has(id)) {
        pendingRequests.delete(id);
        reject(new Error("Timeout"));
      }
    }, timeout);

    // resolve または reject されたらタイマーをクリア
    const originalResolve = resolve;
    resolve = (res) => {
      clearTimeout(timer);
      originalResolve(res);
    };
  });
}
