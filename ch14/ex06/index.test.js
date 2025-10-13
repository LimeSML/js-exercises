import { makeProxyAndLogs } from "./index";

describe("makeProxyAndLogs", () => {
  it("should return proxy and logs array", () => {
    const obj = {};
    const [proxy, logs] = makeProxyAndLogs(obj);
    expect(typeof proxy).toBe("object");
    expect(Array.isArray(logs)).toBe(true);
  });

  it("should log function calls with correct name and args", () => {
    const obj = {
      add: (a, b) => a + b,
    };
    const [proxy, logs] = makeProxyAndLogs(obj);

    expect(logs).toHaveLength(0);
    expect(proxy.add(1, 2)).toBe(3);
    expect(logs).toHaveLength(1);
    expect(logs[0].name).toBe("add");
    expect(logs[0].args).toEqual([1, 2]);
    expect(logs[0].timestamp instanceof Date).toBe(true);
  });

  it("should not log property access for non-functions", () => {
    const obj = { val: 123 };
    const [proxy, logs] = makeProxyAndLogs(obj);
    proxy.val;
    expect(logs).toHaveLength(0);
  });

  it("should throw TypeError if argument is null", () => {
    expect(() => makeProxyAndLogs(null)).toThrow(TypeError);
  });

  it("should throw TypeError if argument is not an object", () => {
    expect(() => makeProxyAndLogs(0)).toThrow(TypeError);
    expect(() => makeProxyAndLogs("str")).toThrow(TypeError);
    expect(() => makeProxyAndLogs(undefined)).toThrow(TypeError);
    expect(() => makeProxyAndLogs(true)).toThrow(TypeError);
  });
});
