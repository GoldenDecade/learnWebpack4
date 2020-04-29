import 'babel-polyfill';
import './assets/css/common.css';
import './assets/css/index.css';

import './assets/fonts/iconfont.css';

let files = require.context('./assets/js', false, /\.js$/) ;
/* eslint-disable */
console.log(files.keys());

/* eslint-enable */
function a() {
    return a;
}
