import '@common/js/utils/global';
import { getItem,setItem,delItem,getCookie,getDevice,parseUrl,getUrlParam } from '@train/utils/utils';

_global.type = "train";
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

