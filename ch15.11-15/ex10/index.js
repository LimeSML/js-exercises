document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

    const worker = new Worker("gaussian-worker.js");
    worker.postMessage({
      width: img.width,
      height: img.height,
      // ArrayBuffer として送る
      data: imageData.data.buffer,
    }, [imageData.data.buffer]);

    worker.onmessage = (event) => {
      const outputBuffer = event.data;
      const outputData = new Uint8ClampedArray(outputBuffer);
      const outputImageData = new ImageData(outputData, img.width, img.height);

      filteredCtx.putImageData(outputImageData, 0, 0);
      worker.terminate();
    };
  });

  reader.readAsDataURL(file);
});

// メインスレッドでボールを動かす
const ball = document.querySelector("#ball");
let x = 0;
function animate() {
  x += 2;
  ball.style.left = `${x}px`;
  if (x > window.innerWidth) {
    x = 0;
  }
  requestAnimationFrame(animate);
}
animate();