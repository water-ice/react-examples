//合并两个reducer
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import test from './test';
import counter from './counter';
import todos from './todos';
import {postsByReddit,selectedReddit} from './async';
import {
	args,
	tabs,
	news,
	details,
	comments,
	listLoading,
	spinLoading
} from './list';

const rootReducer = combineReducers({
	routing: routerReducer,
    test,
    counter,
    todos,
    postsByReddit,
    selectedReddit,
	args,
	tabs,
	news,
	details,
	comments,
	listLoading,
	spinLoading
});

export default rootReducer;