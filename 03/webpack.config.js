const webpack = require('webpack')
const path = require('path')

module.exports = {
  //多页面应用
  entry: {
    pageA: './src/pageA.js',
    pageB: './src/pageB.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    splitChunks:{
      chunks: 'all',
      minSize: 30000,// 对于大于30KB的文件才会split
      minChunks: 1,// 对于被引用次数超过1的
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        //注意： priority 优先级，决定先打包那个； 默认先打包node_modules
        //其次： 打包业务中公共代码
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 1,
          priority: 0
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10,
        },
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          priority: 0,
          enforce: true,// 会忽略上面配置的  minSize等配置项，目的是为了将所有公用的style  都抽离
        },
        stylus: {
          test: /\.styl(us)?$/,
          name: 'stylus',
          chunks: 'all',
          priority: 0,
          enforce: true,
        },
        default: {
          minChunks: 1,
          priority: -10,
          reuseExistingChunk: true// 如果当前文件包含的引用，已经在其他bundle里面split过了，那么就引用已经split的文件
        }
      }
    }
  }
}