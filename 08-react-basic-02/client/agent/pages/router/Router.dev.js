import 'babel-polyfill';
import 'react-fastclick';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from '../stores/configureStore';
import { initialState } from '../stores/stores';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory, useRouterHistory, hashHistory } from 'react-router';
/**
 * 暴露唯一全局的量
 */
import './_global.js';

/**
 * Dev
 */
import DevTools from '@common/js/devtools/DevTools';
import { DEBUG } from '../constants/constants';

/**
 * pages
 */
import {routeConfig} from './routes.js';

const store = configureStore();
_global.history = syncHistoryWithStore(browserHistory, store);
class Root extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<Provider store={store}>
				<div>
					<Router history={_global.history} routes={routeConfig} />
					{(DEBUG) ? <DevTools /> : null}
				</div>
			</Provider>
		);
	}
}
render(<Root />, document.getElementById('pages'));


