## 回答
メモリを食い続ける処理を書き、メモリリークを引き起こす

```javascript
set42(
    `
    const array = [];
    while(true) {
        array.push(new Array(1000000000));
    }
    hello
    `
)
```