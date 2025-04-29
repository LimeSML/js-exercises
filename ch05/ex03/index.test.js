import { has31DaysUsingIfElse, has31DaysUsingSwitch } from ".";

describe("has31DaysUsingIfElse", () => {
    it("should return true for months with 31 days", () => {
        expect(has31DaysUsingIfElse("Jan")).toBe(true);
        expect(has31DaysUsingIfElse("Mar")).toBe(true);
        expect(has31DaysUsingIfElse("May")).toBe(true);
        expect(has31DaysUsingIfElse("Jul")).toBe(true);
        expect(has31DaysUsingIfElse("Aug")).toBe(true);
        expect(has31DaysUsingIfElse("Oct")).toBe(true);
        expect(has31DaysUsingIfElse("Dec")).toBe(true);
    });

    it("should return false for months without 31 days", () => {
        expect(has31DaysUsingIfElse("Feb")).toBe(false);
        expect(has31DaysUsingIfElse("Apr")).toBe(false);
        expect(has31DaysUsingIfElse("Jun")).toBe(false);
        expect(has31DaysUsingIfElse("Sep")).toBe(false);
        expect(has31DaysUsingIfElse("Nov")).toBe(false);
    });

    it("should throw a TypeError for invalid input", () => {
        expect(() => has31DaysUsingIfElse(1)).toThrow(TypeError);
        expect(() => has31DaysUsingIfElse(null)).toThrow(TypeError);
        expect(() => has31DaysUsingIfElse(undefined)).toThrow(TypeError);
    });
});

describe("has31DaysUsingSwitch", () => {
    it("should return true for months with 31 days", () => {
        expect(has31DaysUsingSwitch("Jan")).toBe(true);
        expect(has31DaysUsingSwitch("Mar")).toBe(true);
        expect(has31DaysUsingSwitch("May")).toBe(true);
        expect(has31DaysUsingSwitch("Jul")).toBe(true);
        expect(has31DaysUsingSwitch("Aug")).toBe(true);
        expect(has31DaysUsingSwitch("Oct")).toBe(true);
        expect(has31DaysUsingSwitch("Dec")).toBe(true);
    });

    it("should return false for months without 31 days", () => {
        expect(has31DaysUsingSwitch("Feb")).toBe(false);
        expect(has31DaysUsingSwitch("Apr")).toBe(false);
        expect(has31DaysUsingSwitch("Jun")).toBe(false);
        expect(has31DaysUsingSwitch("Sep")).toBe(false);
        expect(has31DaysUsingSwitch("Nov")).toBe(false);
    });

    it("should throw a TypeError for invalid input", () => {
        expect(() => has31DaysUsingSwitch(1)).toThrow(TypeError);
        expect(() => has31DaysUsingSwitch(null)).toThrow(TypeError);
        expect(() => has31DaysUsingSwitch(undefined)).toThrow(TypeError);
    });
});