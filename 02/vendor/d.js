var d = 5;
var d1 = {
  a: 1
}
function incrementD () {
  d++;
  d1.a++;
}
module.exports = {
  d: d,
  d1,
  incrementD: incrementD
}

setInterval(()=> {
  console.log('d.js :' + d);
  console.log('d.js :' + JSON.stringify(d1));
}, 3000)