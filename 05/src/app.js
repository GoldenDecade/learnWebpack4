/*
* target:
* 1. 打包为link标签引入css文件
* 2. 打包为style标签引入css样式
* 3. 加载和卸载css文件
* 4. 通过css.transform.js 文件 动态更改css样式
* */
import base from './assets/css/base.css'
/*//动态 加载和卸载css 样式；
let num = 0;
setInterval(()=> {
  if(num % 2) {
    base.use();
  }else {
    base.unuse()
  }
  num++;
}, 1000)*/
