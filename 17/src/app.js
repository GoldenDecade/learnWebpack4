import 'babel-polyfill';
import './assets/css/common.css';
import './assets/css/index.css';

import './assets/fonts/iconfont.css';

let files = require.context('./assets/js', false, /\.js$/);let v = 123;
/* eslint-disable */
console.log(files.keys());

/* eslint-enable */
