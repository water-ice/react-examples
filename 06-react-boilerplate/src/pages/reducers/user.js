//user中的数据
import * as types from '../constants/actions/user';
const initialState = {
    main: {
        isFetching: 0,      //是否已经获取 
        didInvalidate: 1,   //是否失效
        user:{},
        order:{}
    },
    addr: {
            isFetching: 0,      //是否已经获取 
            didInvalidate: 1,   //是否失效
    }
};
export default function(state = initialState, action) {
    let newState;
    switch (action.type) {
        case types.USER_MAIN_GET + '_SUCCESS':
            if (state.main && state.main.didInvalidate == 0) { //当数据失效的时候，变为初始值；
                state ={
                    ...state,
                    main:{...initialState.main}
                };
            }
            newState = {
                ...state,
                main:{
                    user:action.data.user,
                    order:action.data.order,
                    isFetching:1,
                    didInvalidate:1
                }
            };
            return newState;
        default:
            return state;
    }
};