import {a } from './a'

export let b = 0;
setInterval(()=> {
  console.log('b.js');
  a++
  b = a;
  console.log(b);
}, 3000)

