import { redirectUserToLogin,redirectUserToHome } from '../../router/auth';
import Nav from './Modules/Nav';
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
			}
		]
	}
];