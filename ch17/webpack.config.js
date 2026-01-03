import path from 'path';

export default {
    // エントリーポイント
    entry: './ex05/index.js',
    
    // 出力設定
    output: {
        path: path.resolve('./ex05/dist'),
        filename: "bundle.js",
    },

    // モード設定
    mode: 'development',

    // https://webpack.js.org/configuration/devtool/
    devtool: 'eval-source-map'
}