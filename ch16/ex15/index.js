import threads from "worker_threads";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (threads.isMainThread) {
  let num = 0;

  const worker = new threads.Worker(__filename);

  worker.on("message", (msg) => {
    if (msg === "inc") {
      num++;
    } else if (msg === "done") {
      console.log("Final num:", num);
    }
  });

  for (let i = 0; i < 10_000_000; i++) {
    num++;
  }

} else {
  for (let i = 0; i < 10_000_000; i++) {
    threads.parentPort.postMessage("inc");
  }

  threads.parentPort.postMessage("done");
}
