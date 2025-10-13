import { littleToBigEndian, bigToLittleEndian } from "./index";

describe("littleToBigEndian", () => {
  it("should convert little endian to big endian for a single value", () => {
    const input = new Uint32Array([0x11223344]);
    const output = littleToBigEndian(input);
    expect(output).toBeInstanceOf(Uint32Array);
    expect(output.length).toBe(1);
    expect(output[0]).toBe(0x44332211);
  });

  it("should convert little endian to big endian for multiple values", () => {
    const input = new Uint32Array([0x11223344, 0xaabbccdd]);
    const output = littleToBigEndian(input);
    expect(output).toEqual(new Uint32Array([0x44332211, 0xddccbbaa]));
  });

  it("should return an empty Uint32Array for empty input", () => {
    const input = new Uint32Array([]);
    const output = littleToBigEndian(input);
    expect(output).toEqual(new Uint32Array([]));
  });

  it("should throw an Error if input is not Uint32Array", () => {
    expect(() => littleToBigEndian([0x11223344])).toThrow(
      "input must be a Uint32Array",
    );
    expect(() => littleToBigEndian(null)).toThrow(
      "input must be a Uint32Array",
    );
    expect(() => littleToBigEndian(undefined)).toThrow(
      "input must be a Uint32Array",
    );
    expect(() => littleToBigEndian(new Uint8Array([1, 2, 3, 4]))).toThrow(
      "input must be a Uint32Array",
    );
  });
});

describe("bigToLittleEndian", () => {
  it("should convert big endian to little endian", () => {
    const input = new Uint32Array([0x44332211, 0xddccbbaa]);
    const output = bigToLittleEndian(input);
    expect(output).toEqual(new Uint32Array([0x11223344, 0xaabbccdd]));
  });

  it("should return an empty Uint32Array for empty input", () => {
    const input = new Uint32Array([]);
    const output = bigToLittleEndian(input);
    expect(output).toEqual(new Uint32Array([]));
  });

  it("should throw an Error if input is not Uint32Array", () => {
    expect(() => bigToLittleEndian([0x44332211])).toThrow(
      "input must be a Uint32Array",
    );
  });
});
