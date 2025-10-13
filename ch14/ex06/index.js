export function makeProxyAndLogs(obj) {
  if (obj == null) {
    throw new TypeError("argument must be object");
  }
  if (typeof obj !== "object") {
    throw new TypeError("argument must be object");
  }

  const logs = [];
  const handler = {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);

      // 関数ならラップして呼び出しを記録
      if (typeof value === "function") {
        return function (...args) {
          logs.push({
            name: prop.toString(),
            args,
            timestamp: new Date(),
          });
          // 元のメソッドを呼ぶ
          return value.apply(this, args);
        };
      }

      // 関数でなければそのまま返す
      return value;
    },
  };

  const proxy = new Proxy(obj, handler);
  return [proxy, logs];
}

// const a = {
//     p: 1,
//     f: (x, y) => {
//         return x + y;
//     },
// };

// const [proxy, logs] = makeProxyAndLogs(a);

// console.log(logs); // []
// console.log(proxy.p); // 1
// console.log(proxy.f(1, 2)); // 3
// console.log(logs); // [{ name: "c", args: [1, 2], timestamp: ... }]
