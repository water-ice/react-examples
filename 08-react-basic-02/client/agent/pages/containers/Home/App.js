import { redirectToLogin } from '../../router/auth';
export const homeConfig = [
	{ 
		path: '/',
		// getComponent: (nextState, cb) => {
		// 	require.ensure([], (require) => {
		// 		cb(null, require('./Modules/Home').default);
		// 	});
		// },
		onEnter:(nextState, replace) => { replace('/test');}
	}	
];