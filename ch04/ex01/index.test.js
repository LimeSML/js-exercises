import { add, sub, mul, div } from './index.js';

describe('Complex Number Operations', () => {
    it('should add two complex numbers correctly', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const complex2 = { real: 3, imaginary: 4 };
        const result = add(complex1, complex2);
        expect(result).toEqual({ real: 4, imaginary: 6 });
    });
    it('should throw an error when adding invalid real numbers', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const invalidComplex = { real: 'a', imaginary: 4 };
        expect(() => add(complex1, invalidComplex)).toThrow(TypeError);
    });
    it('should throw an error when adding invalid imaginary numbers', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const invalidComplex = { real: 3, imaginary: 'b' };
        expect(() => add(complex1, invalidComplex)).toThrow(TypeError);
    });

    it('should subtract two complex numbers correctly', () => {
        const complex1 = { real: 5, imaginary: 6 };
        const complex2 = { real: 3, imaginary: 4 };
        const result = sub(complex1, complex2);
        expect(result).toEqual({ real: 2, imaginary: 2 });
    });
    it('should throw an error when substracting invalid real numbers', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const invalidComplex = { real: 'a', imaginary: 4 };
        expect(() => sub(complex1, invalidComplex)).toThrow(TypeError);
    });
    it('should throw an error when substracting invalid imaginary numbers', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const invalidComplex = { real: 3, imaginary: 'b' };
        expect(() => sub(complex1, invalidComplex)).toThrow(TypeError);
    });

    it('should multiply two complex numbers correctly', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const complex2 = { real: 3, imaginary: 4 };
        const result = mul(complex1, complex2);
        expect(result).toEqual({ real: -5, imaginary: 10 });
    });
    it('should throw an error when multiplying invalid real numbers', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const invalidComplex = { real: 'a', imaginary: 4 };
        expect(() => mul(complex1, invalidComplex)).toThrow(TypeError);
    });
    it('should throw an error when multiplying invalid imaginary numbers', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const invalidComplex = { real: 3, imaginary: 'b' };
        expect(() => mul(complex1, invalidComplex)).toThrow(TypeError);
    });

    it('should divide two complex numbers correctly', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const complex2 = { real: 3, imaginary: 4 };
        const result = div(complex1, complex2);
        expect(result).toEqual({ real: 0.44, imaginary: 0.08 });
    });
    it('should throw an error when dividing invalid real numbers', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const invalidComplex = { real: 'a', imaginary: 4 };
        expect(() => div(complex1, invalidComplex)).toThrow(TypeError);
    });
    it('should throw an error when dividing invalid imaginary numbers', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const invalidComplex = { real: 3, imaginary: 'b' };
        expect(() => div(complex1, invalidComplex)).toThrow(TypeError);
    });
    it('should throw an error when dividing by zero', () => {
        const complex1 = { real: 1, imaginary: 2 };
        const complex2 = { real: 0, imaginary: 0 };
        expect(() => div(complex1, complex2)).toThrow(TypeError);
    });
});