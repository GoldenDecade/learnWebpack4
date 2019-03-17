//针对scss懒加载，需要引入以下配置：
import 'style-loader/lib/addStyles'
import 'css-loader/lib/css-base'
//--------

import './scss/base.scss'

let loaded = false;
window.addEventListener('click', ()=> {
  if(!loaded) {
    import(/* webpackChunkName: 'style' */ './scss/common.scss').then(()=> {
    //  chunkName: style
      console.log('change bg-color of html');
      loaded = true;
    })
  }
})