const path = require('path')

const webpack = require('webpack')
const merge = require('webpack-merge')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");// 对应prod 模式下的，style-loader
//===================
const htmlWebpackPlugin = require('html-webpack-plugin')


const prodConfig = require('./webpack.prod.conf')
const devConfig = require('./webpack.dev.conf')



const generateConfig = env => {
  return {
    entry: {
      app: './src/app.js'
    },
    output: {
      publicPath: './',
      path: path.resolve(__dirname, '../dist'),
      filename: '[name]-[hash:5].bundle.js',
      chunkFilename: '[name]-[hash:5].chunk.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: env === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              // loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                // publicPath: '../'
              }
            },
            "css-loader"
          ]
        },
        {
          test: /\.(eot|woff2?|ttf|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name]-[hash:5].min.[ext]',
                limit: 5000, // fonts file size <= 5KB, use 'base64, else output svg file
                publicPath: './static/fonts/',
                outputPath: './static/fonts/'
              }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: {
            loader: 'url-loader', // 同时需要安装file-loader  对于图片比较大的会使用file-loader 解析
            options: {
              limit: 20000,
              name: '[name]-[hash:5].min.[ext]',
              publicPath: './static/',
              outputPath: './static/',
            }
          }
        }

      ]
    },
    plugins: [
      new htmlWebpackPlugin({
        filename: './index.html', // filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
        // template: path.resolve(__dirname, "..", "index.html"), //以根目录中的index.html作为模板; 路径是相对于根目录的
        template: './index.html', //以根目录中的index.html作为模板; 路径是相对于根目录的； 这里必须写为'./index.html';
        chunks: ['app'],
        minify: {
          collapseWhitespace: true
        }
      }),
      new webpack.ProvidePlugin({
        $: 'jquery'
      }),
    ]
  }
}

module.exports = function (env) {
  console.log('env: ' + env);
  return merge(generateConfig(env), env === 'production' ? prodConfig : devConfig)
}