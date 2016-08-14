//home中的数据
import types from '../constants/actions/home';
const initialState = {
	_fetch:0
};
export default function(state = initialState, action) {
    switch (action.type) {
    	case types.HOME_GET_MAIN + '_ON':
    		console.log(state);
    	    return state;
        case types.HOME_GET_MAIN + '_SUCCESS':
            console.log(state);
            return state;
        case types.HOME_GET_MAIN + '_ERROR':
            console.log(state);
            return state;
        default:
            return state;
    }
};