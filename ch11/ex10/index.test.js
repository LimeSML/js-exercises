import {
    getDaysInMonth,
    countWeekdays,
    getWeekdayByLocale,
    getFirstDayOfLastMonth,
} from './index.js';

describe('getDaysInMonth', () => {
    test('should returns 31 for January 2025', () => {
        expect(getDaysInMonth(2025, 1)).toBe(31);
    });

    test('should return 28 for February 2025 (non-leap year)', () => {
        expect(getDaysInMonth(2025, 2)).toBe(28);
    });

    test('should return 29 for February 2020 (leap year)', () => {
        expect(getDaysInMonth(2020, 2)).toBe(29);
    });

    test('should return 30 for April 2025', () => {
        expect(getDaysInMonth(2025, 4)).toBe(30);
    });

    test('should throw an error for invalid month', () => {
        expect(() => getDaysInMonth(2023, 0)).toThrow('invalid year or month');
        expect(() => getDaysInMonth(2023, 13)).toThrow('invalid year or month');
    });

    test('should throw an error for invalid year', () => {
        expect(() => getDaysInMonth(-1, 1)).toThrow('invalid year or month');
    });
});

describe('countWeekdays', () => {
    test('should count weekdays in a single week', () => {
        expect(countWeekdays('2025-08-05', '2025-08-11')).toBe(5);
    });

    test('should count weekdays in a single day (weekday)', () => {
        expect(countWeekdays('2025-08-07', '2025-08-07')).toBe(1);
    });

    test('should count weekdays in a single day (weekend)', () => {
        expect(countWeekdays('2025-08-10', '2025-08-10')).toBe(0);
    });

    test('should count weekdays across months', () => {
        expect(countWeekdays('2025-07-31', '2025-08-04')).toBe(3);
    });

    test('should throw an error for invalid date format', () => {
        expect(() => countWeekdays('2025-8-01', '2025-08-10')).toThrow('invalid date format');
        expect(() => countWeekdays('2025-08-01', '2025/08/10')).toThrow('invalid date format');
    });
});

// getWeekdayByLocale
describe('getWeekdayByLocale', () => {
    test('should return correct weekday in English', () => {
        expect(getWeekdayByLocale('2025-08-06', 'en-US')).toMatch(/Wednesday/);
    });

    test('should return correct weekday in Japanese', () => {
        expect(getWeekdayByLocale('2025-08-06', 'ja-JP')).toMatch(/水曜日/);
    });

    test('should throw an error for invalid date format', () => {
        expect(() => getWeekdayByLocale('2025/08/06', 'en-US')).toThrow('invalid date format');
        expect(() => getWeekdayByLocale('2025-8-06', 'en-US')).toThrow('invalid date format');
    });
});

describe('getFirstDayOfLastMonth', () => {
    test('should return the first day of last month at 00:00:00', () => {
        const now = new Date();
        const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
        const expected = new Date(year, month, 1, 0, 0, 0, 0);

        const result = getFirstDayOfLastMonth();
        expect(result.getFullYear()).toBe(expected.getFullYear());
        expect(result.getMonth()).toBe(expected.getMonth());
        expect(result.getDate()).toBe(1);
        expect(result.getHours()).toBe(0);
        expect(result.getMinutes()).toBe(0);
        expect(result.getSeconds()).toBe(0);
        expect(result.getMilliseconds()).toBe(0);
    });
});