export function sumFunc() {
    return 123;
}

const projectKey = 'datacollection'
export const getName = function (name) {
    return [projectKey, name].join('/')
}
export const getPath = function (path) {
    return path.replace(/^\//, '\/' + projectKey + '/')
}

export function getUrl(name) {
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " "));
    return "";
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (var k in o) {
        if (new RegExp("("+k+")").test(fmt)) {
            var str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}



function getType(obj) {
    let res = '';
    switch (Object.prototype.toString.call(obj)) {
        case '[object Object]':
            res = 'Object';
            break;
        case '[object Array]':
            res = 'Array';
            break;
        default: res = 'normal';
    }
    return res;
}
export function deepCopy(obj) {
    if(getType(obj) === 'normal') {
        return obj;
    }
    let newObj = getType(obj) === 'Object' ? {} : [];
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            newObj[key] = deepCopy(obj[key]);
        }
    }
    return newObj;
}

export function getStyle(element, attr, NumberMode = 'int')  {
    let res;
//  scrollTop 获取方式不同，因为它不属于style，属于DOM元素
    if(attr === 'scrollTop') {
        res = element.scrollTop
    }else if(element.currentStyle) { // IE获取元素的style
        res = element.currentStyle[attr]
    }else { // document.defaultView更加严谨，指的是当前document对象所关联的window对象，如果没有则返回null
        //一般使用window.getComputedStyle(元素, 伪类)[属性名]
        res = document.defaultView.getComputedStyle(element, null)[attr]
    }
//  在获取opacity的时候需要获取小数
    return NumberMode == 'float' ? parseFloat(res) : parseInt(res)
}