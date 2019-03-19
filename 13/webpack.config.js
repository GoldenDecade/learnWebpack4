const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

const path = require('path')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    // publicPath: __dirname + "/dist/", // js引用路径或者CDN地址
    publicPath: "./", // js引用路径或者CDN地址
    path: path.resolve(__dirname, "dist"), // 打包文件的输出目录
    filename: "[name]-[hash:5].bundle.js",
    chunkFilename: "[name]-[hash:5].chunk.js"
  },
  plugins: [
      //cleanWebpackPlugin 放在plugin配置项的最后一个，因为webpack 配置是倒序的，最后配置的最先执行，以保证每次正式打包前，先清空原来遗留的打包文件
      new htmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        chunks: ['app'], // 入口文件
      }),
      new cleanWebpackPlugin(),// 默认 webpack中 output中path 指定的路径 文件夹将会被清空
  ]
}