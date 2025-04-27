import { bitCount } from ".";

describe("bitCount", () => {
    it("should throw an error when the argument is not a number", () => {
        expect(() => bitCount("a")).toThrow(TypeError);
        expect(() => bitCount(null)).toThrow(TypeError);
        expect(() => bitCount(undefined)).toThrow(TypeError);
    });

    it("should throw an error when the argument is not a finite number", () => {
        expect(() => bitCount(Infinity)).toThrow(TypeError);
        expect(() => bitCount(-Infinity)).toThrow(TypeError);
        expect(() => bitCount(NaN)).toThrow(TypeError);
    });

    it("should return the correct number of set bits in a positive integer", () => {
        expect(bitCount(0b111)).toBe(3);
        expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
        expect(bitCount(0)).toBe(0);
        expect(bitCount(1)).toBe(1);
        expect(bitCount(2)).toBe(1);
        expect(bitCount(3)).toBe(2);
        expect(bitCount(4)).toBe(1);
        expect(bitCount(5)).toBe(2);
        expect(bitCount(6)).toBe(2);
        expect(bitCount(7)).toBe(3);
        expect(bitCount(8)).toBe(1);
    });

    it("should return the correct number of set bits in a negative integer", () => {
        expect(bitCount(-1)).toBe(32);
        expect(bitCount(-2)).toBe(31);
        expect(bitCount(-3)).toBe(31);
        expect(bitCount(-4)).toBe(30);
        expect(bitCount(-5)).toBe(31);
        expect(bitCount(-6)).toBe(30);
        expect(bitCount(-7)).toBe(30);
        expect(bitCount(-8)).toBe(29);
    });
});
