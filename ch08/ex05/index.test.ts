import { sequenceToObject } from './index.ts';

describe('sequenceToObject', () => {
    it('should convert a sequence of key-value pairs to an object', () => {
        expect(sequenceToObject('a', 1, 'b', 2)).toEqual({ a: 1, b: 2 });
        expect(sequenceToObject('x', 'y', 'z', 1)).toEqual({ x: 'y', z: 1 });
    });

    it('should accept an array with spread operator as arguments', () => {
        const arr = ['a', 1, 'b', 2];
        expect(sequenceToObject(...arr)).toEqual({ a: 1, b: 2 });
    });

    it('should return an empty object for no arguments', () => {
        expect(sequenceToObject()).toEqual({});
    });

    it('should throw an Error when the number of arguments is odd', () => {
        expect(() => sequenceToObject('a', 1, 'b')).toThrow(
            'values must be an even length array'
        );
        expect(() => sequenceToObject('a')).toThrow(
            'values must be an even length array'
        );
    });

    it('should throw an Error when a key is not a string', () => {
        expect(() => sequenceToObject(1, 'a', 'b', 2)).toThrow(
            'key at index 0 must be a string'
        );
        expect(() => sequenceToObject('a', 1, {}, 2)).toThrow(
            'key at index 2 must be a string'
        );
    });

    it('should overwrite duplicate keys with the last value', () => {
        expect(sequenceToObject('a', 1, 'a', 2)).toEqual({ a: 2 });
    });
});