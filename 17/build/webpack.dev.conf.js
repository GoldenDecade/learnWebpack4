const webpack = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 8888,
    hot: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        logLevel: 'debug',
      }
    },
    historyApiFallback: {
      rewrites: [{from:/.*/, to: '/index.html'}]
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: path.resolve(__dirname,'../dist/index.html'), // 因为run dev之后，会在内存中生成dist 目录，所以
      // filename: 'index.html', // filename配置的html文件目录是（dist目录）相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的,也不是相对于根目录
      // template: path.resolve(__dirname, "..", "index.html"), //以根目录中的index.html作为模板; 路径是相对于根目录的
      template: 'index.html', //以根目录中的index.html作为模板; 路径是相对于根目录的； 这里必须写为'./index.html';
      chunks: ['app'],
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}