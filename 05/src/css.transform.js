module.exports = function(css){
  console.log(css);
  return window.innerWidth > 1000 ? css.replace('red', 'green') : css;// 从这里可以看出，webpack通过style-loader将css打包为字符串，然后在适当时机更改样式
}