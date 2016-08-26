//home中的数据
import * as types from '../constants/actions/home';
const initialState = {
    isFetching: 0
};
export default function(state = initialState, action) {
    switch (action.type) {
        case types.HOME_GET_MAIN + '_ON':
            state = {
                ...state,
                isFetching:1,
                didInvalidate:1
            };
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