import { retryWithExponentialBackoff } from './index';

jest.useFakeTimers();

describe('retryWithExponentialBackoff', () => {
    afterEach(() => {
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    it('should throw TypeError if func is not a function', async () => {
        await expect(retryWithExponentialBackoff(null, 3)).rejects.toThrow(TypeError);
        await expect(retryWithExponentialBackoff(123, 3)).rejects.toThrow('func must be a function');
    });

    it('should throw RangeError if maxRetry is negative or not finite', async () => {
        await expect(retryWithExponentialBackoff(() => { }, -1)).rejects.toThrow(RangeError);
        await expect(retryWithExponentialBackoff(() => { }, Infinity)).rejects.toThrow('maxRetry must be a non-negative number');
        await expect(retryWithExponentialBackoff(() => { }, NaN)).rejects.toThrow(RangeError);
    });

    it('should resolve if func succeeds on first try', async () => {
        const mockFn = jest.fn().mockResolvedValue('success');
        await expect(retryWithExponentialBackoff(mockFn, 3)).resolves.toBe('success');
        expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should retry the specified number of times on failure and eventually resolve', async () => {
        const mockFn = jest
            .fn()
            .mockRejectedValueOnce(new Error('fails'))
            .mockResolvedValue('success');

        const promise = retryWithExponentialBackoff(mockFn, 2);

        await Promise.resolve();
        jest.advanceTimersByTime(2 ** 1 * 1000);

        await expect(promise).resolves.toBe('success');
    });

    it('should throw the last error if all retries fail', async () => {
        const error = new Error('fails');
        const mockFn = jest.fn().mockRejectedValue(error);

        const promise = retryWithExponentialBackoff(mockFn, 2);

        await Promise.resolve();
        jest.advanceTimersByTime(2 ** 1 * 1000);

        await expect(promise).rejects.toThrow('fails');
    });
});