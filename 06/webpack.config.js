const path = require('path')
// 使用 ExtractTextPlugin ，需要在plugins选项和 rules中scss的相关选项中进行配置
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
      /*{
        test: /\.(sc|sa)ss$/,
        use: [
          {
            loader: 'style-loader',//将JS字符串生成为style节点
          },
          {
            loader: 'css-loader',//将css转化为CommonJS模块
          },
          {
            loader: 'sass-loader',// 将sass编译为css
          },
        ]
      }*/
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
      new ExtractTextPlugin({
        filename: '[name].min.css',
        allChunks: false, //这里必须指定为false，否则会异步加载css
      })
  ]
}