import { createStore, compose, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, hashHistory, useRouterHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from '../utils/devtools/DevTools';
// import logger from '../utils/middleware/logger';//也可以直接redux-logger
import api from '../utils/middleware/api';
import { DEBUG } from '../constants/constants';


//const reduxRouterMiddleware = routerMiddleware(browserHistory);
const reduxRouterMiddleware = routerMiddleware(hashHistory);

function getDebugSessionKey() {
    // You can write custom logic here!
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
}

//applyMiddleware来自redux可以包装 store 的 dispatch
//thunk作用是使被 dispatch 的 function 会接收 dispatch 作为参数，并且可以异步调用它
let finalCreateStore = null;
if (DEBUG) {
    finalCreateStore = compose(
        applyMiddleware(thunk, api, reduxRouterMiddleware),
        DevTools.instrument(),
        persistState(getDebugSessionKey())
    )(createStore);
}
else {
    finalCreateStore = compose(
        applyMiddleware(thunk, api, reduxRouterMiddleware)
    )(createStore);
}

export default function configureStore(initialState) {

    const store = finalCreateStore(rootReducer, initialState);

    // Required for replaying actions from devtools to work
    // reduxRouterMiddleware.listenForReplays(store);
    //热替换选项
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/rootReducer', () => {
             const nextRootReducer = require('../reducers/rootReducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}