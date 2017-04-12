import { setCookie,delCookie,getCookie,hashUrl,getUrlParam } from '@utils/utils';

function UserLoggedIn(nextState) {
	let state = false; //未登录
	let user = getCookie('user');
	if (user && user.token) {
		state = true;
	}
	return state;
}
function redirectUserToLogin(nextState, replace, callback){
	if (!UserLoggedIn(nextState)){// 未登录
		replace('/login');
	}
	callback();
}
function redirectUserToHome(nextState, replace, callback){

	if (UserLoggedIn(nextState)){// 已登录
		replace('/');
	}
	callback();
}
export const routeConfig = [
	//test
	{ 
		path: '/test(/:pages)',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('../containers/Test/App').default);
			});
		},
	},
	{ 
		path: '/',
		onEnter:(nextState, replace) => { replace('/test');}
	},
	//error
	{ 
		path: '*',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				console.error('请输入正确URL!');
				cb(null, require('../containers/ErrorPage/App').default);
			});
		}
	}
];