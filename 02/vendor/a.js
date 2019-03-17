export let a = 5;
export function ina() {
  a++;
}
setInterval(()=> {
  console.log('a.js ' + a);
}, 3000)

