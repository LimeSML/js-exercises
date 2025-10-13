import { promisifiedReadDir, promisifiedStat } from "./index";
import * as fs from "node:fs";
import * as path from "node:path";

describe("promisifiedReadDir", () => {
  const testDir = path.join(__dirname, "testDir");
  const testFile = path.join(testDir, "file.txt");

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
    fs.writeFileSync(testFile, "test");
  });

  afterAll(() => {
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    if (fs.existsSync(testDir)) fs.rmdirSync(testDir);
  });

  it("should resolve with an array of filenames in the directory", async () => {
    const files = await promisifiedReadDir(testDir);
    expect(Array.isArray(files)).toBe(true);
    expect(files).toContain("file.txt");
  });

  it("should reject if directory does not exist", async () => {
    await expect(promisifiedReadDir("notExsit")).rejects.toThrow();
  });
});

describe("promisifiedStat", () => {
  const testDir = path.join(__dirname, "testDir");
  const testFile = path.join(testDir, "file.txt");

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir);
    }
    fs.writeFileSync(testFile, "hello");
  });

  afterAll(() => {
    if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
    if (fs.existsSync(testDir)) fs.rmdirSync(testDir);
  });

  it("should resolve with stats for a file", async () => {
    const stats = await promisifiedStat(testFile);
    expect(stats.isFile()).toBe(true);
    expect(stats.isDirectory()).toBe(false);
  });

  it("should resolve with stats for a directory", async () => {
    const stats = await promisifiedStat(testDir);
    expect(stats.isDirectory()).toBe(true);
    expect(stats.isFile()).toBe(false);
  });

  it("should reject if path does not exist", async () => {
    await expect(promisifiedStat("nonexistent_file")).rejects.toThrow();
  });
});
