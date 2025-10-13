import { readdir, stat } from "node:fs/promises";

export async function* walk(rootPath) {
  if (typeof rootPath !== "string") {
    throw new TypeError("rootPath must be a string");
  }

  const stats = await stat(rootPath);
  if (stats.isDirectory()) {
    yield { path: rootPath, isDirectory: true };

    const entries = await readdir(rootPath);
    for (const entry of entries) {
      const fullPath = rootPath + "/" + entry;
      yield* walk(fullPath);
    }
  } else if (stats.isFile()) {
    yield { path: rootPath, isDirectory: false };
  }
}
