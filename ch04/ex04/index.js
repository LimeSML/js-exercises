export function bitCount(n) {
    if (typeof n !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    if (!isFinite(n)) {
        throw new TypeError('Argument must be a finite number');
    }

    // 引数を1ビットずつ右にシフトし、最下位ビットが1ならカウント
    let count = 0;
    while (n) {
        count += n & 1;
        n >>>= 1;
    }
    
    return count;
}