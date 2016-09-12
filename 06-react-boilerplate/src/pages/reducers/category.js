//home中的数据
import * as types from '../constants/actions/category';
const initialState = {
    main:{
        isFetching: 0,//是否已经获取 
        didInvalidate:1,//是否失效
    }
};
export default function(state = initialState, action) {
    switch (action.type) {
        case types.CATEGORY_MAIN_GET + '_SUCCESS':
            console.log(state);
            return state;
        default:
            return state;
    }
};