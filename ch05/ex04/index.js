export function getFirstTenFibonacciUsingWhile() {

    const fibonacci = [1, 1];
    let i = 2;
    while (i < 10) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
        i++;
    }
    return fibonacci;
}

export function getFirstTenFibonacciUsingDoWhile() {

    const fibonacci = [1, 1];
    let i = 2;
    do {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
        i++;
    } while (i < 10);
    return fibonacci;
}

export function getFirstTenFibonacciUsingFor() {

    const fibonacci = [1, 1];
    for (let i = 2; i < 10; i++) {
        fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
    }
    return fibonacci;
}