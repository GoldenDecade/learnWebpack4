//Tree shaking ： 项目中没有使用的代码会在打包时丢掉；
//Tree shaking 依赖的是 ES6中的模块系统 （import 和 export）

import {a, b} from './js/util'
// 这里只用到了 util.js 中的  函数 a; 所以打包出来的文件中 不会有 函数 b 和 函数 c;
a();

// 如何处理第三方JS库？
// import {chunk } from 'lodash' // 此时发现打包之后的app.bundle.js 居然有70KB，只是使用了其中的一个函数，这样不合理
import {chunk} from 'lodash-es' // 因为lodash 没有使用CommonJS 或者 ES6的写法，所以，安装库对应的模块系统即可;  此时打包之后只有3.48KB

console.log(chunk([1, 2, 3], 2));
