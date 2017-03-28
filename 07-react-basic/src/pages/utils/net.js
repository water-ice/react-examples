/* @example
	net.ajax({
		url: APIROOT['_GLOBAL_USER_MAIN_'],
		param: data,
		type: 'GET',
		success: function(data){
			// alert(data);
		},
		error: function(xhr){
		}
	});

**/
import { DEV_WITH_PHP } from '../constants/constants';
import { delItem } from 'utils';
import {Toast} from 'antd-mobile';
/**
 * ajax description
 * @param options ajax参数信息
 */
function ajax(options) {
	//console.log(options);
	let xhr = new XMLHttpRequest();
	let url = options.url;
	let paramObj = options.param;
	let success_cb = options.success;
	let error_cb = options.error;
	let uploadProgress = options.uploadProgress;
	let method = options.type || 'GET';
	method = method.toUpperCase(); //默认转化为大写
	if (!url) {
		console.error('请求地址不存在');
	}

	let cgiSt = Date.now();

	let onDataReturn = data => {
		switch (data.status) {
			case 1:
				success_cb && success_cb(data);
			default:
				error_cb && error_cb(data);
		}
	};

	/**
	 * 如果本地已经从别的地方获取到数据，就不用请求了
	 */
	if (options.localData) {
		onDataReturn(options.localData);
		return;
	}

	try {
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					let data = JSON.parse(xhr.responseText);
					onDataReturn(data);
				} else {
					error_cb && error_cb({
						retcode: xhr.status,
						msg: '数据异常->(The xhrStatus is not 200)'
					});
				}
			}
		};

		let paramArray = [],
			paramString = '';
		for (let key in paramObj) {
			/**
			 * 过滤掉值为null,undefined,''情况
			 */
			if (paramObj[key] || paramObj[key] === false || paramObj[key] === 0) {
				paramArray.push(key + '=' + encodeURIComponent(paramObj[key]));
			}
		}

		if (method === 'FORM') {
			let formData = new FormData();　　　　
			formData.append('file', paramObj['file']);　　　　
			formData.append('bkn', bkn);
			xhr.upload.onprogress = function(e) {
				if (e.lengthComputable) {
					uploadProgress(e.loaded, e.total);
				}
			};
			xhr.open('POST', url);
			xhr.withCredentials = true;　　　　
			xhr.send(formData);
		} else if (method === 'JSONP') {
			method = 'GET';

			if (!paramObj['callback']) {
				error_cb && error_cb({
					status: 0
				});
			}

			window[paramObj['callback']] = function(data) {
				onDataReturn(data);
			};
			if (paramArray.length > 0) {
				url += (url.indexOf('?') > -1 ? '&' : '?') + paramArray.join('&');
			}
			let script = document.createElement("script");
			let head = document.getElementsByTagName("head")[0];
			script.src = url;
			head.appendChild(script);
		} else {
			if (method === 'GET') {
				if (paramArray.length > 0) {
					url += (url.indexOf('?') > -1 ? '&' : '?') + paramArray.join('&');
				}
			}
			xhr.open(method, url, true);
			xhr.withCredentials = true;
			xhr.setRequestHeader(
				'Content-type', 'application/x-www-form-urlencoded'
			);
			xhr.send(method === 'POST' ? paramArray.join('&') : '');
		}

	} catch (e) {
		console.error(e);
	}
}

let net = {
	ajax
};

export default net;