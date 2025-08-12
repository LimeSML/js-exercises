async function slowFn(obj) {
    if (typeof obj !== 'object' || obj === null) {
        throw new Error('input must be a non-null object');
    }

    // オブジェクトを文字列化 → TextEncoder でバイト配列化
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(obj));

    // ハッシュ値を返すことで一意な値を生成
    return await crypto.subtle.digest('SHA-256', data);
}

export function cache(f) {
    if (typeof f !== 'function') {
        throw new Error('input must be a function');
    }

    const weakMap = new WeakMap();

    return function(arg) {
        if (weakMap.has(arg)) {
            // console.log('Cache hit');
            return weakMap.get(arg);
        }
        // console.log('Cache miss');
        const result = f.call(this, arg);
        weakMap.set(arg, result);
        return result;
    }
}

// const cachedSlowFn = cache(slowFn);
// const obj = { a: 1, b: 2 }
// console.log(await cachedSlowFn(obj));
// console.log(await cachedSlowFn(obj));
// console.log(await cachedSlowFn({ a: 2, b: 3 }));