//合并两个reducer
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import test from './test';

const rootReducer = combineReducers({
	routing: routerReducer,
    test
});

export default rootReducer;