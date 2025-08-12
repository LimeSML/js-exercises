export function retryWithExponentialBackoff(func, maxRetry, callback) {
    let attempt = 0;

    function tryFunc() {
        const result = func();
        if (result === true) {
            callback(true);
            return;
        }
        if (attempt >= maxRetry) {
            callback(false);
            return;
        }
        const delay = Math.pow(2, attempt) * 1000;
        attempt++;
        setTimeout(tryFunc, delay);
    }

    setTimeout(tryFunc, 0);
}

// let counter = 0;
// retryWithExponentialBackoff(
//     () => {
//         console.log("call", ++counter);
//         return counter === 3;
//     },
//     5,
//     (success) => {
//         console.log("Done:", success);
//     }
// );
