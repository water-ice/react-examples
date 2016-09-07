//user中的数据
import * as types from '../constants/actions/user';
const initialState = {
    isFetching: 0
};
export default function(state = initialState, action) {
    switch (action.type) {
        case types.TPL_GET_MAIN + '_ON':
            console.log(state);
            return state;
        case types.TPL_GET_MAIN + '_SUCCESS':
            console.log(state);
            return state;
        case types.TPL_GET_MAIN + '_ERROR':
            console.log(state);
            return state;
        default:
            return state;
    }
};