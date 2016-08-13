import 'babel-polyfill';
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';
import { initialState } from '../stores/stores';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory, useRouterHistory, hashHistory} from 'react-router';
import '../../css/normalize.css';
/*dev*/
import DevTools from '../devtools/DevTools';
import { DEBUG } from '../constants/constants';
/*end*/

/*page*/
import Home from '../containers/Home/App';
/*end*/
let store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);

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
                        <Route path="/" component={Home} />
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


