import { getAllPropertyKeys } from './index';

describe('getAllPropertyKeys', () => {
    test('should return all own property keys', () => {
        const sym = Symbol('test');
        const obj = Object.create(null, {
            a: { value: 1, enumerable: true },
            b: { value: 2, enumerable: false },
        });
        obj[sym] = 3;

        const result = getAllPropertyKeys(obj);
        expect(result).toEqual(['a', 'b', sym]);
    });

    test('should return inherited enumerable property keys', () => {
        const proto = { inheritedProp: 42 };
        const obj = Object.create(proto);
        obj.ownProp = 'value';

        const result = getAllPropertyKeys(obj);
        expect(result).toEqual(['ownProp', 'inheritedProp']);
    });

    test('should throw a TypeError if an argument is not an object', () => {
        expect(() => getAllPropertyKeys(null)).toThrow(TypeError);
        expect(() => getAllPropertyKeys(42)).toThrow(TypeError);
        expect(() => getAllPropertyKeys('string')).toThrow(TypeError);
    });

    test('should return an empty array if an argument is an object with no properties', () => {
        const obj = Object.create(null);
        const result = getAllPropertyKeys(obj);
        expect(result).toEqual([]);
    });
});