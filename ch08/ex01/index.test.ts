import { repeatChar, square, getNow } from './index.ts';

describe('repeatChar', () => {
    it('should return an array of c repeated n times', () => {
        expect(repeatChar(3, 'A')).toEqual(['A', 'A', 'A']);
        expect(repeatChar(0, 'Z')).toEqual([]);
    });

    it('should throw an Error if n is negative', () => {
        expect(() => repeatChar(-1, 'A')).toThrow('n must be a non-negative integer');
    });

    it('should throw an Error if n is not an integer', () => {
        expect(() => repeatChar(2.5, 'A')).toThrow('n must be a non-negative integer');
    });

    it('should throw an Error if c is not a single alphanumeric character', () => {
        expect(() => repeatChar(2, '<')).toThrow('c must be a single alphanumeric character');
        expect(() => repeatChar(2, 'AB')).toThrow('c must be a single alphanumeric character');
        expect(() => repeatChar(2, '')).toThrow('c must be a single alphanumeric character');
    });

    it('should log c to console n times', () => {
        const spy = jest.spyOn(console, 'log').mockImplementation(() => { });
        repeatChar(3, 'A');
        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenCalledWith('A');
        spy.mockRestore();
    });
});

describe('square', () => {
    it('should return the square of a positive number', () => {
        expect(square(3)).toBe(9);
    });

    it('should return the square of zero', () => {
        expect(square(0)).toBe(0);
    });

    it('should return the square of a negative number', () => {
        expect(square(-4)).toBe(16);
    });
});

describe('getNow', () => {
    it('should return an object with a "now" property', () => {
        const result = getNow();
        expect(result).toHaveProperty('now');
        expect(typeof result.now).toBe('string');
    });

    it('should return current time close to Date().toLocaleString()', () => {
        const expected = new Date().toLocaleString();
        const result = getNow();
        expect(result.now.startsWith(expected.slice(0, 16))).toBe(true);
    });
});