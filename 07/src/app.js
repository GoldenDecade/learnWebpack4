//Tree shaking ： 项目中没有使用的代码会在打包时丢掉；

import {a, b} from './js/util'
// 这里只用到了 util.js 中的  函数 a; 所以打包出来的文件中 不会有 函数 b 和 函数 c;
a();