export function fizzbuzz(n: number): void {
    const arr = new Array(n);
    arr.forEach((_, i) => (arr[i] = i + 1));
    arr.forEach((i) => {
        if (i % 15 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    });
}

export function sumOfSquaredDifference(f: number[], g: number[]): number {
    return f.reduce((result, _, i) => result + (f[i] - g[i]) ** 2, 0);
}

export function sumOfEvensIsLargerThan42(array: number[]): boolean {
    const sum = array.reduce((sum, x) => (x % 2 === 0 ? sum + x : sum), 0);
    return sum >= 42;
}
