import { jsonParse } from './index';

describe('jsonParse', () => {
    test('should parse a valid JSON string and return success with data', () => {
        const jsonString = '{"name": "John", "age": 30}';
        const result = jsonParse(jsonString);
        expect(result).toEqual({
            success: true,
            data: { name: 'John', age: 30 },
        });
    });

    test('should return an error object for an invalid JSON string', () => {
        const jsonString = '{"name": "John", "age": 30';
        const result = jsonParse(jsonString);
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
    });

    test('should throw a TypeError if the argument is not a string', () => {
        expect(() => jsonParse(123)).toThrow(TypeError);
        expect(() => jsonParse(null)).toThrow(TypeError);
        expect(() => jsonParse({})).toThrow(TypeError);
    });

    test('should handle an empty JSON string and return success with data', () => {
        const jsonString = '{}';
        const result = jsonParse(jsonString);
        expect(result).toEqual({
            success: true,
            data: {},
        });
    });
});