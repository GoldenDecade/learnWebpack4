/*
* target: CSS Tree Shaking
* 去除多余的CSS代码
* PurifyCSS + glob-all + extract-text-webpack-plugin 这三个插件
* */
const path = require('path')
// 使用 ExtractTextPlugin ，需要在plugins选项和 rules中scss的相关选项中进行配置
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSS = require('purifycss-webpack') //主要是这个插件，去除多余CSS  代码
const glob = require('glob-all')// 帮助PurifyCSS进行路径处理，定位要做Tree shaking的路径文件



let extractTextPlugin = new ExtractTextPlugin({
  filename: '[name].min.css',
  allChunks: false, //这里必须指定为false，否则会异步加载css
})
let purifyCSS_Plugin = new PurifyCSS({
  paths: glob.sync([
      //要对CSS Tree Shaking的文件路径
      path.resolve(__dirname, './*.html'),
      path.resolve(__dirname, './src/*.js'),
  ])
})



module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: __dirname + '/dist/',
    path: path.resolve(__dirname , 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader',
            }
          ]
        })
      }
    ]
  },
  plugins: [
    extractTextPlugin,
    purifyCSS_Plugin
  ]
}