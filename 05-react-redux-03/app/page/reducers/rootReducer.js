//合并两个reducer
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import test from './test';
import counter from './counter';
import todos from './todos';
import {postsByReddit,selectedReddit} from './async';

const rootReducer = combineReducers({
	routing: routerReducer,
    test,
    counter,
    todos,
    postsByReddit,
    selectedReddit
});

export default rootReducer;