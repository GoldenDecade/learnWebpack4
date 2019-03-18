const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:5].bundle.js",
    chunkFilename: "[name]-[hash:5].chunk.js"
  },
  mode: 'development', //开发模式
  devtool: 'source-map',// 开启调试
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8000,
    hot: true,// 热重载
    overlay: true,// 如果代码出错，会在浏览器页面弹出“浮动层”一样的黑色错误信息，类似与 vue-cli的报错
    proxy: {
      //  跨域代理转发
      '/api': {
        //注意 target的地址后面以 / 结尾
        target: 'http://localhost:8081/',// 原接口： http://localhost:8081/api/user132; 这样ajax请求的时候 url: '/api/user132';
        changeOrigin: true,
      }
    },
    historyApiFallback: {
    //  HTML5 history模式
      rewrites: [{from:/.*/, to: '/index.html'}]
    }

  },
  plugins: [
      new htmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html',
        chunks: ['app'],
      }),
      //---------------
      //这两个插件是为模块热更新的，并且顺序不能错，并且指定devServer.hot 为true；这样就可以检测文件变更及时打包
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      //-----------------
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
  ]
}