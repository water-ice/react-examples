//合并两个reducer
import {
	combineReducers
} from 'redux';
import {
	routerReducer
} from 'react-router-redux';
import home from './home';
import cart from './cart';
const rootReducer = combineReducers({
	routing: routerReducer,
	home,
	cart
});

export default rootReducer;