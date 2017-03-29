import { DEV_WITH_PHP } from './constants';
import _common from './api/_common';
import test from './api/test';
const API = Object.assign({},
	_common,
	test
);
let baseUrl;
if ("production" !== process.env.NODE_ENV) {
	/*开发环境*/
	if (!DEV_WITH_PHP) {
		//开发环境-前端自模拟
		baseUrl = 'http://localhost:3000';
	} else {
		//开发环境-后端数据
		baseUrl = 'http://localhost:3000';
	}
} else {
	/*生产环境*/
	baseUrl = location.origin + ':88';
}
for (let i in API) {
	API[i] = baseUrl + API[i];
}
export default API;