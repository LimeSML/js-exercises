interface Node<T> {
    value: T;
    next: Node<T> | null;
}

export class LinkedList<T> {
    #head: Node<T> | null = null;
    #tail: Node<T> | null = null;

    constructor() {
        this.#head = null;
        this.#tail = null;
    }

    push(value: T) {
        const newNode: Node<T> = { value, next: null };
        if (!this.#head) {
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            this.#tail!.next = newNode;
            this.#tail = newNode;
        }
    }

    pushAll(...items: T[]) {
        items.forEach((item) => this.push(item));
    }

    toString() {
        let current = this.#head;
        const values: T[] = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        return "[" + values.join(", ") + "]";
    }
}

/**
 * 要素のpush回数を記録するLinkedList
 */
export class InstrumentedLinkedList<T> {
    #pushCount = 0;
    #list: LinkedList<T> = new LinkedList<T>();

    /**
     * 要素のpush操作が行われた回数
     */
    get pushCount() {
        return this.#pushCount;
    }

    push(item: T) {
        this.#list.push(item);
        this.#pushCount++;
    }

    pushAll(...items: T[]) {
        this.#list.pushAll(...items);
        this.#pushCount += items.length;
    }
}
