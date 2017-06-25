import { redirectUserToLogin,redirectUserToHome } from '../../router/auth';
import Nav from './Modules/Nav/Nav';
export const testConfig = [
	{
		path: '/test',
		component: Nav,
		childRoutes:[
			{
				path: 'main',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/Test').default);
					});
				}
			},
			{
				path: 'second',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/TestSecond').default);
					});
				}
			},
			{
				path: 'echart',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/TestEchart').default);
					});
				}
			},
			{
				path: 'dnd',
				childRoutes:[
					{
						path: 'begin',
						getComponent: (nextState, cb) => {
							require.ensure([], (require) => {
								cb(null, require('./Modules/TestDndBegin').default);
							});
						}
					},
					{
						path: 'combo',
						getComponent: (nextState, cb) => {
							require.ensure([], (require) => {
								cb(null, require('./Modules/TestDndCombo').default);
							});
						}
					},
				]
			},
			{
				path: '*',
				getComponent: (nextState, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./Modules/Test').default);
					});
				}
			}
		]
	}
];