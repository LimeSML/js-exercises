import { sortJapanese, toJapaneseDateString } from './index';

describe('sortJapanese', () => {
    it('should sort Japanese strings correctly', () => {
        const input = ['ばなな', 'はな', 'バラ', 'つき', 'っぽ'];
        const result = sortJapanese(input);
        expect(result).toEqual(['つき', 'っぽ', 'はな', 'ばなな', 'バラ']);
    });

    it('should return an empty array for empty input', () => {
        expect(sortJapanese([])).toEqual([]);
    });

    it('should throw an error if input is not an array', () => {
        expect(() => sortJapanese('not an array')).toThrow('input must be an array');
        expect(() => sortJapanese(null)).toThrow('input must be an array');
        expect(() => sortJapanese(undefined)).toThrow('input must be an array');
    });

    it('should throw an error if any element is not a string', () => {
        expect(() => sortJapanese(['a', 1, 'b'])).toThrow('all elements in the array must be strings');
        expect(() => sortJapanese([{}, 'a'])).toThrow('all elements in the array must be strings');
    });
});

describe('toJapaneseDateString', () => {
    it('should format a Date object to Japanese calendar string', () => {
        const date = new Date(2025, 7, 1);
        const result = toJapaneseDateString(date);
        expect(result).toMatch(/令和.*7年.*8月.*1日/);
    });

    it('should throw an error if input is not a Date object', () => {
        expect(() => toJapaneseDateString('2025-08-01')).toThrow('input must be a Date object');
        expect(() => toJapaneseDateString(null)).toThrow('input must be a Date object');
        expect(() => toJapaneseDateString({})).toThrow('input must be a Date object');
    });
});