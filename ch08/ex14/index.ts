/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// 残余パラメータとして任意の数の関数を受け取り、いずれかの関数が true を返せば true を返す新たな関数を返すany 関数
export function any(...fns: Function[]): Function {
    return function (...args: any[]): boolean {
        for (const fn of fns) {
            if (fn(...args)) {
                return true;
            }
        }
        return false;
    };
}

const isNonZero = any(
    (n: number) => n > 0,
    (n: number) => n < 0
);

console.log(isNonZero(0)); // => false
console.log(isNonZero(42)); // => true
console.log(isNonZero(-0.5)); // => true

// 引数として 2 つの関数を受け取り、1 つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す新たな関数を返すcatching 関数
export function catching(fn: Function, handler: Function): Function {
    return function (...args: any[]): any {
        try {
            return fn(...args);
        } catch (e) {
            return handler(e);
        }
    };
}

const safeJsonParse = catching(JSON.parse, (e: any) => {
    return { error: e.toString() };
});

console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}