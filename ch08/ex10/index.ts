/* eslint-disable @typescript-eslint/no-explicit-any */
export function addMyCall(fn: any): void {
    if (typeof fn !== 'function') {
        throw new Error('fn must be a function');
    }

    fn.myCall = function (thisArg: any, ...args: any[]) {
        if (typeof thisArg !== 'object') {
            throw new Error('thisArg must be an object');
        }
        const bound = fn.bind(thisArg);
        return bound(...args);
    };
}

// 例
const square = (n: number) => n * n;

addMyCall(square);

console.log((square as any).myCall(null, 5)); // 25

function Product(this: any, name: string, price: number) {
    this.name = name;
    this.price = price;
}

addMyCall(Product);

const that = {};
(Product as any).myCall(that, "Apple", 100);
console.log(that); // { name: 'Apple', price: 100 }