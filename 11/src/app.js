/*
 * 第三方JS库
 * 1. CDN: '<script></script>'标签引入即可
 * 2. npm包管理: ProvidePlugin, 键是变量名, 值是第三方库名称
 * 3. 本地Js文件: alias别名, 将本地库解析到对应的文件中. 例如示例中的 'jQuery'被解析到'src/vendor/jquery.min.js'
*/
// console.log($('#app'));
// console.log(jQuery);
// $('#app').addClass('new');


import jQuery from 'jQuery'//此时 alias 配置 jQuery$




jQuery('div').addClass('old')
console.log(jQuery);
console.log(jQuery('#box'));