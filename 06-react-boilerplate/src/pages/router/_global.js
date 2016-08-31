import ReactDOM from 'react-dom';
import { getItem, setItem ,delItem } from 'utils';
typeof window !== "undefined" ? window._global = {} : this._global = {};//唯一一个全部变量
_global.APIS = {};//APIS组件的清理
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

//清理缓存2
//delItem('area');