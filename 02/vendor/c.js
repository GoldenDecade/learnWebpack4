var m = {
  a: 1
}
setInterval(()=> {
  console.log('c.js :' + m.a);
}, 3000)
module.exports = m;