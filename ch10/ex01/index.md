# mode が none

圧縮も展開もしない素直なWebpackバンドル形式

```js
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = [
    ,
    /* 0 */ /* 1 */
    /***/ (__unused_webpack_module, exports) => {
      const sum = (x, y) => x + y;
      const square = (x) => x * x;

      exports.mean = (data) => data.reduce(sum) / data.length;
      exports.stddev = function (d) {
        let m = exports.mean(d);
        return Math.sqrt(
          d
            .map((x) => x - m)
            .map(square)
            .reduce(sum) /
            (d.length - 1),
        );
      };

      /***/
    },
    /* 2 */
    /***/ (__unused_webpack_module, exports) => {
      class AbstractSet {
        has(x) {
          throw new Error("Abstract method");
        }
      }

      class NotSet extends AbstractSet {
        constructor(set) {
          super();
          this.set = set;
        }

        has(x) {
          return !this.set.has(x);
        }

        toString() {
          return `{x| x ∉ ${this.set.toString()} }`;
        }
      }

      class RangeSet extends AbstractSet {
        constructor(from, to) {
          super();
          this.from = from;
          this.to = to;
        }

        has(x) {
          return x >= this.from && x <= this.to;
        }

        toString() {
          return `{ x| ${this.from} ≦ x ≦ ${this.to} }`;
        }
      }

      class AbstractEnumerableSet extends AbstractSet {
        get size() {
          throw new Error("Abstract method");
        }

        [Symbol.iterator]() {
          throw new Error("Abstract method");
        }

        isEmpty() {
          return this.size === 0;
        }

        toString() {
          return `{${Array.from(this).join(", ")} }`;
        }

        equals(set) {
          if (!(set instanceof AbstractEnumerableSet)) return false;
          if (this.size !== set.size) return false;
          for (let element of this) {
            if (!set.has(element)) return false;
          }
          return true;
        }
      }

      class Singletonset extends AbstractEnumerableSet {
        constructor(member) {
          super();
          this.member = member;
        }

        has(x) {
          return x === this.member;
        }

        get size() {
          return 1;
        }

        *[Symbol.iterator]() {
          yield this.member;
        }
      }

      class AbtractWritableSet extends AbstractEnumerableSet {
        insert(x) {
          throw new Error("Abstract method");
        }

        remove(x) {
          throw new Error("Abstract method");
        }

        add(set) {
          for (let element of set) {
            this.insert(element);
          }
        }

        substract(set) {
          for (let element of set) {
            this.remove(element);
          }
        }

        intersect(set) {
          for (let element of set) {
            if (!set.has(element)) {
              this.remove(element);
            }
          }
        }
      }

      class BitSet extends AbstractWritableSet {
        constructor(max) {
          super();
          this.max = max;
          this.n = 0;
          this.numBytes = Math.floor(max / 8) + 1;
          this.data = new Uint8Array(this.numBytes);
        }

        _valid(x) {
          return Number.isInteger(x) && x >= 0 && x < this.max;
        }

        _has(byte, bit) {
          return (this.data[byte] & BitSet.bits[bit]) !== 0;
        }

        has(x) {
          if (this._valid(x)) {
            let byte = Math.floor(x / 8);
            let bit = x % 8;
            return this._has;
          } else {
            return false;
          }
        }

        insert(x) {
          if (this._valid(x)) {
            let byte = Math.floor(x / 8);
            let bit = x % 8;
            if (!this._has(byte, bit)) {
              this.data[byte] |= BitSet.bits[bit];
              this.n++;
            }
          } else {
            throw new TypeError("Invalid set element: " + x);
          }
        }

        remove(x) {
          if (this._valid(x)) {
            let byte = Math.floor(x / 8);
            let bit = x % 8;
            if (this._has(byte, bit)) {
              this.data[byte] &= BitSet.masks[bit];
              this.n--;
            }
          } else {
            throw new TypeError("Invalid set element: " + x);
          }
        }

        get size() {
          return this.n;
        }

        *[Symbol.iterator]() {
          for (let i = 0; i < this.max; i++) {
            if (this.has(i)) {
              yield i;
            }
          }
        }
      }

      exports.BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
      exports.BitSet.masks = new Uint8Array([
        ~1,
        ~2,
        ~4,
        ~8,
        ~16,
        ~32,
        ~64,
        ~128,
      ]);

      /***/
    },
    /******/
  ];
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__,
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
  (() => {
    const stats = __webpack_require__(1);
    const BitSet = __webpack_require__(2).BitSet;

    let s = new BitSet(100);
    s.insert(10);
    s.insert(20);
    s.insert(30);
    let average = stats.mean([...s]);
  })();

  /******/
})();
```

# mode が development

ソースマップ用の eval 埋め込み付きでデバッグ向けに展開されたバンドル。

```js
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./ch10/ex01/index.cjs":
      /*!*****************************!*\
  !*** ./ch10/ex01/index.cjs ***!
  \*****************************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__,
      ) => {
        eval(
          '{const stats = __webpack_require__(/*! ./stats.cjs */ "./ch10/ex01/stats.cjs");\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ "./ch10/ex01/sets.cjs").BitSet);\n\nlet s = new BitSet(100);\ns.insert(10);\ns.insert(20);\ns.insert(30);\nlet average = stats.mean([...s]);\n\n//# sourceURL=webpack://preset-ts/./ch10/ex01/index.cjs?\n}',
        );

        /***/
      },

    /***/ "./ch10/ex01/sets.cjs":
      /*!****************************!*\
  !*** ./ch10/ex01/sets.cjs ***!
  \****************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "{class AbstractSet {\n    has(x) {\n        throw new Error('Abstract method');\n    }\n}\n\nclass NotSet extends AbstractSet {\n    constructor(set) {\n        super();\n        this.set = set;\n    }\n\n    has(x) {\n        return !this.set.has(x);\n    }\n\n    toString() {\n        return `{x| x ∉ ${this.set.toString()} }`;\n    }\n}\n\nclass RangeSet extends AbstractSet {\n    constructor(from, to) {\n        super();\n        this.from = from;\n        this.to = to;\n    }\n\n    has(x) {\n        return x >= this.from && x <= this.to;\n    }\n\n    toString() {\n        return `{ x| ${this.from} ≦ x ≦ ${this.to} }`;\n    }\n}\n\nclass AbstractEnumerableSet extends AbstractSet {\n    get size() {\n        throw new Error('Abstract method');\n    }\n\n    [Symbol.iterator]() {\n        throw new Error('Abstract method');\n    }\n\n    isEmpty() {\n        return this.size === 0;\n    }\n\n    toString() {\n        return `{${Array.from(this).join(', ')} }`;\n    }\n\n    equals(set) {\n        if (!(set instanceof AbstractEnumerableSet)) return false;\n        if (this.size !== set.size) return false;\n        for (let element of this) {\n            if(!set.has(element)) return false;\n        }\n        return true;\n    }\n}\n\nclass Singletonset extends AbstractEnumerableSet {\n    constructor(member) {\n        super();\n        this.member = member;\n    }\n\n    has(x) {\n        return x === this.member;\n    }\n\n    get size() {\n        return 1;\n    }\n\n    *[Symbol.iterator]() {\n        yield this.member;\n    }\n}\n\nclass AbtractWritableSet extends AbstractEnumerableSet {\n    insert(x) {\n        throw new Error('Abstract method');\n    }\n\n    remove(x) {\n        throw new Error('Abstract method');\n    }\n\n    add(set) {\n        for (let element of set) {\n            this.insert(element);\n        }\n    }\n\n    substract(set) {\n        for (let element of set) {\n            this.remove(element);\n        }\n    }\n\n    intersect(set) {\n        for (let element of set) {\n            if (!set.has(element)) {\n                this.remove(element);\n            }\n        }\n    }\n}\n\nclass BitSet extends AbstractWritableSet {\n    constructor(max) {\n        super();\n        this.max = max;\n        this.n = 0;\n        this.numBytes = Math.floor(max / 8) + 1;\n        this.data = new Uint8Array(this.numBytes);\n    }\n\n    _valid(x) {\n        return Number.isInteger(x) && x >= 0 && x < this.max;\n    }\n\n    _has(byte, bit) {\n        return (this.data[byte] & BitSet.bits[bit]) !== 0;\n    }\n\n    has(x) {\n        if (this._valid(x)) {\n            let byte = Math.floor(x / 8);\n            let bit = x % 8;\n            return this._has\n        } else {\n            return false;\n        }\n    }\n\n    insert(x) {\n        if (this._valid(x)) {\n            let byte = Math.floor(x / 8);\n            let bit = x % 8;\n            if (!this._has(byte, bit)) {\n                this.data[byte] |= BitSet.bits[bit];\n                this.n++;\n            }\n        } else {\n            throw new TypeError('Invalid set element: ' + x);\n        }\n    }\n\n    remove(x) {\n        if (this._valid(x)) {\n            let byte = Math.floor(x / 8);\n            let bit = x % 8;\n            if (this._has(byte, bit)) {\n                this.data[byte] &= BitSet.masks[bit];\n                this.n--;\n            }\n        } else {\n            throw new TypeError('Invalid set element: ' + x);\n        }\n    }\n\n    get size() {\n        return this.n;\n    }\n\n    *[Symbol.iterator]() {\n        for (let i = 0; i < this.max; i++) {\n            if (this.has(i)) {\n                yield i;\n            }\n        }\n    }\n}\n\nexports.BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\nexports.BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);\n\n\n\n//# sourceURL=webpack://preset-ts/./ch10/ex01/sets.cjs?\n}",
        );

        /***/
      },

    /***/ "./ch10/ex01/stats.cjs":
      /*!*****************************!*\
  !*** ./ch10/ex01/stats.cjs ***!
  \*****************************/
      /***/ (__unused_webpack_module, exports) => {
        eval(
          "{const sum = (x, y) => x + y;\nconst square = x => x * x;\n\nexports.mean = data => data.reduce(sum) / data.length;\nexports.stddev = function(d) {\n    let m = exports.mean(d);\n    return Math.sqrt(d.map(x => x - m).map(square).reduce(sum) / (d.length - 1));\n}\n\n//# sourceURL=webpack://preset-ts/./ch10/ex01/stats.cjs?\n}",
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__,
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__(
    "./ch10/ex01/index.cjs",
  );
  /******/
  /******/
})();
```

# mode が production

圧縮・難読化された本番向け最小サイズのバンドル。

```js
(() => {
  var t = {
      724: (t, r) => {
        const e = (t, r) => t + r,
          n = (t) => t * t;
        (r.mean = (t) => t.reduce(e) / t.length),
          (r.stddev = function (t) {
            let a = r.mean(t);
            return Math.sqrt(
              t
                .map((t) => t - a)
                .map(n)
                .reduce(e) /
                (t.length - 1),
            );
          });
      },
      800: (t, r) => {
        class e {
          has(t) {
            throw new Error("Abstract method");
          }
        }
        Symbol.iterator;
        Symbol.iterator,
          AbstractWritableSet,
          Symbol.iterator,
          (r.q.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128])),
          (r.q.masks = new Uint8Array([-2, -3, -5, -9, -17, -33, -65, -129]));
      },
    },
    r = {};
  function e(n) {
    var a = r[n];
    if (void 0 !== a) return a.exports;
    var s = (r[n] = { exports: {} });
    return t[n](s, s.exports, e), s.exports;
  }
  const n = e(724);
  let a = new (0, e(800).q)(100);
  a.insert(10), a.insert(20), a.insert(30), n.mean([...a]);
})();
```
