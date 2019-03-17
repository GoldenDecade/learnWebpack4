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
        use: [
          {
            loader: 'style-loader/url'
          },
          //  将css编译为文件才能通过link标签插入，所以需要file-loader；
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  }
}