import { redirectToLogin } from '../../router/auth';
export const homeConfig = [
	{ 
		path: '/train/',
		// getComponent: (nextState, cb) => {
		// 	require.ensure([], (require) => {
		// 		cb(null, require('./Modules/Home').default);
		// 	});
		// },
		onEnter:(nextState, replace) => { replace('/train/test');}
	}	
];