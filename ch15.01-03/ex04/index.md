# グローバルオブジェクトを参照する方法
## ブラウザ内
```
window
```

## Node 内
```
global
```

## ブラウザ/Node
```
globalThis
```

# ブラウザ独自のプロパティ/メソッド
* document
* navigator
* alert
* confirm
* prompt
* localStorage
* sessionStorage
* indexedDB
* history
* location

# グローバルオブジェクトに undefined が定義されて発生した問題
`undefined` が上書き可能だったため、`undefined` であるかどうかといった判定する処理が壊れてしまう可能性があった