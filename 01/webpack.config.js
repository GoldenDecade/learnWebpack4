const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    app: './app.js',
  },
  output: {
    publicPath: __dirname + '/dist/', // https://www.cnblogs.com/SamWeb/p/8353367.html
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  }
}