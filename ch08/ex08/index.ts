function counter() {
    let n = 0;
    return {
        count: function () { return n++; },
        reset: function () { n = 0; },
        get: function () { return n; }
    };
}

export function counterGroup() {
    const counters: ReturnType<typeof counter>[] = [];

    return {
        newCounter: function () {
            const c = counter();
            counters.push(c);
            return c;
        },
        total: function () {
            return counters.reduce((sum, c) => sum + c.get(), 0);
        },
        average: function () {
            if (counters.length === 0) {
                throw new TypeError("no counters available to calculate average");
            }
            return this.total() / counters.length;
        },
        variance: function () {
            if (counters.length < 2) {
                throw new TypeError("at least two counters are required to calculate variance");
            }
            const avg = this.average();
            const sumOfSquares = counters.reduce((sum, c) => sum + Math.pow(c.get() - avg, 2), 0);
            return sumOfSquares / counters.length;
        }
    };
}