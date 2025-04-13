export function isAlmostEqual(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return false;
    }

    if (Number.isNaN(a) && Number.isNaN(b)) {
        return true;
    }

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        return a === b;
    }

    const epsilon = 1e-10;
    return Math.abs(a - b) <= epsilon;
};