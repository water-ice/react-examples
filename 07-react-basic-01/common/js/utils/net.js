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
// import { delItem, getCookie } from './utils';
/**
 * ajax description
 * @param options ajax参数信息
 */
import { getCookie } from './utils';
export const ajaxFn = (DEV_WITH_PHP) => {
	return (options) => {
		//console.log(options);
		let xhr = new XMLHttpRequest();
		let url = options.url;
		let paramObj = options.param;
		let method = options.type || 'GET';
		// restful 风格转化 /:id
		if (paramObj && paramObj.id) {
			url += `/${paramObj.id}`;
			switch(method){
				case 'POST':
				case 'DELETE':
				case 'GET':
					paramObj = {
						...paramObj,
						id: null
					};
				default:
					break;
			}

		}
		// resful 风格带上token
		if (getCookie('user')) {
			url += (url.indexOf('?') > -1 ? '&' : '?') + 'token=' + getCookie('user').token;
		}
		// resful 风格带上token
		let success_cb = options.success;
		let error_cb = options.error;
		let uploadProgress = options.uploadProgress;
		method = method.toUpperCase(); //默认转化为大写
		if (!url) {
			console.error('请求地址不存在');
		}

		let cgiSt = Date.now();

		let onDataReturn = data => {
			if(data&&data instanceof Array){
				success_cb && success_cb(data);
				return;
			}
			switch (data.status) {
				case -1:
				case 0:
					error_cb && error_cb(data);
				default:
					success_cb && success_cb(data);
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
					if (xhr.status >= 200 && xhr.status < 300) {
						// 可以加上try-catch
						try {
							let data = JSON.parse(xhr.responseText);
							onDataReturn(data);
						} catch (e) {
							let msg = "请求数据失败,返回的不是JSON";
							console.log(msg,e);
							error_cb && error_cb({
								retcode: xhr.status,
								msg: msg
							});
						}
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
				let req = '';
				switch(method){
					case 'PUT':
					case 'POST':
						req = JSON.stringify(paramObj);
						break;
					case 'DELETE':
					case 'GET':
						if (paramArray.length > 0) {
							url += (url.indexOf('?') > -1 ? '&' : '?') + paramArray.join('&');
						}
						break;
					default:
						break;
				}
				xhr.open(method, url, true);
				xhr.withCredentials = true; // 允许发送cookie
				// 跨域资源请求会发生两次 一次是204 可以参考cors // 无视就好
				xhr.setRequestHeader(
					'Content-Type', 'application/json'
				);
                xhr.setRequestHeader(
					'X-Requested-With', 'XMLHttpRequest'
				);
				xhr.send(req);
			}

		} catch (e) {
			console.error(e);
		}
	};
};
