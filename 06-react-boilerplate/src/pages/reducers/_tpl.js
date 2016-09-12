//home中的数据
import * as types from '../constants/actions/_tpl';
const initialState = {
    isFetching: 0
};
export default function(state = initialState, action) {
    switch (action.type) {
        case types.TPL_MAIN_GET + '_ON':
            console.log(state);
            return state;
        case types.TPL_MAIN_GET + '_SUCCESS':
            console.log(state);
            return state;
        case types.TPL_MAIN_GET + '_ERROR':
            console.log(state);
            return state;
        default:
            return state;
    }
};