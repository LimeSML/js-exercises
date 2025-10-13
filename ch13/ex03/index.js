import * as util from "node:util";
import * as fs from "node:fs";

export const promisifiedReadDir = util.promisify(fs.readdir);
export const promisifiedStat = util.promisify(fs.stat);

promisifiedReadDir("./ch13/ex03")
  .then((files) => console.log(files))
  .then(() => promisifiedReadDir("./ch13/ex03/testDir"))
  .then((files) => console.log(files));

promisifiedStat("./ch13/ex03").then((stats) =>
  console.log(stats.isFile(), stats.isDirectory()),
);
