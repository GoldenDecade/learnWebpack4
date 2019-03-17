import base from './assets/css/base.css'
//动态 加载和卸载css 样式；
let num = 0;
setInterval(()=> {
  if(num % 2) {
    base.use();
  }else {
    base.unuse()
  }
  num++;
}, 1000)
