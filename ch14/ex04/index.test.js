import { Hiragana } from "./index";

describe("Hiragana", () => {
  test("should construct with hiragana", () => {
    const h = new Hiragana("あ");
    expect(h.char).toBe("あ");
    expect(h.charCode).toBe("あ".charCodeAt(0));
  });

  test("should throw TypeError if argument is not a string", () => {
    expect(() => new Hiragana(123)).toThrow(TypeError);
    expect(() => new Hiragana(null)).toThrow(TypeError);
  });

  test("should throw RangeError if string length is not 1", () => {
    expect(() => new Hiragana("")).toThrow(RangeError);
    expect(() => new Hiragana("あい")).toThrow(RangeError);
  });

  test("should throw RangeError if character is not hiragana", () => {
    expect(() => new Hiragana("a")).toThrow(RangeError);
    expect(() => new Hiragana("ア")).toThrow(RangeError);
    expect(() => new Hiragana("亜")).toThrow(RangeError);
  });

  test("Symbol.toPrimitive should return correct values", () => {
    const h = new Hiragana("あ");
    expect(`${h}`).toBe("あ");
    expect(+h).toBe("あ".charCodeAt(0));
    expect(h + "").toBe("あ");
  });

  test("default hint should return string", () => {
    const h = new Hiragana("あ");
    expect(h[Symbol.toPrimitive]()).toBe("あ");
  });
});
