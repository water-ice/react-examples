import { DEV_WITH_PHP } from '@shop/constants/constants';
import { ajaxFn } from '@common/js/utils/net';
const othersCallback = (data, successCb, errorCb) => {
	switch(data.status){
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