import { TypeMap } from './index';

class Foo {}
class Bar {}

describe('TypeMap', () => {
    let typeMap;

    beforeEach(() => {
        typeMap = new TypeMap();
    });

    test('should set and get values with correct type', () => {
        typeMap.set(String, "hello");
        typeMap.set(Number, 42);
        typeMap.set(Foo, new Foo());

        expect(typeMap.get(String)).toBe("hello");
        expect(typeMap.get(Number)).toBe(42);
        expect(typeMap.get(Foo)).toBeInstanceOf(Foo);
    });

    test('should throw an Error if key is not a function in set()', () => {
        expect(() => typeMap.set('notAFunction', 123)).toThrow('key must be a function');
        expect(() => typeMap.set({}, 123)).toThrow('key must be a function');
        expect(() => typeMap.set(null, 123)).toThrow('key must be a function');
    });

    test('should throw an Error if value is not an instance of key', () => {
        expect(() => typeMap.set(String, 123)).toThrow('value must be an instance of key');
        expect(() => typeMap.set(Number, "not a number")).toThrow('value must be an instance of key');
        expect(() => typeMap.set(Foo, new Bar())).toThrow('value must be an instance of key');
    });

    test('should throw an Error if key is not a function in get()', () => {
        expect(() => typeMap.get('notAFunction')).toThrow('key must be a function');
        expect(() => typeMap.get({})).toThrow('key must be a function');
        expect(() => typeMap.get(null)).toThrow('key must be a function');
    });

    test('should return undefined for unset keys', () => {
        expect(typeMap.get(String)).toBeUndefined();
        expect(typeMap.get(Number)).toBeUndefined();
        expect(typeMap.get(Foo)).toBeUndefined();
    });

    test('should overwrite value for the same key', () => {
        typeMap.set(String, "first");
        typeMap.set(String, "second");
        expect(typeMap.get(String)).toBe("second");
    });
});