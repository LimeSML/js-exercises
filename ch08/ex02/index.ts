export const pow = (base: number, exponent: number): number => {
    if (!Number.isInteger(exponent) || exponent < 0) {
        throw new Error('exponent must be a non-negative integer');
    }

    if (exponent === 0) {
        return 1;
    }

    if (exponent % 2 === 0) {
        const half = pow(base, exponent / 2);
        return half * half;
    }
    return base * pow(base, exponent - 1);
}