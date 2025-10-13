import { convertLFtoCRLF, convertCRLFtoLF } from "./index.js";

describe("convertLFtoCRLF", () => {
  test("LF only → CRLF", () => {
    const input = "a\nb\nc";
    const expected = "a\r\nb\r\nc";
    expect(convertLFtoCRLF(input)).toBe(expected);
  });

  test("Mixed LF and CRLF → all CRLF", () => {
    const input = "a\r\nb\nc\r\nd";
    const expected = "a\r\nb\r\nc\r\nd";
    expect(convertLFtoCRLF(input)).toBe(expected);
  });

  test("No LF → no change", () => {
    const input = "abc";
    expect(convertLFtoCRLF(input)).toBe("abc");
  });
});

describe("convertCRLFtoLF", () => {
  test("CRLF only → LF", () => {
    const input = "a\r\nb\r\nc";
    const expected = "a\nb\nc";
    expect(convertCRLFtoLF(input)).toBe(expected);
  });

  test("Mixed CRLF and LF → all LF", () => {
    const input = "a\r\nb\nc\r\nd";
    const expected = "a\nb\nc\nd";
    expect(convertCRLFtoLF(input)).toBe(expected);
  });

  test("No CRLF → no change", () => {
    const input = "abc";
    expect(convertCRLFtoLF(input)).toBe("abc");
  });
});
