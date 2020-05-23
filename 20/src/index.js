import {sumFunc} from "./js/sum";
import './css/common.css'
import {counter} from './js/counter'
import {number} from './js/number'
number();
counter();
sumFunc();
/*
/!*let promiseRes1 = new Promise((resolve) => {
    resolve(123)
});
console.log(promiseRes1);*!/
// new WeakMap();
document.body.classList.add('bodybg');
console.log(12345);

if(module.hot) {
    module.hot.accept('./js/number.js', () => {
        number()
    })
}*/
// 同步形式的代码加载
import _ from 'lodash';
console.log(_.join([0, 1, 2, 3], '***'));
// 异步形式的代码加载
/*
function getComponent() {
    return import(/!* webpackChunkName: "lodash" *!/ 'lodash').then((_) => {
        let element = document.createElement('div');
        element.innerHTML = _.join([1,2,3], '**');
        return element;
    })
}
getComponent().then(element => {
    document.body.append(element);
})*/
