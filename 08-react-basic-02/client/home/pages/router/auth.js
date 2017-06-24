import { setCookie,delCookie,getCookie,hashUrl,getUrlParam } from '@home/utils/utils';
/**
 * 获取用户的登录状态信息
 * @param nextState 
 */
export function UserLoggedIn(nextState) {
	let state = false; //未登录
	let user = getCookie('user');
	if (user && user.token) {
		state = true;
	}
	return state;
}
export function redirectUserToLogin(nextState, replace, callback){
	if (!UserLoggedIn(nextState)){// 未登录
		replace('/login');
	}
	callback();
}
export function redirectUserToHome(nextState, replace, callback){
	if (UserLoggedIn(nextState)){// 已登录
		replace('/');
	}
	callback();
}