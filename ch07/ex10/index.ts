function makeFixedSizeArray(size: number) {
    const array = new Array(size);
    return {
        get(index: number) {
            if (index < 0 || array.length <= index) {
                throw new Error(`Array index out of range: ${index}`);
            }
            return array[index];
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(index: number, value: any) {
            if (index < 0 || array.length <= index) {
                throw new Error(`Array index out of range: ${index}`);
            }
            array[index] = value;
        },
        length() {
            return array.length;
        },
    };
}

export class DynamicSizeArray {
    static INITIAL_SIZE = 4; // 初期サイズ
    private len: number;
    private array: ReturnType<typeof makeFixedSizeArray>;

    constructor() {
        this.len = 0;
        this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
    }

    get(index: number) {
        if (index < 0 || this.len <= index) {
            throw new Error(`Array index out of range: ${index}`);
        }
        return this.array.get(index);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set(index: number, value: any) {
        if (index < 0 || this.len <= index) {
            throw new Error(`Array index out of range: ${index}`);
        }
        this.array.set(index, value);
        this.len = Math.max(this.len, index + 1);
    }

    length() {
        return this.len;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    push(value: any) {
        // this.array に空が無い場合は「再配置」を行う
        if (this.len >= this.array.length()) {
            // 新しい固定長配列を作成
            const old = this.array;
            this.array = makeFixedSizeArray(old.length() * 2);
            // 古い配列 (old) の要素を新しい配列にコピー
            for (let i = 0; i < this.len; i++) {
                this.set(i, old.get(i));
            }
        }
        this.array.set(this.len, value);
        this.len++;
    }
}
