## `tsc`
TypeScript が公式に提供するコンパイラであり、型チェックをを行ったうえで、TS から JS にトランスパイルする。
また、`tsconfig.json` による詳細な設定管理が可能で、型エラーがある場合はビルドを失敗させられる。

## `@babel/preset-typescript`
TypeScript を JavaScript にトランスパイルするための Babel プリセットで、型チェックは行わない。
型注釈・interface・type などを削除し、構文変換のみを高速に行う。