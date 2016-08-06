//合并两个reducer
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import test from './test';
import counter from './counter';

const rootReducer = combineReducers({
	routing: routerReducer,
    test,
    counter
});

export default rootReducer;