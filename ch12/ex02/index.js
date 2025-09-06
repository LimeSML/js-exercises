// function* fibonacciSequence() {
//     let x = 0;
//     let y = 1;

//     for (; ;) {
//         yield x;
//         [x, y] = [y, x + y];
//     }
// }

export function fibonacciIterator() {
    let x = 0;
    let y = 1;

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            const value = x;
            [x, y] = [y, x + y];
            return { value, done: false };
        },
    };
}
