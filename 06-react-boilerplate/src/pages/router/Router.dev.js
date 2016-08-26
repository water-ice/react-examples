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
/*dev*/
import DevTools from '../devtools/DevTools';
import { DEBUG } from '../constants/constants';
/*end*/

/*page*/
import Home from '../containers/Home/App';
import Cart from '../containers/Cart/App';
import Order from '../containers/Order/App';
/*end*/
typeof window !== "undefined" ? window._global = {} : this._global = {};//唯一一个全部变量
let appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
let store = configureStore();
//_global.store = store; //全局的数据；//特殊处理，谨慎操作，我们要以单向数据流形式传递
_global.history = syncHistoryWithStore(appHistory, store);//全局的历史
let DevToolsWrapper = (DEBUG) ? <DevTools /> : null;

export default class Root extends Component {

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
                    </Router>
                    {DevToolsWrapper}
                    {/* <Router history={history} routes={routeConfig} /> */}
                </div>
            </Provider>
        );
    }
}
render(
    <Root />,
    document.getElementById('pages')
);


