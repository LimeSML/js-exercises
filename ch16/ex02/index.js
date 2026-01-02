import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く

// トラップするシグナル
const signals = ["SIGINT", "SIGTERM"];
signals.forEach((sig) => {
  process.on(sig, async () => {
    if (child) {
      console.log(`Parent received ${sig}, forwarding to child...`);
      // 同じシグナルを子に送る
      child.kill(sig);

      const { signal } = await new Promise((res) => {
        child.once("close", (code, signal) => {
          res({ code, signal });
        });
      });

      // 子が「そのシグナル」で死んだことを確認
      if (signal === sig) {
        console.log(`Child process terminated with signal: ${signal}`);
      } else {
        console.error("Child process did not terminate with the expected signal.");
      }
    }

    process.exit(0);
  });
});

while (true) {
  const { code, signal } = await startChild();

  // 異常終了 → 再起動
  if (code !== 0) {
    console.log("Restarting child process...");
    continue;
  }

  // 正常終了 → 親も終了
  console.log("Child process exited normally.");
  process.exit(0);
}