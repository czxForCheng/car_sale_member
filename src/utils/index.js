// import pinyin from 'js-pinyin'

Date.prototype.format = function(fmt) {
    let o = {
        'M+': this.getMonth() + 1,                 // 月份
        'd+': this.getDate(),                    // 日
        'h+': this.getHours(),                   // 小时
        'm+': this.getMinutes(),                 // 分
        's+': this.getSeconds(),                 // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds()             // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
}

// 传入日期，获取上一个物料填报月（21号到下个月20号，算做本月）
export function getRequireDate(date) {
    let yMonth = '';
    let curMonth = date.getMonth();
    if (date.getDate() <= 20) {
        if (date.getMonth === 0) {
            yMonth = (date.getFullYear() - 1) + '-12';
        } else {
            yMonth = date.getFullYear() + '-' + (curMonth < 10 ? '0' + curMonth.toString() : curMonth.toString());
        }
    } else {
        yMonth = date.format('yyyy-MM');
    }
    return yMonth;
}

export function getDate(strDate) {
    let date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
        (a) => parseInt(a, 10) - 1).match(/\d+/g) + ')');
    return date;
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000;
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}

export function formatTime(time, option) {
    time = +time * 1000;
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}


/**
 * @return {string}
 */
// export function ParsePy(value) {
//   let pinyin = require('js-pinyin');
//   pinyin.setOptions({checkPolyphone: false, charCase: 0});
//   let results = pinyin.getFullChars(value);
//   let reg = /[A-Z]/g;
//   let n = results.match(reg);
//
//   return n.join('');
// }

// 正则匹配？后面元素
export function getCaption(url, parameter) {
    let index = url.lastIndexOf(parameter);
    url = url.substring(index + 1, url.length);
    return url;
}
export function checkPhone(phone) {
    var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (phone===''){
        return false
    }else{
        if (reg_tel.test(phone)){
            return true
        }else{
            return false
        }
    }

}

export function removeHtmlTags(input) {
    const regex = /<[^>]*>/g;
    return input.replace(regex, '');
}