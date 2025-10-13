import { Warrior, MagicWarrior, WarriorFn, MagicWarriorFn } from "./index.ts";

describe("Warrior class", () => {
  it("should create a Warrior with positive atk", () => {
    const w = new Warrior(1);
    expect(w.attack()).toBe(2);
  });

  it("should throw error for negative atk", () => {
    expect(() => new Warrior(-1)).toThrow("atk must be a positive number");
  });

  it("attack should return atk * 2", () => {
    const w = new Warrior(2);
    expect(w.attack()).toBe(4);
  });
});

describe("MagicWarrior class", () => {
  it("should create a MagicWarrior with positive atk and mgc", () => {
    const mw = new MagicWarrior(1, 2);
    expect(mw.attack()).toBe(4);
  });

  it("should throw error for negative atk", () => {
    expect(() => new MagicWarrior(-1, 1)).toThrow(
      "atk must be a positive number",
    );
  });

  it("should throw error for negative mgc", () => {
    expect(() => new MagicWarrior(1, -1)).toThrow(
      "mgc must be a positive number",
    );
  });

  it("attack should return (atk*2) + mgc", () => {
    const mw = new MagicWarrior(4, 6);
    expect(mw.attack()).toBe(14);
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("WarriorFn function", () => {
  it("should create a WarriorFn with positive atk", () => {
    const w = new (WarriorFn as any)(1);
    expect(w.attack()).toBe(2);
  });

  it("should throw error for negative atk", () => {
    expect(() => new (WarriorFn as any)(-1)).toThrow(
      "atk must be a positive number",
    );
  });

  it("attack should return atk * 2", () => {
    const w = new (WarriorFn as any)(2);
    expect(w.attack()).toBe(4);
  });
});

describe("MagicWarriorFn function", () => {
  it("should create a MagicWarriorFn with positive atk and mgc", () => {
    const mw = new (MagicWarriorFn as any)(1, 2);
    expect(mw.attack()).toBe(4);
  });

  it("should throw error for negative atk", () => {
    expect(() => new (MagicWarriorFn as any)(-1, 1)).toThrow(
      "atk must be a positive number",
    );
  });

  it("should throw error for negative mgc", () => {
    expect(() => new (MagicWarriorFn as any)(1, -1)).toThrow(
      "mgc must be a positive number",
    );
  });

  it("attack should return (atk*2) + mgc", () => {
    const mw = new (MagicWarriorFn as any)(4, 6);
    expect(mw.attack()).toBe(14);
  });
});
