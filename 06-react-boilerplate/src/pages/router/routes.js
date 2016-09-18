/*page*/
export const routeConfig = [
    { 
        path: '/',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('../containers/Home/App').default);
            });
        },
        onEnter:()=>{
            //console.log('home');
        }
    },
    { 
        path: '/cart',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('../containers/Cart/App').default);
            });
        }
    },
    { 
        path: '/category',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('../containers/Category/App').default);
            });
        }
    },
    { 
        path: '/order',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('../containers/Order/App').default);
            });
        }
    },
    { 
        path: '/user(/:pages)',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('../containers/User/App').default);
            });
        }
    },
    { 
        path: '*',
        getComponent: (nextState, cb) => {
            require.ensure([], (require) => {
                cb(null, require('../containers/ErrorPage/App').default);
            });
        }
    }
];