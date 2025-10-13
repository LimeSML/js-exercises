import { counterGenerator } from "./index";

describe("counter generator", () => {
  test("shoudl return incrementing numbers starting from 0", () => {
    const cntGen = counterGenerator();
    expect(cntGen.next()).toEqual({ value: 0, done: false });
    expect(cntGen.next()).toEqual({ value: 1, done: false });
    expect(cntGen.next()).toEqual({ value: 2, done: false });
    expect(cntGen.next()).toEqual({ value: 3, done: false });
  });

  test("should reset count to 0 when throw is called", () => {
    const cntGen = counterGenerator();
    cntGen.next();
    cntGen.next();
    cntGen.next();

    expect(cntGen.throw("reset")).toEqual({ value: 0, done: false });
    expect(cntGen.next()).toEqual({ value: 1, done: false });
    expect(cntGen.next()).toEqual({ value: 2, done: false });
  });
});
