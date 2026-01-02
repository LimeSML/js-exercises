## 標準入力とは
プログラムが外部からデータを受け取るための共通の入口のこと。

## 標準出力とは
プログラムが通常の処理結果を外部へ出すための共通の出口のこと。

## 標準エラー出力とは
エラーや警告などの異常情報を出力するための、標準出力とは分離された出口のこと。

## リダイレクトとは
標準入力・標準出力・標準エラー出力の向き先を、ファイルや別の経路に付け替える仕組みのこと。

## パイプとは
あるプログラムの標準出力を、別のプログラムの標準入力に直接つなぐ仕組みのこと。

## 実験予想
- `node cat.mjs`：キーボードの入力がターミナルに出力される
- `echo FOO | node cat.mjs`：FOOがターミナルに出力される
- `node cat.mjs > output.txt`：キーボードの入力が `output.txt` に出力される
- `node cat.mjs file`：ファイルの内容がターミナルに出力される
- `node cat.mjs file > output.txt`：ファイルの内容が `output.txt` に出力される
- `node cat.mjs invalid-file > output.txt`：ファイルが見つからずにエラーがターミナルに出力される
- `node cat.mjs invalid-file 2> error.txt`：ファイルが見つからずにエラーが `error.txt` に出力される

## 実験結果
- `node cat.mjs`：キーボードの入力がターミナルに出力された
- `echo FOO | node cat.mjs`：FOOがターミナルに出力された
- `node cat.mjs > output.txt`：キーボードの入力が `output.txt` に出力された
- `node cat.mjs file`：ファイルの内容がターミナルに出力される
- `node cat.mjs file > output.txt`：ファイルの内容が `output.txt` に出力された
- `node cat.mjs invalid-file > output.txt`：ファイルが見つからずにエラーがターミナルに出力された
- `node cat.mjs invalid-file 2> error.txt`：ファイルが見つからずにエラーが `error.txt` に出力された