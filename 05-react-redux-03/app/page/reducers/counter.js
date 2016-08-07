//处理数字增加的reducer
import {
    COUNTER_INCREMENT,
    COUNTER_DECREMENT
}  from '../actions/actionTypes';

const initialState = {
    counter:0
};
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
let reducer= (state = initialState, action)=> {
    switch (action.type) {
        case COUNTER_INCREMENT:
            return Object.assign({}, state, {
                counter:state.counter+1,
            });
        case COUNTER_DECREMENT:
            return Object.assign({}, state, {
                counter:state.counter-1,
            });
        default:
            return state;
    }
};
export default reducer;
