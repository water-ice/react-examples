import 'babel-polyfill';
import 'react-fastclick';
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';
import { initialState } from '../stores/stores';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory, useRouterHistory, hashHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';//去掉?_k的办法
import '../../css/_global.css';
import './_global.js';//暴露唯一全局的量
/*dev*/
import DevTools from '../devtools/DevTools';
import { DEBUG } from '../constants/constants';
/*end*/

/*page*/
import Home from '../containers/Home/App';
import Cart from '../containers/Cart/App';
import Order from '../containers/Order/App';
import User from '../containers/User/App';
import ErrorPage from '../containers/ErrorPage/App';
/*end*/
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const store = configureStore();
/*  
    为了更好的操控全局;
    其他方法：
    实现页面跳转：
    import {hashHistory} from 'react-router';hashHistory.push('/')；
   
*/
_global.history = syncHistoryWithStore(appHistory, store);//全局的历史

const DevToolsWrapper = (DEBUG) ? <DevTools /> : null;

class Root extends Component {

    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={_global.history}>
                        <Route path="/" component={Home} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/order" component={Order} />
                        <Route path="/user" component={User} />
                        <Route path="*" component={ErrorPage} />
                    </Router>
                    {DevToolsWrapper}
                    {/* <Router history={history} routes={routeConfig} /> */}
                </div>
            </Provider>
        );
    }
}
render(<Root />,document.getElementById('pages'));


