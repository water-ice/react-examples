'use strict';
/*eslint no-console:0*/
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory ,browserHistory, IndexRoute , Redirect ,IndexRedirect} from 'react-router';
import Counter from './component/counter';
const router = (
 	<Router history={hashHistory}>
	    <Route path="/" component={Counter} />
  	</Router>
);
render(
  router,
  document.getElementById('app')
);