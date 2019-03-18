const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: __dirname + '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    alias: {
      //配置别名，在项目中缩减引用路径
      // jQuery$: path.resolve(__dirname, 'src/vendor/jquery.min.js'),
    }
  },
  plugins: [
    //  提供全局变量的，在模块中使用的时候就不需要require了
    new webpack.ProvidePlugin({
      // $: 'jquery',// 引用的是 npm 包
      jQuery: 'jQuery',// 指向的是本地src/vendor/jquery.min.js
    })
  ]
}
