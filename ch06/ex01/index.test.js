import { HashTable } from './index';

describe('HashTable', () => {
    let hashTable;

    beforeEach(() => {
        hashTable = new HashTable(10);
    });

    test('should initialize with the correct size', () => {
        expect(hashTable.size).toBe(0);
    });

    test('should throw an error if capacity is not a positive integer', () => {
        expect(() => new HashTable(0)).toThrow('capacity must be a positive integer');
        expect(() => new HashTable(-1)).toThrow('capacity must be a positive integer');
        expect(() => new HashTable(1.5)).toThrow('capacity must be a positive integer');
    });

    test('should add key-value pair and get it', () => {
        hashTable.put('key1', 'value1');
        expect(hashTable.size).toBe(1);
        expect(hashTable.get('key1')).toBe('value1');
    });

    test('should update the value for an existing key', () => {
        hashTable.put('key1', 'value1');
        hashTable.put('key1', 'newValue');
        expect(hashTable.size).toBe(1);
        expect(hashTable.get('key1')).toBe('newValue');
    });

    test('should remove key-value pair', () => {
        hashTable.put('key1', 'value1');
        hashTable.put('key2', 'value2');

        expect(hashTable.remove('key1')).toBe(true);
        expect(hashTable.size).toBe(1);
        expect(hashTable.get('key1')).toBeUndefined();
        expect(hashTable.get('key2')).toBe('value2');
    });

    test('should throw an error if key is not a string', () => {
        expect(() => hashTable.put(123, 'value')).toThrow('key must be a string');
        expect(() => hashTable.get(123)).toThrow('key must be a string');
        expect(() => hashTable.remove(123)).toThrow('key must be a string');
    });
});