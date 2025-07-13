/* eslint-disable @typescript-eslint/no-explicit-any */
export class TypeMap {
    #keyType: string;
    #valueType: string;
    #map: Map<any, any>;

    constructor(keyType: string, valueType: string, entries: Map<any, any>) {
        for (const [k, v] of entries) {
            if (typeof k !== keyType || typeof v !== valueType) {
                throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
            }
        }

        this.#keyType = keyType;
        this.#valueType = valueType;
        this.#map = new Map(entries);
    }

    set(key: string, value: string) {
        if (this.#keyType && typeof key !== this.#keyType) {
            throw new TypeError(`${key} is not of type ${this.#keyType}`);
        }
        if (this.#valueType && typeof value !== this.#valueType) {
            throw new TypeError(`${value} is not of type ${this.#valueType}`);
        }

        return this.#map.set(key, value);
    }
}