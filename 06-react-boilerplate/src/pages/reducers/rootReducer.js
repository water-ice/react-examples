//合并两个reducer
import {
	combineReducers
} from 'redux';
import {
	routerReducer
} from 'react-router-redux';
import home from './home';
import cart from './cart';
import order from './order';
import user from './user';
import category from './category';
const rootReducer = combineReducers({
	routing: routerReducer,
	home,
	cart,
	order,
	user,
	category
});

export default rootReducer;