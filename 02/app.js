// import { a, ina } from './vendor/a'
// import {b} from './vendor/b'
// var m = require('./vendor/c')
// var d = require('./vendor/d')


// setInterval(()=> {
  // a++;
  // ina();
  // m.a++;
  // console.log('app.js: ' + a);
  // console.log('app.js: ' + b);
  // console.log('app.js: ' + m.a);
  // console.log('app.js: ' + d.d);

  // d.incrementD();
  // console.log('app.js incrementD: ' + JSON.stringify(d.d));
  // console.log('app.js incrementD: ' + JSON.stringify(d.d1));
// }, 3000)

//CommonJS
let minus = require('./vendor/minus')
console.log(minus(5, 3));


//AMD  比较慢 最后一个打印  异步加载模块，模块的加载不影响它后面语句的执行，所有依赖这个模块的语句，都定义在一个回调函数中，等待加载完成之后，这个回调函数才会运行。
require(['./vendor/multi.js'], (multi)=> {
  console.log(multi(8, 7));
})

//ES6
import {sum} from './vendor/sum.js'
console.log(sum(9, 10));