const path = require('path')

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
      }
    ]
  }
}