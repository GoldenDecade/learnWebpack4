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
      // $: 'jquery/dist/jquery.min.js',
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      // $: 'jquery',
    })
  ]
}
