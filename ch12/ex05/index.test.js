import { readLines } from "./index";
import { writeFileSync, unlinkSync } from "node:fs";

const TEST_FILE = "./ch12/ex05/test_sample.txt";

beforeEach(() => {
  writeFileSync(TEST_FILE, "line1\nline2\nline3");
});

afterEach(() => {
  unlinkSync(TEST_FILE);
});

describe("readLines", () => {
  it("should return each line from the file", () => {
    const lines = [...readLines(TEST_FILE)];
    expect(lines).toEqual(["line1", "line2", "line3"]);
  });

  it("should handle files with only one line", () => {
    writeFileSync(TEST_FILE, "singleline");
    const lines = [...readLines(TEST_FILE)];
    expect(lines).toEqual(["singleline"]);
  });

  it("should handle empty files", () => {
    writeFileSync(TEST_FILE, "");
    const lines = [...readLines(TEST_FILE)];
    expect(lines).toEqual([]);
  });

  it("should throw TypeError if filePath is not a string", () => {
    expect(() => [...readLines(123)]).toThrow(TypeError);
    expect(() => [...readLines(null)]).toThrow(TypeError);
    expect(() => [...readLines({})]).toThrow(TypeError);
  });
});
