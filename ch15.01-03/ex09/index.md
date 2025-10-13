# Angular の XSS 対策

- すべての値を信頼されていないものとして扱う
- Angular に組み込まれた DomSanitizer を使用して、信頼されていない HTML などをサニタイズする
  - script 要素は削除するが、b 要素などの安全なものは保持される
- AOT(Ahead-of-Time) コンパイラを利用できる
  - AOT コンパイラは、Angular のテンプレートや TypeScript コードを事前に最適なJavaScript に変換し、本番用のビルドファイルとして出力するもの
  - 事前にコンパイルされるため、ブラウザ側で新しいテンプレートや Angular 式が注入、実行されることがない

# それでも残る危険性

- サニタイズをバイパスする API があるが、それの誤用
- DOM API や外部ライブラリを利用して操作をした場合、Angular では検知できない

[Angular XSS の防止](https://angular.jp/best-practices/security#preventing-cross-site-scripting)
