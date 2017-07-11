import ReactDOM from 'react-dom';
import { getItem,setItem,delItem,getCookie,getDevice,parseUrl,getUrlParam } from '@utils/utils';
typeof window !== "undefined" ? window._global = {} : this._global = {}; //唯一一个全部变量
/**
 * 环境
 */
_global.env = process.env.NODE_ENV;
/**
 * 缩放比例
 */
_global.scale = 0.5;
/**
 * 全局状态
 */
_global.config = {};
/**
 * 用于缓存的版本的管理
 */
_global.version = "1.0";
/**
 * 记忆滚动
 */
_global.scroll = {};

/**
 * APIS组件的清理
 * @return {}     
 */
_global.APIS = {};
_global.initApis = () => {
	for (let i in _global.APIS) {
		//console.log('remove apis:'+i);
		if (_global.APIS[i]) {
			ReactDOM.unmountComponentAtNode(_global.APIS[i]);
			document.body.removeChild(_global.APIS[i]);
			delete _global.APIS[i];
		}
	}
};
/**
 * 如果带#号键，用hashchange
 */
window.addEventListener('popstate', function(e) {
	/**
	 *清理缓存
	 */
	delItem('sku_goods');
	delItem('sku_selected');
	//页面初始化，卸载组件，同样不使得存在内存中；
	_global.initApis();
}, false);

/**
 * 设备信息状态
 */
_global.device = getDevice();
_global.innerWidth = _global.scale == 0.5 ? window.innerWidth : window.innerWidth * 2;
_global.innerHeight = _global.scale == 0.5 ? window.innerHeight : window.innerHeight * 2;
