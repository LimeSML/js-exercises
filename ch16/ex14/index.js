import fs from "fs";
import { PNG } from "pngjs";
import { Worker } from "worker_threads";

const INPUT_PATH = "Lenna.png";
const OUTPUT_PATH = "output.png";

fs.createReadStream(INPUT_PATH)
  .pipe(new PNG())
  .on("parsed", function () {
    const worker = new Worker("./gaussian-worker.js");

    worker.postMessage({
      width: this.width,
      height: this.height,
      data: this.data.buffer
    }, [this.data.buffer]);

    worker.on("message", (event) => {
      const outputData = new Uint8ClampedArray(event);
      const outputPng = new PNG({ width: this.width, height: this.height });
      outputPng.data = Buffer.from(outputData);

      outputPng
        .pack()
        .pipe(fs.createWriteStream(OUTPUT_PATH))
        .on("finish", () => {
          console.log("Gaussian blur applied and saved to", OUTPUT_PATH);
        });

      worker.terminate();
    });
  });
