import { retryWithExponentialBackoff } from "./index";

jest.useFakeTimers();

describe("retryWithExponentialBackoff", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("should call callback with true if func returns true on first try", () => {
    const func = jest.fn(() => true);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 3, callback);

    jest.runOnlyPendingTimers();

    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
  });

  test("should retry until func returns true, then calls callback with true", () => {
    const func = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 5, callback);

    jest.runOnlyPendingTimers();
    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(2000);

    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(true);
  });

  test("should call callback with false if maxRetry is reached", () => {
    const func = jest.fn(() => false);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 2, callback);

    jest.runOnlyPendingTimers();
    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(2000);

    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(false);
  });

  test("should use exponential backoff delays", () => {
    const func = jest.fn(() => false);
    const callback = jest.fn();

    retryWithExponentialBackoff(func, 2, callback);

    jest.runOnlyPendingTimers();
    expect(func).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(999);
    expect(func).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1);
    expect(func).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(1999);
    expect(func).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1);
    expect(func).toHaveBeenCalledTimes(3);

    expect(callback).toHaveBeenCalledWith(false);
  });
});
