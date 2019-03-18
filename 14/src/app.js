import sum from "./assets/vendor/sum";
console.log("sum(1, 12) = ", sum(1, 12));
var minus = require("./assets/vendor/minus");
console.log("minus(1, 2) = ", minus(1, 2));
require(["./assets/vendor/multi"], function(multi) {
  console.log("multi(1, 388) = ", multi(1, 388));
});

//跨域请求
console.log($);
$.ajax({
  // url: 'http://localhost:8081/api/user132',// 解决了跨域
  url: '/api/user132',
  type: 'get',
  success: function(data) {
    console.log(data);
  },
  error: function(err) {
    console.log(err);
  }
})

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
})

if(module.hot){
//  检测是否有模块热更新
  module.hot.accept('./assets/vendor/sum.js', function(i) {
    console.log(i);// ['./src/assets/vendor/sum.js']
    //  针对被更新的模块，可以进一步操作
    console.log('sum.js is changed');
  })
}
