import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';
//import { initialStore } from '../stores/stores'; 存储数据

import Test from '../containers/Test';
import DevTools from '../utils/devtools/DevTools';
import { DEBUG } from '../constants/constants';

import { syncHistoryWithStore } from 'react-router-redux';

import { Router, IndexRoute, Route, browserHistory, useRouterHistory, hashHistory } from 'react-router';

let store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
//本来router的state没在redux中管理，你用了这个，那么，router的state也会在redux中；很好使


let DevToolsWrapper = (DEBUG) ? <DevTools /> : null;

export default class Root extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={history}>
                        <Route path="/" component={Test}>
                            <IndexRoute component={Test}/>
                            <Route path="/aaa" component={Test}/>
                            <Route path="/bbb" component={Test}/>
                        </Route>
                    </Router>
                    {DevToolsWrapper}
                </div>
            </Provider>
        );
    }
}
render(
    <Root />,
    document.getElementById('pages')
);


