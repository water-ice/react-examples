import { redirectUserToLogin,redirectUserToHome } from '../../router/auth';
export const testConfig = [
	{
		path: '/agent/test',// '/test-second'
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/Test').default);
			});
		}
	},
	{
		path: '/agent/test/second',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/TestSecond').default);
			});
		}
	},
	{
		path: '/agent/test/echart',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('./Modules/TestEchart').default);
			});
		}
	}
];

// 这种导航式的放在后台
// import Nav from './Modules/Nav';
// export const testConfig = [
// 	{
// 		path: '/test',
// 		component: Nav,
// 		childRoutes:[
// 			{
// 				path: 'main',
// 				getComponent: (nextState, cb) => {
// 					require.ensure([], (require) => {
// 						cb(null, require('./Modules/Test').default);
// 					});
// 				}
// 			},
// 			{
// 				path: 'second',
// 				getComponent: (nextState, cb) => {
// 					require.ensure([], (require) => {
// 						cb(null, require('./Modules/TestSecond').default);
// 					});
// 				}
// 			}
// 		]
// 	}
// ];