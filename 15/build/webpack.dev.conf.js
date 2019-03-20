const webpack = require('webpack')
const path = require('path')

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}