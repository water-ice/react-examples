
import { DEV_WITH_PHP } from '@agent/constants/constants';
import { ajaxFn } from '@common/js/utils/net';
const othersCallback = (status) => {
	switch(_global.type){
		case -1:
			console.log("回调");
		default:
			return; 
	}
};
const ajax = ajaxFn(DEV_WITH_PHP, othersCallback);
let net = {
	ajax
};
export default net;