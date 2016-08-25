import _common from './api/_common';
import home from './api/home';
import cart from './api/cart';
import order from './api/order';
const API = Object.assign({},
	_common,
	home,
	cart,
	order
);

/*
	将API加上请求的地址,dev/dist;
*/
const baseUrl = 'http://localhost:3000';
for (let i in API) {
	API[i] = baseUrl + API[i];
}
export default API;