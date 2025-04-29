import { escapeUsingIf, escapeUsingSwtich } from ".";

describe("escapeUsingIf", () => {
    it("should escape special characters correctly", () => {
        const input = '\0\b\t\n\v\f\r"\'\\';
        const expected = '\\0\\b\\t\\n\\v\\f\\r\\"\\\'\\\\';
        expect(escapeUsingIf(input)).toBe(expected);
    });

    it("should return the same string if no special characters are present", () => {
        const input = "Hello, World!";
        expect(escapeUsingIf(input)).toBe(input);
    });

    it("should handle mixed strings with special and normal characters", () => {
        const input = "Hello\nWorld\t!";
        const expected = "Hello\\nWorld\\t!";
        expect(escapeUsingIf(input)).toBe(expected);
    });
});

describe("escapeUsingSwtich", () => {
    it("should escape special characters correctly", () => {
        const input = '\0\b\t\n\v\f\r"\'\\';
        const expected = '\\0\\b\\t\\n\\v\\f\\r\\"\\\'\\\\';
        expect(escapeUsingSwtich(input)).toBe(expected);
    });

    it("should return the same string if no special characters are present", () => {
        const input = "Hello, World!";
        expect(escapeUsingSwtich(input)).toBe(input);
    });

    it("should handle mixed strings with special and normal characters", () => {
        const input = "Hello\nWorld\t!";
        const expected = "Hello\\nWorld\\t!";
        expect(escapeUsingSwtich(input)).toBe(expected);
    });
});


