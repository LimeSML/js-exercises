export async function retryWithExponentialBackoff(func, maxRetry) {
    if (typeof func !== 'function') {
        throw new TypeError('func must be a function');
    }
    if (!isFinite(maxRetry) || maxRetry < 0) {
        throw new RangeError('maxRetry must be a non-negative number');
    }

    let attempt = 1;
    while (attempt <= maxRetry) {
        try {
            return await func();
        } catch (error) {
            if (attempt === maxRetry) {
                throw error;
            }

            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            attempt++;
        }
    }

}

// const resp = await retryWithExponentialBackoff(
//     () => fetch("https://example.com"),
//     5
// );
// console.log(resp);