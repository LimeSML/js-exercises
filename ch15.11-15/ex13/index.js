const messageContainer = document.getElementById("message-container");
const messageTextarea = document.querySelector("#message-textarea");
const sendButton = document.querySelector("#send-button");
sendButton.addEventListener("click", async () => {
  const message = messageTextarea.value;
  if (message.trim() === "") {
    return;
  }

  messageTextarea.disabled = true;
  sendButton.disabled = true;

  // 自分のメッセージを表示
  messageTextarea.value = "";
  const myMessageElement = document.createElement("div");
  myMessageElement.className = "message my";
  myMessageElement.textContent = message;
  messageContainer.appendChild(myMessageElement);

  // ollamaが回答したメッセージを表示
  const otherMessageElement = document.createElement("div");
  otherMessageElement.className = "message other";
  otherMessageElement.textContent = "";
  messageContainer.appendChild(otherMessageElement);

  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemma:2b",
        messages: [{ role: "user", content: message }],
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error("Response wa not ok");
    }

    // ストリームを読み込むため reader を取得
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      // 改行ごとに分割
      const lines = buffer.split("\n");
      // 最後の行はまだ不完全かもしれないので保持
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) {
          continue;
        }

        try {
          const data = JSON.parse(line);
          if (data?.message?.content) {
            otherMessageElement.textContent += data.message.content;
          }
        } catch (err) {
          console.error("JSON parse error:", err, line);
        }
      }
    }

    // 最後に残ったバッファを処理
    if (buffer.trim()) {
      try {
        const data = JSON.parse(buffer);
        if (data?.message?.content) {
          otherMessageElement.textContent += data.message.content;
        }
      } catch (err) {
        console.error("JSON parse error:", err);
      }
    }
  } catch (err) {
    console.error(err);
    otherMessageElement.textContent = "エラーが発生しました。";
  } finally {
    messageTextarea.disabled = false;
    sendButton.disabled = false;
  }
})