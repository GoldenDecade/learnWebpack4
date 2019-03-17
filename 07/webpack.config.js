const path = require('path')
// 使用 ExtractTextPlugin ，需要在plugins选项和 rules中scss的相关选项中进行配置
module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: __dirname + '/dist/',
    path: path.resolve(__dirname , 'dist'),
    filename: '[name].bundle.js'
  },
  mode: 'production',//不在需要 UglifyjsWebpackPlugin; 只要配置mode为‘production’就可以显示激活 UglifyjsWebpackPlugin 插件
}