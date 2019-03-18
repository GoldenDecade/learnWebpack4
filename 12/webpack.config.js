const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:5].bundle.js",
    chunkFilename: "[name]-[hash:5].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src']
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:8].min.[ext]',
              limit: 20000,
              publicPath: 'static/',
              outputPath: 'static/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        chunks: ['app'], // entry中的app入口文件才会被打包
        minify: {
          collapseWhitespace: true
        }
      })
  ]
}