import { InstrumentedLinkedList } from "./index.ts";

describe("InstrumentedLinkedList", () => {
    it("#push", () => {
        const list = new InstrumentedLinkedList<string>();
        list.push("A");
        expect(list.pushCount).toBe(1);
    });
    it("#pushAll", () => {
        const list = new InstrumentedLinkedList<string>();
        list.pushAll("A", "B");
        expect(list.pushCount).toBe(2);
    });
});
