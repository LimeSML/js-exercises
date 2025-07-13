import { TypeMap } from './index.ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('TypeMap', () => {
    it('should construct with correct types', () => {
        const entries = new Map<string, string>([['a', 'b'], ['c', 'd']]);
        expect(() => new TypeMap('string', 'string', entries)).not.toThrow();
    });

    it('should throw an error on wrong key type in constructor', () => {
        const entries = new Map<any, any>([[1, 'b']]);
        expect(() => new TypeMap('string', 'string', entries)).toThrow(TypeError);
    });

    it('should throw an error on wrong value type in constructor', () => {
        const entries = new Map<any, any>([['a', 2]]);
        expect(() => new TypeMap('string', 'string', entries)).toThrow(TypeError);
    });

    it('should set an entry when key and value types are correct', () => {
        const entries = new Map<string, string>();
        const map = new TypeMap('string', 'string', entries);
        expect(() => map.set('foo', 'bar')).not.toThrow();
    });

    it('should throw an error when the key type is incorrect', () => {
        const entries = new Map<string, string>();
        const map = new TypeMap('string', 'string', entries);
        expect(() => map.set(123 as any, 'bar')).toThrow(TypeError);
    });

    it('should throw an error when the value type is incorrect', () => {
        const entries = new Map<string, string>();
        const map = new TypeMap('string', 'string', entries);
        expect(() => map.set('foo', 456 as any)).toThrow(TypeError);
    });
});