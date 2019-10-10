import 'babel-polyfill';
import './assets/css/common.css';
import './assets/css/index.css';

import './assets/fonts/iconfont.css';
import a from './assets/js/test';
/* eslint-disable */
++a;

console.log(a);
/* eslint-enable */


// console.log(a);
// import sum from "./assets/js/sum";
// console.log("sum(1, 12) = ", sum(1, 12));
// let minus = require("./assets/js/minus");
// console.log("minus(1, 2) = ", minus(1, 2));
require(['./assets/js/multi'], function(multi) {
  // console.log("multi(1, 38) = ", multi(1, 38));
});
// console.log($('#app'));

/*
$.ajax({
  url: '/api/register',
  type: 'post',
  data: JSON.stringify({
    username: '50',
    password: '22',
    repassword: '23'
  }),
  contentType: 'application/json',
  success: function(data) {
    console.log(data);
  },
  error: function(err) {
    console.log(err);
  }
})  */

// let var1 = 2;
// let var2 = 4;



if (module.hot){
//  检测是否有模块热更新
  module.hot.accept('./assets/js/sum.js', function(i) {
    // console.log(i);// ['./src/assets/js/sum.js']
    //  针对被更新的模块，可以进一步操作
    // console.log('sum.js is changed');
  });
}


// console.log(Array.from('foo', x => x + 'm'));