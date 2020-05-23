import {sumFunc} from "./sum";

export function counter() {
    var div = document.createElement('div');
    div.setAttribute('id', 'counter');
    document.body.append(div);
    div.innerHTML = sumFunc();;
    div.onclick = function () {
        div.innerHTML = ++initVal;
    }
}
