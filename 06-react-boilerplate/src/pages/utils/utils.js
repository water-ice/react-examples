let type = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error"];

for (let i = 0; i < type.length; i++) {
    (function(k) {
        window['is' + type[k]] = function(obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type[k] + ']';
        };
    })(i);
}

export function _stringify(val) {
    let returnVal = isObject(val) ? JSON.stringify(val) : val;
    return returnVal;
}

export function _parse(val) {
    let returnVal = JSON.parse(val);
    returnVal = isObject(returnVal) ? returnVal : val;
    return returnVal;
}

// 正则表达式网站  http://www.regexr.com/
export function setCookie(key, val, days, path, domain) {
    let expire = new Date();
    expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 30 * 24 * 60 * 60 * 1000)); // 默认1个月
    document.cookie = key + '=' + encodeURIComponent(_stringify(val)) + ';expires=' + expire.toGMTString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
}

export function delCookie(key, path, domain) {
    let expires = new Date(0);
    document.cookie = key + '=;expires=' + expires.toUTCString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
}

export function getCookie(key) {
    let r = new RegExp("(?:^|;+|\\s+)" + key + "=([^;]*)");
    let m = window.document.cookie.match(r);
    return (!m ? "" : m[1]);
}

// 设置缓存
export function setItem(key, val) {
    val = _stringify(val);
    if (typeof(Storage) !== 'undefined') {
        localStorage.setItem(key, val);
    } else {
        setCookie(key, val);
    }
}
// 获取缓存
export function getItem(key) {
    if (typeof(Storage) !== 'undefined') {
        return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
    } else {
        return getCookie(key);
    }
}

// 删除缓存
export function delItem(key) {
    if (typeof(Storage) !== 'undefined') {
        delete localStorage[key];
    } else {
        deleteCookie(key);
    }
}

export function getHash(key) {
    let m = window.location.hash.match(new RegExp('(#|&)' + key + '=([^&#]*)(#|&|$)'));
    return !m ? "" : decodeURIComponent(m[2]);
}

export function getQuery(key) {
    let m = window.location.search.match(new RegExp('(\\?|&)' + key + '=([^&]*)(#|&|$)'));
    return !m ? "" : decodeURIComponent(m[2]);
}

export function getUrlParam(key) {
    let m = window.location.search.match(new RegExp('(\\?|#|&)' + key + '=([^&]*)(#|&|$)'));

    if (!m) {
        m = window.location.hash.match(new RegExp('(#|&)' + key + '=([^&#]*)(#|&|$)'));
    }

    return !m ? "" : decodeURIComponent(m[2]);
}

/**
 * html实体编码
 * @param  {String} str html文本
 * @return {String}     经html实体编码后的html文本
 */
export function encodeHTML(str) {
    //&gt; 实体标签
    //&#34; Unicode 编码（可以用charCodeAt方法查看某字符对应的unicode编码）
    let s = "";
    if (!str || str.length == 0) return "";
    s = str.replace(/&/g, "&#38;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    //空格和换行其实可以不转
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\n/g, "<br>");
    return s;
}

/**
 * html实体编码转义
 * @param  {String} str html文本
 * @return {String}     经html实体编码转义后的html文本
 */
export function decodeHTML(str) {
    let s = "";
    if (str.length == 0) return "";
    s = str.replace(/&#38;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/<br>/g, "\n");
    return s;
}

/**
 * 获取日期展示
 * @param  {Number} timestamp 日期时间戳
 * @param  {Number} strType 日期显示格式类型，1:[4月21号 星期一 8:00], 2:[2015-7-12 星期一], 3:[07-10 07:30]，所有非当前年份日期显示年份
 * @param  {Number} serverTime 服务器时间
 * @param  {Boolean} noFixTimezone 是否不需要时区校正
 * @return {String}   格式化日期
 */
let formatDate = (function() {
    // 修正为北京时间
    // 8 * 60 GMT+0800 单位为分
    let timezoneOffsetGMT8 = 8 * 60;
    // 系统时区 分 (包含夏令时)
    let timezoneOffset = (new Date()).getTimezoneOffset();
    // 转换成秒
    let timezoneDiff = (timezoneOffsetGMT8 + timezoneOffset) * 60;

    function fixTimezone(timestamp, isFormatToDate) {
        // 单位为秒
        // 北京时间直接返回
        if (timezoneDiff === 0) return parseInt(timestamp);
        return parseInt(parseInt(timestamp) + timezoneDiff * (isFormatToDate ? 1 : -1));
    }

    function fillZero(number) {
        return ("0" + number).slice(-2, 3);
    }

    function isYesterday(now, obj) {
        let yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();
        return obj.toDateString() === yesterdayString;
    }

    // 1：默认显示日期+时间
    // 2: 显示日期
    // 3: 显示时间
    return (function format(timestamp, strType = 1, serverTime = 0, noFixTimezone = false) {
        if (!timestamp) {
            return '';
        }

        let weekdaymap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

        let now = serverTime ?
            (new Date(noFixTimezone ? serverTime :
                fixTimezone(serverTime, true) * 1000)) :
            (new Date()),
            time = new Date(noFixTimezone ? timestamp :
                fixTimezone(timestamp, true) * 1000);

        let formatTime = fillZero(time.getHours()) + ":" + fillZero(time.getMinutes()),
            formatDate = "",
            year = time.getFullYear(),
            month = time.getMonth() + 1,
            date = time.getDate();

        let isCurYear = true;

        strType = strType || 1;

        //判断是否今天
        if (now.getFullYear() === year &&
            now.getMonth() === time.getMonth() &&
            now.getDate() === date) {
            formatDate = "今天";
        } else if (isYesterday(now, time)) {
            formatDate = "昨天";
        } else {
            // 不是当前年份，都要带上年份显示
            if (now.getFullYear() !== year) {
                formatDate = year;
                isCurYear = false;
            }

            switch (strType) {
                case 1:
                    formatDate = (isCurYear ? formatDate : formatDate + '年') + month + '月' + date + '号';
                    break;
                case 2:
                    formatDate = year + '-' + month + '-' + date;
                    break;
                case 3:
                    formatDate = (isCurYear ? formatDate : formatDate + '-') + fillZero(month) + '-' + fillZero(date);
                    break;
            }
        }

        switch (strType) {
            // 4月21号 星期一 08:00
            case 1:
                return formatDate + ' ' + weekdaymap[time.getDay()] + ' ' + formatTime;
                // 2015-7-12 星期一
            case 2:
                return formatDate + ' ' + weekdaymap[time.getDay()];
                // 07-10 07:30
            case 3:
                return formatDate + ' ' + formatTime;
        }
    });
})();
export {
    formatDate
};

/**
 * [extend 对象继承]
 * @param  {[Object]} src [源对象]
 * @param  {[Object]} des [继承对象]
 * @param  {[Integer]} d   [拷贝深度]
 */
export function extend(src, des, d) {
    let depth = (d) ? d : 0;
    for (let key in src) {
        let isObject = isObject(src[key]);
        let isArray = isArray(src[key]);
        if (isObject || isArray) {
            if (depth) {
                if (isObject) {
                    des[key] = {};
                    extend(src[key], des[key], depth - 1);
                } else if (isArray) {
                    des[key] = [];
                    extend(src[key], des[key], depth - 1);
                }
            }
        } else {
            des[key] = src[key];
        }
    }
}
/*验证数据*/
let obj = {
    validNum: {
        regex: /^\d+(\.\d+)?$/,
        error: "请输入正确数字"
    },
    validEmail: {
        regex: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
        error: "邮箱格式不正确"
    },
    validDate: {
        regex: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
        error: "日期格式不正确"
    },
    validTime: {
        regex: /\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/,
        error: "时间格式不正确"
    },
    validId: {
        regex: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
        error: "身份证格式不正确"
    },
    validPrice: {
        regex: /^([+-]?[1-9][\d]{0,3}|0)([.]?[\d]{1,2})?$/,
        error: "请输入正确金额"
    },
    validMobile:{
        regex:  /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|6|7|8]|18[0-9])\d{8}$/,
        //regex: /^\d+(\.\d+)?$/,
        error: "请填写正确的手机号码"
    },
    validPhone:{
        regex: /^(\(\d{3,4}\)|\d{3,4}(-|\s)?)?\d{7,8}(-\d{1,4})?$/,
        error: "请填写正确的手机号码"
    },
    validPostalCode:{
        regex: /^\d{4}$/,
        error: "请输入4位短信验证码"
    },
    validZipCode:{
        regex: /^\d{6}$/,
        error: "请输入6位邮政编码"
    }
};
/**
 * dataValidity 验证数据
 * @param  {String} rule 
 * @param  {String} value 
 * @param  {String} callback  
 * @return {String}     
 */
export function dataValidity(rule, value, callback) {
    let error;
    if (rule.required && !value) {
        error = rule.name + "必填";
        callback(error);
        return false;
    }
    if(rule.type == 'validMobile'){
        value = value.replace(/\s/g,'');
    }
    if (obj[rule.type]&&value&&!obj[rule.type].regex.test(value)) {
        error = obj[rule.type].error;
        callback(error);
    }else{
        callback();
    }
}
/**
 * initItem 初始化数据
 * @param  {String} res 传入的数据
 * @param  {String} id  数组是已str区分 ，默认'id'
 * @param  {String} _count  
 * @return {String}     
 */
export function initItem(res,str,count) {
   let itemArr = [];
   let itemObj = {};
   let data;
   let id = str || 'id';
   if(res.data&&res.data instanceof Array){//传入的不是数组。res.data是数组
        data = res.data;
   }else if(res instanceof Array){//传入的是数组
        data = res;
   }else{
        return new Error('res is x');
   }
   for (let i = 0; i < data.length; i++) {
       itemArr = [...itemArr,data[i][id]];
       itemObj[data[i][id]] = data[i];
   }
   /*判断是否有_count*/
   if(count){
        let {_count} = res;
        return {itemArr,itemObj,_count};
   }else{
        return {itemArr,itemObj};
   }
}

