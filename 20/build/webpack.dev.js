const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path =require('path');
const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    // 只是对JS的tree shaking,而且也是只对ES6的起作用 也就是 import export; 会忽略一些文件,
    /* sideEffects
    "side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。
    * */
    optimization: {
        usedExports: true
    },
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        port: 8080,
        // hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
module.exports = merge(commonConfig, devConfig);