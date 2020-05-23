import {sumFunc} from './sum.js'
import '../css/number.css'

export function number() {
    var div = document.createElement('div');
    div.setAttribute('id', 'number');
    div.setAttribute('class', 'red');
    document.body.append(div);
    div.innerHTML = sumFunc();
}