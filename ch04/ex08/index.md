## 理由
古いブラウザや環境で、undefined はグローバル変数として定義されていた。そのため、undefined を直接書くと、もしその変数が上書きされていた場合、予期しない挙動を引き起こす可能性があったため。