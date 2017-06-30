import { redirectToLogin, redirectToIndex } from './auth';
import { testConfig } from '../containers/Test/App';

export const routeConfig = [
	// test
	...testConfig,
	{ 
		path: '/shop/',
		onEnter:(nextState, replace) => { replace('/shop/test');}
	},
	// 授权回来后给后端发起请求
	{ 
		path: '/auth/index',
		onEnter: redirectToIndex
	},
	// error
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