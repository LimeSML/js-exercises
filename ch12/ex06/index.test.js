import { walk } from "./index";
import { readdirSync, statSync } from "node:fs";

jest.mock("node:fs");

describe("walk", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a file when rootPath is a file", () => {
    statSync.mockReturnValueOnce({
      isDirectory: () => false,
      isFile: () => true,
    });

    const result = [...walk("/some/file.txt")];
    expect(result).toEqual([{ path: "/some/file.txt", isDirectory: false }]);
    expect(statSync).toHaveBeenCalledWith("/some/file.txt");
  });

  it("should return a directory and its files recursively", () => {
    statSync.mockImplementation((path) => {
      if (path === "/root") {
        return { isDirectory: () => true, isFile: () => false };
      }
      if (path === "/root/file1.txt") {
        return { isDirectory: () => false, isFile: () => true };
      }
      if (path === "/root/dirA") {
        return { isDirectory: () => true, isFile: () => false };
      }
      if (path === "/root/dirA/file2.txt") {
        return { isDirectory: () => false, isFile: () => true };
      }
    });

    readdirSync.mockImplementation((path) => {
      if (path === "/root") {
        return ["file1.txt", "dirA"];
      }
      if (path === "/root/dirA") {
        return ["file2.txt"];
      }
    });

    const result = [...walk("/root")];
    expect(result).toEqual([
      { path: "/root", isDirectory: true },
      { path: "/root/file1.txt", isDirectory: false },
      { path: "/root/dirA", isDirectory: true },
      { path: "/root/dirA/file2.txt", isDirectory: false },
    ]);
  });

  it("should handle empty directories", () => {
    statSync.mockImplementation(() => ({
      isDirectory: () => true,
      isFile: () => false,
    }));
    readdirSync.mockReturnValue([]);

    const result = [...walk("/emptydir")];
    expect(result).toEqual([{ path: "/emptydir", isDirectory: true }]);
  });

  it("should throw TypeError if rootPath is not a string", () => {
    expect(() => [...walk(123)]).toThrow(TypeError);
    expect(() => [...walk(null)]).toThrow(TypeError);
    expect(() => [...walk({})]).toThrow(TypeError);
  });
});
