import { setCookie,delCookie,getCookie,hashUrl,getUrlParam } from 'utils';

export const routeConfig = [
	//test
	{ 
		path: '/test(/:pages)',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('../containers/Test/App').default);
			});
		}
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