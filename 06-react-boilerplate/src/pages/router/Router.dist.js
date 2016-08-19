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
import '../../css/normalize.css';
/*end*/

/*page*/
import Home from '../containers/Home/App';
import Cart from '../containers/Cart/App';
/*end*/
let store = configureStore();
let appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const history = syncHistoryWithStore(appHistory, store);

export default class Root extends Component {

    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={history}>
                        <Route path="/" component={Home} />
                        <Route path="/cart" component={Cart} />
                    </Router>
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


