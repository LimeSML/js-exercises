import { sub } from './index.js';

describe('sub function', () => {
    it('should subtract two numbers correctly', () => {
        expect(sub(8, 3)).toBe(5);
        expect(sub(1, -1)).toBe(2);
        expect(sub(-2, -1)).toBe(-1);
        expect(sub(0, 0)).toBe(0);
    });

    it('should throw a TypeError if the first argument is not a number', () => {
        expect(() => sub('a', 1)).toThrow(TypeError);
        expect(() => sub(null, 1)).toThrow(TypeError);
        expect(() => sub(undefined, 1)).toThrow(TypeError);
    });

    it('should throw a TypeError if the second argument is not a number', () => {
        expect(() => sub(1, 'b')).toThrow(TypeError);
        expect(() => sub(1, null)).toThrow(TypeError);
        expect(() => sub(1, undefined)).toThrow(TypeError);
    });

    it('should throw a TypeError if either argument is not finite', () => {
        expect(() => sub(Infinity, 1)).toThrow(TypeError);
        expect(() => sub(-Infinity, 0)).toThrow(TypeError);
        expect(() => sub(NaN, 1)).toThrow(TypeError);
    });
});