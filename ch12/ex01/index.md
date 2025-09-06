# counterIter()
## 明示的にイテレータプロトコルの next() を呼び出す
イテレータオブジェクト生成の際に、`counterIter()` のログが出力された。そして、そのイテレータオブジェクトの `next()` を呼ぶとそのログが出力され、反復結果オブジェクトが返された。

```js
const iter1 = counterIter(3);
console.log(iter1.next());
```
```
counterIter
counterIter: next
{ value: 1, done: false }
```

## 明示的にイテレータプロトコルの return() を呼び出す
イテレータオブジェクト生成の際に、`counterIter()` のログが出力された。そして、そのイテレータオブジェクトの `return()` を呼ぶと、引数の値が含まれたログが出力された。加えて、引数の値が反復結果オブジェクトに格納され、`done` プロパティは `true` になる。

```js
const iter2 = counterIter(3);
console.log(iter2.return('強制終了'));
```
```
counterIter
counterIter: return: 強制終了
{ value: '強制終了', done: true }
```

## 明示的にイテレータプロトコルの throw() を呼び出す
イテレータオブジェクト生成の際に、`counterIter()` のログが出力された。そして、そのイテレータオブジェクトの `throw()` を呼ぶと、引数の値が含まれたログが出力された。さらに、`catch` ブロックで `throw()` に渡した引数がキャッチされた。

```js
const iter3 = counterIter(3);
try {
    iter3.throw('エラー');
} catch (e) {
    console.log(e);
}
```
```
counterIter
counterIter: throw: エラー
エラー
```

## for-of ループを実行
イテレータオブジェクト生成の際に、`counterIter()` のログが出力された。イテレータオブジェクト自身を反復可能として扱うために `[Symbol.iterator]()` が呼ばれ、そのログが出力された。あとは最後まで `next()` 呼ばれ続けた。

```js
for (const v of counterIter(3)) {
    console.log(v);
}
```
```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: next
3
counterIter: next
```

## for-of ループを実行途中で break
イテレータオブジェクト生成の際に、`counterIter()` のログが出力された。イテレータオブジェクト自身を反復可能として扱うために `[Symbol.iterator]()` が呼ばれ、そのログが出力された。途中で `break` すると、`return()` のログが出力された。引数には何も与えずに `return()` を呼ぶのと同じため、`undefined` がログに含まれる。

```js
for (const v of counterIter(3)) {
    console.log(v);
    if (v === 2) {
        break;
    }
}
```
```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: return: undefined
```

## for-of ループを実行中に例外発生
イテレータオブジェクト生成の際に、`counterIter()` のログが出力された。イテレータオブジェクト自身を反復可能として扱うために `[Symbol.iterator]()` が呼ばれ、そのログが出力された。途中でエラーがスローされると、ループが停止するため、`return()` のログが出力されて終了となった。引数には何も与えずに `return()` を呼ぶのと同じため、`undefined` がログに含まれる。最後のログはスローされたエラーをキャッチした際のもの。

```js
try {
    for (const v of counterIter(3)) {
        console.log(v);
        if (v === 2) {
            throw new Error('エラー');
        }
    }
} catch (e) {
    console.log('キャッチ:', e);
}
```
```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: return: undefined
キャッチ: Error: エラー
    at file:///home/raimuhoshi/js-exercises/ch12/ex01/index.js:74:19
    at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:578:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
```

# counterGen()
## 明示的にイテレータプロトコルの next() を呼び出す
`counterGen()` を呼んだ時点ではログは出力されていない。`next()` を呼ぶと `yield` 文まで実行されるため、`counterGen` と `next` のログが出力され、`yield` 文で返す反復結果オブジェクトが返ってくる。

```js
const gen1 = counterGen(3);
console.log(gen1.next());
```
```
counterGen
counterGen: next
{ value: 1, done: false }
```

## 明示的にイテレータプロトコルの return() を呼び出す
### next() を呼ばなかった場合
`counterGen()` を呼んだ時点ではログは出力されていない。`return()` を呼ぶと `value` プロパティの値に引数の値、`done` プロパティが `false` の反復結果オブジェクトが返ってくる。

```js
const gen2 = counterGen(3);
console.log(gen2.return('強制終了'),);
```
```
{ value: '強制終了', done: true }
```

### next() を呼んだ場合
`counterGen()` を呼んだ時点ではログは出力されていない。`next()` を呼ぶと `yield` 文まで実行されるため、`counterGen` と `next` のログが出力され、`yield` 文で返す反復結果オブジェクトが返ってくる。`return()` を呼ぶと `yield` 文から実行が再開されるため、`finally` ブロックのログが出力される。また、`value` プロパティの値に引数の値、`done` プロパティが `true` の反復結果オブジェクトが返ってくる。

```js
const gen2 = counterGen(3);
console.log(gen2.next());
console.log(gen2.return('強制終了'),);
```
```
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: finally
{ value: '強制終了', done: true }
```

## 明示的にイテレータプロトコルの throw() を呼び出す
### next() を呼ばなかった場合
`counterGen()` を呼んだ時点ではログは出力されていない。`throw()` を呼ぶと引数として渡した値を `catch` ブロックでキャッチした。
```js
const gen3 = counterGen(3);
try {
    gen3.throw('エラー');
} catch (e) {
    console.log(e);
}
```
```
エラー
```

### next() を呼んだ場合
`counterGen()` を呼んだ時点ではログは出力されていない。`next()` を呼ぶと `yield` 文まで実行されるため、`counterGen` と `next` のログが出力され、`yield` 文で返す反復結果オブジェクトが返ってくる。`throw()` を呼ぶと `yield` 文から実行が再開されるため、ジェネレータ側の `catch` ブロックのログが出力される。また、引数として渡した値を `catch` ブロックでキャッチした。

```js
const gen3 = counterGen(3);
console.log(gen3.next());
try {
    gen3.throw('エラー');
} catch (e) {
    console.log(e);
}
```
```
counterGen
counterGen: next
{ value: 1, done: false }
counterGen: catch: エラー
counterGen: finally
エラー
```

## for-of ループを実行
`counterGen()` を呼んだ時点ではログは出力されていない。`next()` が呼ばれると `yield` 文まで実行されるため、`counterGen` と `next` のログが出力され、`yield` 文で返す値が返ってくる。それが繰り返され、最後に `finally` ブロックのログが出力される。

```js
for (const v of counterGen(3)) {
    console.log(v);
}
```
```
counterGen
counterGen: next
1
counterGen: next
2
counterGen: next
3
counterGen: finally
```

## for-of ループを実行途中で break
`counterGen()` を呼んだ時点ではログは出力されていない。`next()` が呼ばれると `yield` 文まで実行されるため、`counterGen` と `next` のログが出力され、`yield` 文で返す値が返ってくる。それが繰り返され、途中で `break` によりループがとまる。その際に `finally` ブロックのログが出力される。

```js
for (const v of counterGen(3)) {
    console.log(v);
    if (v === 2) {
        break;
    }
}
```
```
counterGen
counterGen: next
1
counterGen: next
2
counterGen: finally
```

## for-of ループを実行中に例外発生
`counterGen()` を呼んだ時点ではログは出力されていない。`next()` が呼ばれると `yield` 文まで実行されるため、`counterGen` と `next` のログが出力され、`yield` 文で返す値が返ってくる。それが繰り返され、途中でエラーがスローされることによりループがとまる。その際に `finally` ブロックのログが出力される。最後のログはスローされたエラーをキャッチした際のもの。

```js
try {
    for (const v of counterGen(3)) {
        console.log(v);
        if (v === 2) {
            throw new Error('エラー');
        }
    }
} catch (e) {
    console.log('キャッチ:', e);
}
```
```
counterGen
counterGen: next
1
counterGen: next
2
counterGen: finally
キャッチ: Error: エラー
    at file:///home/raimuhoshi/js-exercises/ch12/ex01/index.js:113:19
    at ModuleJob.run (node:internal/modules/esm/module_job:271:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:578:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
```
