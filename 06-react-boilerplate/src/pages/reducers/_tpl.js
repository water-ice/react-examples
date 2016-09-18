//_tpl中的数据
import * as types from '../constants/actions/_tpl';
const initialState = {
    main: {
        isFetching: 0,      //是否已经获取 
        didInvalidate: 1,   //是否失效
    }
};
export default function(state = initialState, action) {
    switch (action.type) {
        case types.TPL_MAIN_GET + '_ON':
            console.log(state);
            return state;
        case types.TPL_MAIN_GET + '_SUCCESS':
            console.log(state);
            if (state.main && state.main.didInvalidate == 0) { //当数据失效的时候，变为初始值；
                state ={
                    ...state,
                    main:{...initialState.main}
                };
            }
            return state;
        case types.TPL_MAIN_GET + '_ERROR':
            console.log(state);
            return state;
        default:
            return state;
    }
};