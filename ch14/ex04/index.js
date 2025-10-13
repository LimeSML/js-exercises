export class Hiragana {
    constructor(char) {
        if (typeof char !== 'string') {
            throw new TypeError('argument must be string');
        }
        if (char.length !== 1) {
            throw new RangeError('argument must be one character')
        }

        const charCode = char.charCodeAt(0);
        if (charCode < 0x3041 || charCode > 0x3093) {
            throw new RangeError('argument must be hiragana');
        }

        this.char = char;
        this.charCode = charCode;
    }

    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'string':
                return this.char;
            case 'number':
                return this.charCode;
            default:
                return this.char;
        }
    }
}