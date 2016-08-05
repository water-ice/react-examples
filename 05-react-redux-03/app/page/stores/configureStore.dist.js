import { createStore, compose, applyMiddleware } from 'redux';
import { Router, Route, browserHistory, hashHistory, useRouterHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import api from '../utils/middleware/api';


const reduxRouterMiddleware = routerMiddleware(hashHistory);


let finalCreateStore = compose(
        applyMiddleware(thunk, api, reduxRouterMiddleware)
    )(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    return store;
}