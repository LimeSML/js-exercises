# 予想
型付き配列を使うことで連続したメモリ領域が使用され、高速になる。
また、局所性も考慮すると高速になると考えられる

# 結果
型付き配列のほうが早いケースもあれば遅いケースもあった。
考察としては、最適化が進んでいる？
```
arrayMultiply: 1836.0398890000001
typedArrayMultiply: 1756.709855

arrayMultiply: 1713.5488240000004
typedArrayMultiply: 1733.3512449999998

arrayMultiply: 1697.6131759999998
typedArrayMultiply: 1710.7428339999997

arrayMultiply: 1724.1595899999998
typedArrayMultiply: 1722.855181

arrayMultiply: 1692.0764249999997
typedArrayMultiply: 1741.4988780000003
```