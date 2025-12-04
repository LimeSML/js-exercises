const ws = new WebSocket("ws://localhost:3003");

ws.onmessage = (event) => {
  try {
    const message = JSON.parse(event.data);
    if (message.id && message.body) {
      // リクエスト本文の先頭に "Hello, " を付けて返信
      ws.send(JSON.stringify({ id: message.id, body: `Hello, ${message.body}` }));
    }
  } catch (err) {
    console.error("Invalid message:", event.data);
  }
};
