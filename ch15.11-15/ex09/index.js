// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
startButton.disabled = false;
const pauseButton = document.querySelector("#pause");
pauseButton.disabled = true;

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

const socket = new WebSocket("ws://localhost:3003");
socket.addEventListener("message", (event) => {
  let data;
  try {
    data = JSON.parse(event.data);
  } catch (err) {
    console.error("Failed to parse message data:", err);
    return;
  }

  switch (data.type) {
    case "update": {
      renderGrid(data.grid);
      break;
    }
    case "pause": {
      pauseButton.disabled = true;
      startButton.disabled = false;
      break;
    }
    case "start": {
      pauseButton.disabled = false;
      startButton.disabled = true;
      break;
    }
    default:
      console.warn("Unknown message type:", data.type);
  }
});

function renderGrid(grid) {
  if (!(Array.isArray(grid) && grid.length === ROWS && Array.isArray(grid[0]) && grid[0].length === COLS)) {
    console.error("Invalid grid data");
    return;
  }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

canvas.addEventListener("click", function (evt) {
  if (socket.readyState !== WebSocket.OPEN) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  
  socket.send(JSON.stringify({ type: "toggle", row, col }));
});

startButton.addEventListener("click", () => {
  if (socket.readyState !== WebSocket.OPEN) {
    return;
  }
  socket.send(JSON.stringify({ type: "start" }));
});

pauseButton.addEventListener("click", () => {
  if (socket.readyState !== WebSocket.OPEN) {
    return;
  }
  socket.send(JSON.stringify({ type: "pause" }));
});
