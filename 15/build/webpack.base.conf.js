const path = require('path')

const webpack = require('webpack')
const merge = require('webpack-merge')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");// 对应prod 模式下的，style-loader
//===================


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
          use: [
            {
              loader: 'url-loader', // 同时需要安装file-loader  对于图片比较大的会使用file-loader 解析
              options: {
                limit: 20000,
                name: '[name]-[hash:5].min.[ext]',
                publicPath: './static/',
                outputPath: './static/',
              }
            },
            //  img-loader 为了压缩图片
            {
              loader: 'img-loader',
              options: {
                plugins: [
                  //需要单独下载  imagemin-pngquant 插件
                  require('imagemin-pngquant')({
                    quality: [0.3, 0.5], // 设置图片所需颜色的
                  }),
                  /*require('imagemin-gifsicle')({
                    interlaced: false
                  }),
                  require('imagemin-mozjpeg')({
                    progressive: true,
                    arithmetic: false
                  }),
                  require('imagemin-svgo')({
                    plugins: [
                      { removeTitle: true },
                      { convertPathData: false }
                    ]
                  })*/
                ]
              }
            }
          ]
        }

      ]
    },
    plugins: [

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