# 予想されるコンソール出力
answer というキーを持ち、その値が42のオブジェクトがコンソールに表示される。
その後、answer というキーを持ち、その値が0のオブジェクトがコンソールに表示される。

# 実際のコンソール出力
answer というキーを持ち、その値が0のオブジェクトがコンソールに表示される。
その後、answer というキーを持ち、その値が0のオブジェクトがコンソールに表示される。

# 開発者ツールを開いた状態のタブで HTML を開いた場合
answer というキーを持ち、その値が42のオブジェクトがコンソールに表示される。
その後、answer というキーを持ち、その値が0のオブジェクトがコンソールに表示される。

# HTML を開いた状態のタブで開発者ツールを開いた場合
answer というキーを持ち、その値が0のオブジェクトがコンソールに表示される。
その後、answer というキーを持ち、その値が0のオブジェクトがコンソールに表示される。

# コード修正
原因として、 answer が0に変更されたのちにコンソールに出力しようとするため、どちらも0で出力されてしまう。
なので、その時点でのコピーを作ってあげる。
```
let life = { answer: 42 };
console.log(JSON.parse(JSON.stringify(life)));
life.answer = 0;
console.log(JSON.parse(JSON.stringify(life))); 
```