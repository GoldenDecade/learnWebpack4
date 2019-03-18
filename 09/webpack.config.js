
const path = require('path')
// 使用 ExtractTextPlugin ，需要在plugins选项和 rules中scss的相关选项中进行配置
const ExtractTextPlugin = require('extract-text-webpack-plugin')



let extractTextPlugin = new ExtractTextPlugin({
  filename: '[name].min.css',
  allChunks: false, //这里必须指定为false，否则会异步加载css
})



module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: __dirname + '/dist/',
    path: path.resolve(__dirname , 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
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
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:5].min.[ext]',
            limit: 20000,
            publicPath: './static/',
            outputPath: './static/'
          }
        }
        ]
      }
    ]
  },
  plugins: [
    extractTextPlugin
  ]
}