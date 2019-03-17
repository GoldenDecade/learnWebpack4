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
        test: /\.css$/,
        /*use: [
          {
            loader: 'style-loader/url'
          },
          //  将css编译为文件才能通过link标签插入，所以需要file-loader；
          {
            loader: 'file-loader'
          }
        ]*/
        //将css放在style标签中可以减少网络请求次数，提高响应时间；
        //注意： 老式IE浏览器，对style标签的数量是有限制的
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true //将css文件处理为单个 style 标签 引入
            }
          },
          {
            loader: 'css-loader',
          }
        ]
      }
    ]
  }
}