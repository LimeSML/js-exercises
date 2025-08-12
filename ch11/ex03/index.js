export function littleToBigEndian(uint32Arr) {
    if (!(uint32Arr instanceof Uint32Array)) {
        throw new Error('input must be a Uint32Array');
    }

    const result = new Uint32Array(uint32Arr.length);
    for (let i = 0; i < uint32Arr.length; i++) {
        const value = uint32Arr[i];
        // 4バイトの順序を逆転
        result[i] =
            ((value & 0x000000FF) << 24) | // 1バイト目 → 最上位
            ((value & 0x0000FF00) << 8)  | // 2バイト目 → 2番目
            ((value & 0x00FF0000) >>> 8) | // 3バイト目 → 3番目
            ((value & 0xFF000000) >>> 24); // 4バイト目 → 最下位
    }
    return result;
}

export function bigToLittleEndian(uint32Arr) {
    return littleToBigEndian(uint32Arr);
}

const littleEndianData = new Uint32Array([0x11223344, 0xAABBCCDD]);

const bigEndianData = littleToBigEndian(littleEndianData);
console.log(bigEndianData[0].toString(16)); // 44332211
console.log(bigEndianData[1].toString(16)); // 44332211

const littleAgain = bigToLittleEndian(bigEndianData);
console.log(littleAgain[0].toString(16)); // 11223344
console.log(littleAgain[1].toString(16)); // aabbccdd