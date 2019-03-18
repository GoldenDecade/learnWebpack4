
const path = require('path')
// 使用 ExtractTextPlugin ，需要在plugins选项和 rules中scss的相关选项中进行配置
const ExtractTextPlugin = require('extract-text-webpack-plugin')



let extractTextPlugin = new ExtractTextPlugin({
  filename: '[name].min.css',
  allChunks: false, //这里必须指定为false，否则会异步加载css
})

/*
* sprites config
* */
let spritesConfig = {
  spritePath: "./dist/static"
}

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
            },
              /*loader for sprites*/
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [require('postcss-sprites')(spritesConfig)]
              }
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
      },
    ]
  },
  plugins: [
    extractTextPlugin
  ]
}