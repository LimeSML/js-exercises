import { sort } from "./index.ts";

describe("sort", () => {
    it("should sort an array of numbers", () => {
        expect(sort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([
            1, 1, 2, 3, 4, 5, 5, 6, 9,
        ]);
    });

    it("should sort an array of strings", () => {
        expect(sort(["banana", "apple", "cherry"])).toEqual([
            "apple",
            "banana",
            "cherry",
        ]);
    });

    it("should return an empty array when input is empty", () => {
        expect(sort([])).toEqual([]);
    });

    it("should handle already sorted arrays", () => {
        expect(sort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    it("should sort negative numbers correctly", () => {
        expect(sort([0, -1, -3, 2, 1])).toEqual([-3, -1, 0, 1, 2]);
    });
});
