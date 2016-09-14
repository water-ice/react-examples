/*
    做一个约定，设置缓存的时候类型为：Object
    否则要改写JSON.stringify和JSON.parse做判断
*/
/*Cookie*/
export function setCookie(key, val, days, path, domain) {
    let expire = new Date();
    expire.setTime(expire.getTime() + (days ? 3600000 * 24 * days : 30 * 24 * 60 * 60 * 1000)); // 默认1个月
    document.cookie = key + '=' + encodeURIComponent(JSON.stringify(val)) + ';expires=' + expire.toGMTString() + ';path=' + (path ? path : '/') + ';' + (domain ? ('domain=' + domain + ';') : '');
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
/*end*/
/*localStorage*/
const isAvailable = (function isAvailableIffe() {
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}());
// 设置缓存
export function setItem(key, val) {
    val = JSON.stringify(val);
    if (isAvailable) {
        localStorage.setItem(key, val);
    }
}
// 获取缓存
export function getItem(key) {
    if (isAvailable) {
        return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
    }
}

// 删除缓存
export function delItem(key) {
    if (isAvailable) {
        localStorage.removeItem(key);
    }
}
/**
 * 重构url
 * @param  {Object}
 * @return {String}
 */
export function constructUrl(route) { //创建新的url
    const {
        path,
        query
    } = route;
    let result = path.join('/');
    let queryArr = [];
    if (query && typeof query === 'object') {
        queryArr = Object.keys(query).sort()
            .filter(key => query[key] !== null)
            .map(key => `${key}=${query[key]}`);
    }

    if (queryArr.length > 0) {
        result += `?${queryArr.join('&')}`;
    }

    return result;
}
/**
 * 解析url
 * @param  {String} windowHash =location.hash
 * @return {Object}
 */
export function parseUrl(windowHash = location.hash) {//解析url
    let path = [];
    const query = {};
    const hashArr = windowHash.replace('#/', '').split('?');
    path = hashArr[0].split('/');

    if (hashArr.length > 1) {
        hashArr[1].split('&').forEach(str => {
            const arr = str.split('=');
            const key = arr[0];
            const value = arr[1];
            if (isNaN(value)) {
                query[key] = value;
            } else {
                query[key] = Number(value);
            }
        });
    }

    return {
        path,
        query
    };
}
/**
 * 查找url中key的值
 * @param  {String} key 
 * @return {String}
 */
export function getUrlParam(key) {
    let t = new RegExp("(^|&)" + key + "=([^&]*)(&|$)"),
    hash=window.location.hash,
    url=hash.substring(hash.indexOf('?')),
    //url=window.location.search,//将#去掉对于url的处理；
    n = decodeURI(url).substr(1).match(t);

    return n != null ? unescape(n[2]) : null;
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
    if (rule.type == 'validMobile') {
        value = value.replace(/\s/g, '');
    }
    if (obj[rule.type] && value && !obj[rule.type].regex.test(value)) {
        error = obj[rule.type].error;
        callback(error);
    } else {
        callback();
    }
}
/**
 * initItem 初始化数据
 * @param  {String} res 传入的数据
 * @param  {String} id  数组是已str区分 ，默认'id'
 * @param  {String} _count  
 * @param  {Object} initObj 判断是否有init
 * @param  {Array} initArr 判断是否有init
 * @return {String} 
 * 参考reducers中的使用     
 */
export function initItem(res,str,count,initObj,initArr) {
    let itemArr = [];
    let itemObj = {};
    let data;
    let id = str || 'id';
    if (res.data && res.data instanceof Array) { //传入的不是数组。res.data是数组
        data = res.data;
    } else if (res instanceof Array) { //传入的是数组
        data = res;
    } else {
        return console.error('res is x');
    }
    for (let i = 0; i < data.length; i++) {
        itemArr = [...itemArr, data[i][id]];
        itemObj ={
            ...itemObj,
            [data[i][id]]:initObj||data[i]
        };
        /*if(initArr&&initArr.length>0){//保存里面的键值
            for(let j=0;j<initArr.length;j++){
                itemObj ={
                    ...itemObj,
                    [data[i][id]]:{
                        ...itemObj[data[i][id]],
                        [initArr[j]]:data[i][initArr[j]]
                    }
                };
            }
        }*/
    }
   /*判断是否有_count*/
    if (count) {
        let {_count} = res;
        return {itemArr,itemObj,_count};
    } else {
        return {itemArr,itemObj};
   }    
}


