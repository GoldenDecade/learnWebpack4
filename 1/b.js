import { info } from './a.js'

// let info = require('./a')
console.log(info);
setInterval(()=> {
  info.a = Date.now();
}, 1000)