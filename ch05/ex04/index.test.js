import {
getFirstTenFibonacciUsingWhile,
getFirstTenFibonacciUsingDoWhile,
getFirstTenFibonacciUsingFor
} from './index';

describe('Fibonacci Sequence Functions', () => {
    const expectedFibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

    test('getFirstTenFibonacciUsingWhile should return the first 10 Fibonacci numbers', () => {
        const result = getFirstTenFibonacciUsingWhile();
        expect(result).toEqual(expectedFibonacci);
    });

    test('getFirstTenFibonacciUsingDoWhile should return the first 10 Fibonacci numbers', () => {
        const result = getFirstTenFibonacciUsingDoWhile();
        expect(result).toEqual(expectedFibonacci);
    });

    test('getFirstTenFibonacciUsingFor should return the first 10 Fibonacci numbers', () => {
        const result = getFirstTenFibonacciUsingFor();
        expect(result).toEqual(expectedFibonacci);
    });
});