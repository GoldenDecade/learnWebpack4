const path = require('path')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: __dirname + '/dist/',
    path: path.resolve(__dirname , 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        /*use: [
          {
            loader: 'style-loader/url'
          },
          //  将css编译为文件才能通过link标签插入，所以需要file-loader；
          {
            loader: 'file-loader'
          }
        ]*/
        //将css放在style标签中可以减少网络请求次数，提高响应时间；
        //注意： 老式IE浏览器，对style标签的数量是有限制的
        /*use: [
          {
            // loader: 'style-loader',
            loader: 'style-loader/useable',// 注意此处 useable; 它给css文件对象 增加了两个方法 cssObj.use() & cssObj.unuse(); js中引入的css文件是否插入到HTML中; 只要import了css文件，都会将css文件打包为js代码；
            options: {
              singleton: true //将css文件处理为单个 style 标签 引入
            }
          },
          {
            loader: 'css-loader',
          }
        ]*/
      //  页面加载css前的 transform
        use: [
          {
            loader: 'style-loader',
            options: {
              transform: './src/css.transform.js' // transform 文件，用于在某个时间点 更改样式
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}