export class MyArrayLike {
    constructor(...lengthOrElements) {
        if (!Array.isArray(lengthOrElements)) {
            throw new TypeError('argument must be an array');
        }

        // map(), slice() などで new MyArrayLike(length) されたとき
        if (lengthOrElements.length === 1 && typeof lengthOrElements[0] === 'number') {
            const length = lengthOrElements[0];
            this.length = length;
            return;
        }

        const elements = lengthOrElements;
        elements.forEach((e, i) => {
            this[i] = e;
        });
        this.length = elements.length;
    }
}

export class MyArray extends Array {
    constructor(items) {
        super(...items);
    }

    // TODO
    static get [Symbol.species]() {
        return MyArrayLike;
    }
}
