import ReactDOM from 'react-dom';
import { getItem, setItem ,delItem } from 'utils';
typeof window !== "undefined" ? window._global = {} : this._global = {};//唯一一个全部变量
/**
 * APIS组件的清理
 * @return {}     
 */
_global.APIS = {};
_global.initApis = () => {
    for(let i in _global.APIS){
    	console.log('remove apis:'+i);
    	if(_global.APIS[i]){
        	ReactDOM.unmountComponentAtNode(_global.APIS[i]);
        	document.body.removeChild(_global.APIS[i]);
        	delete _global.APIS[i];
    	}
    }
};
window.addEventListener('hashchange', function(e) {
	//清理缓存1
	delItem('sku_goods');
	delItem('sku_selected');
	//页面初始化，卸载组件，同样不使得存在内存中；
	_global.initApis();
}, false);

/**
 * 清理缓存
 * @return {}     
 */
//delItem('area');
/**
 * device 设备信息
 * @return {}     
 */
_global.device = (function (){
    const device = {};
    const ua = navigator.userAgent;

    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;

    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
    }
    if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
    }
    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
    // keng..
    device.weixin = /MicroMessenger/i.test(ua);
    return device;
})();
