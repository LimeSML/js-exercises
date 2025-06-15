import { DynamicSizeArray } from "./index.ts";

describe("DynamicSizeArray", () => {
    it("should initialize with length 0", () => {
        const arr = new DynamicSizeArray();
        expect(arr.length()).toBe(0);
    });

    it("should push elements and increase length", () => {
        const arr = new DynamicSizeArray();
        arr.push(1);
        arr.push(2);
        expect(arr.length()).toBe(2);
        expect(arr.get(0)).toBe(1);
        expect(arr.get(1)).toBe(2);
    });

    it("should throw an error when getting out of range", () => {
        const arr = new DynamicSizeArray();
        arr.push(1);
        expect(() => arr.get(-1)).toThrow("Array index out of range: -1");
        expect(() => arr.get(1)).toThrow("Array index out of range: 1");
    });

    it("should throw an error when setting out of range", () => {
        const arr = new DynamicSizeArray();
        arr.push(1);
        expect(() => arr.set(-1, 100)).toThrow("Array index out of range: -1");
        expect(() => arr.set(1, 100)).toThrow("Array index out of range: 1");
    });

    it("should set and get values correctly", () => {
        const arr = new DynamicSizeArray();
        arr.push(1);
        arr.push(2);
        arr.set(1, 3);
        expect(arr.get(1)).toBe(3);
    });

    it("should expand when pushing more than initial size", () => {
        const arr = new DynamicSizeArray();
        for (let i = 0; i < 10; i++) {
            arr.push(i);
        }
        expect(arr.length()).toBe(10);
        for (let i = 0; i < 10; i++) {
            expect(arr.get(i)).toBe(i);
        }
    });
});
