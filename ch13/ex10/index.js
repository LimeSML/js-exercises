import * as fsPromises from "node:fs/promises";
import { join } from "path";

export async function fetchSumOfFileSizes(path) {
  const files = await fsPromises.readdir(path);

  const stats = await Promise.all(
    files.map((file) => fsPromises.stat(join(path, file))),
  );

  return stats.reduce((total, stat) => total + stat.size, 0);
}
