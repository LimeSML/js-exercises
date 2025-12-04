"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  button.disabled = true;
  const message = new EventSource("http://localhost:3000/message");
  message.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);
      const value = data.value;
      const done = data.done;
      if (done) {
        message.close();
        button.disabled = false;
      }
      messageElement.textContent += value;
    } catch (err) {
      console.error("Failed to parse message data as JSON:", err);
    }
  });
}
