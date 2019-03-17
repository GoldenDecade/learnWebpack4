// 懒加载
/*

import(/!* webpackChunkName: 'pageA' *!/ './subPageA').then((subPageA)=> {
  console.log(subPageA);
})

import(/!* webpackChunkName: 'pageB' *!/ './subPageB').then((subPageB)=> {
  console.log(subPageB);
})

// import * as _ from 'lodash'
import(/!* webpackChunkName: 'lodash' *!/ 'lodash').then((_)=>{
  console.log(_.join('2', '6'));
})
*/
//require.include是webpack 自己提供的，可以实现预加载功能，而不用将模块写在数组中，比require.ensure稍微简洁一点点儿
//另一个作用： 能把子模块中的公共部分，提取到福模块中，比如module.js 被subPageA.js 和 subPageB.js 都引用了，那么在page.js中include了 module.js,那么子模块中的就会被删掉，相当于提升到了父模块中，但是如果想使用module.js这个模块，还得使用require
require.include('./module.js'); //预加载module.js;  会将subPageA 和 subPageA 共用的modules.js打包在此page中;
require.ensure( // 这是CommonJS 的语法：webpack会将这里的模块打包在一起，这里指定的chunkName是 subPage
    ['./subPageA.js', './subPageB.js'], // js文件或者模块名称; 这里其实可以传一个空数组，如果接收了模块名称，作用就是实现 预加载懒执行； 当代码执行到这一行的时候，里面的模块subPageA.js 和 subPageB.js 会被浏览器下载下来，但是并不会执行模块中的代码，只有等到require的时候才会执行
    ()=> {
      let subPageA = require('./subPageA');// 引入后需要手动执行，控制台才会打印; 如果没有这句话，subPageA中的log就不会打印
      let subPageB = require('./subPageB');
    },
    'subPage'// chunkName
)

require.ensure(
    ['lodash'],
    ()=> {
      let _ = require('lodash');
      console.log(_.join('4', '5'));
    },
    'vendor'
)

export default 'page'
