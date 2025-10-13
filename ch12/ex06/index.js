import { readdirSync, statSync } from "node:fs";

export function* walk(rootPath) {
  if (typeof rootPath !== "string") {
    throw new TypeError("rootPath must be a string");
  }

  const stats = statSync(rootPath);
  if (stats.isDirectory()) {
    yield { path: rootPath, isDirectory: true };

    const entries = readdirSync(rootPath);
    for (const entry of entries) {
      const fullPath = rootPath + "/" + entry;
      yield* walk(fullPath);
    }
  } else if (stats.isFile()) {
    yield { path: rootPath, isDirectory: false };
  }
}

// const walkGen = walk('./ch12/ex06');
// console.log(walkGen.next());
// console.log(walkGen.next());
// console.log(walkGen.next());
// console.log(walkGen.next());
