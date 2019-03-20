const path = require('path')

// const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const PurifyCSS = require('purifycss-webpack') //主要是这个插件，去除多余CSS  代码
const glob = require('glob-all')// 帮助PurifyCSS进行路径处理，定位要做Tree shaking的路径文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");// 对应prod 模式下的，style-loader

//压缩CSS代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    /*splitChunks: {
      chunks: 'all',
      minSize: 30000,// 对于大于30KB的文件才会split
      minChunks: 1,// 对于被引用次数超过1的
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },*/
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
    }),
    new PurifyCSS({
      paths: glob.sync([
        //要对CSS Tree Shaking的文件路径
        path.resolve(__dirname, '../*.html'),// 路径是相对于当前目录的
        path.resolve(__dirname, '../src/!*.js'),
      ])
    }),
    new cleanWebpackPlugin()
  ]
}