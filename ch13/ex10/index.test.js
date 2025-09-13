import { fetchSumOfFileSizes } from "./index.js";
import * as fsPromises from "node:fs/promises";

jest.mock("node:fs/promises");

describe("fetchSumOfFileSizes", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should return 0 if directory is empty", async () => {
        fsPromises.readdir.mockResolvedValue([]);
        const result = await fetchSumOfFileSizes("/some/path");
        expect(result).toBe(0);
    });

    it("should return the sum of file sizes", async () => {
        fsPromises.readdir.mockResolvedValue(["file1.txt", "file2.txt", "file3.txt"]);
        fsPromises.stat
            .mockResolvedValueOnce({ size: 10 })
            .mockResolvedValueOnce({ size: 20 })
            .mockResolvedValueOnce({ size: 30 });
        const result = await fetchSumOfFileSizes("/some/path");
        expect(result).toBe(60);
    });

    it("should propagate an error from readdir", async () => {
        fsPromises.readdir.mockRejectedValue(new Error("fail"));
        await expect(fetchSumOfFileSizes("/some/path")).rejects.toThrow("fail");
    });

    it("should propagate an errors from stat", async () => {
        fsPromises.readdir.mockResolvedValue(["file1.txt"]);
        fsPromises.stat.mockRejectedValue(new Error("stat fail"));
        await expect(fetchSumOfFileSizes("/some/path")).rejects.toThrow("stat fail");
    });
});