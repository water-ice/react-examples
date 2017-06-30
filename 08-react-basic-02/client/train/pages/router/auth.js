import { setCookie,delCookie,getCookie,hashUrl,getUrlParam } from '@shop/utils/utils';
import net from '@shop/utils/net';
import API_ROOT from '@shop/constants/apiRoot';
import { Toast } from 'antd-mobile';
/**
 * 未登录
 * 成功设置cookie，
 * error就去跳转到授权页面
 */
function promiseAuthCb(){
	return new Promise((resolve, reject) => {
		let param = {
			code: getUrlParam('code'),
			state: getUrlParam('state')
		};
		Toast.hide(); //hack
		Toast.loading(null, 0);
		net.ajax({
			url: API_ROOT['_GLOBAL_USER_GET_'],
			type: 'GET',
			param,
			success: (res) => {
				Toast.hide();
				// 设置Cookie 交给后端设置
				resolve(res);
			},
			error: (res) => {
				Toast.hide();
				reject(res);
			}
		});
	});
}
/**
 * 全局请求
 */
function promiseGlobalCb(){
	return new Promise((resolve, reject) => {
		console.log("等待1s，异步模拟全局配置数据中....，这里需要修改哦");
		setTimeout(()=>{ // 模拟假数据，请求方式参考promiseAuthCb
			resolve({test:1});
			console.log("1s 结束了");
		}, 1000);
	});
}
/**
 * 获取用户的登录状态信息
 * @param nextState 
 */
export function loggedIn(nextState) {
	let state = false; //未登录
	let shop = getCookie('shop');
	if (shop && shop.token) {
		state = true;
	}
	return state;
}
/**
 * 重定向到授权登录
 */
export function redirectToAuth(nextState) {
	let url = `http://${location.hostname}:88/auth?url=${nextState.location.pathname}${nextState.location.search}`;
	location.href = url;
}
/**
 * 定向路由-用户已登录-用户端首页
 */

export function redirectToLogin(nextState, replace, callback){
	if (!loggedIn(nextState)&& _global.device.weixin && process.env.NODE_ENV === "production") { //未登陆（未授权）
		// 去授权登录
		redirectToAuth(nextState);
		callback('未登录');
	}
	(async () => {
		for (let i=0;i<length;i++) {
			try {
				let res = await promiseAuthCb();
				await promiseGlobalCb();
				replace(`${res.data.back_url || '/'}`);
				callback();
			} catch (err) {
				redirectToAuth(nextState);
				callback('未登录');
			}
		}
	})();
	(async () => {
		try {
			_global.config = await promiseGlobalCb();
			callback();
		} catch (err) {
			callback('全局信息出错');
		}
	})();
}

/**
 * 重定向路由-用户已登录-用户端首页
 */
export function redirectToIndex(nextState, replace,callback) {
	// 授权回来的地址 /auth/index
	if (loggedIn(nextState)) { 
		// 指定链接，否则之前授权后再授权的就会去‘/’
		replace('/');
		callback();
	} else {
		(async () => {
			try {
				let res = await promiseAuthCb();
				_global.config = await promiseGlobalCb();
				replace(`${res.data.back_url || '/'}`);
				callback();
			} catch (err) {
				redirectToAuth(nextState);
				callback('未登录');
			}
		})();
	}
}