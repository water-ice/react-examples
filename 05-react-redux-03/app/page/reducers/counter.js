//处理数字增加的reducer
import {
    COUNTER_INCREMENT,
    COUNTER_DECREMENT,
    COUNTER_UNDO,
    COUNTER_REDO    
}  from '../constants/actionTypes';
import undoable, { includeAction } from 'redux-undo';
const initialState = {
    counter:0
};
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
let counter = (state = initialState, action) => {
    switch (action.type) {
        case COUNTER_INCREMENT:
            return { ...state, counter: state.counter + 1 };
        case COUNTER_DECREMENT:
            return { ...state, counter: state.counter - 1 };
        default:
            return state;
    }
};

export default undoable(counter, {
    filter: includeAction([COUNTER_INCREMENT, COUNTER_DECREMENT]),
    limit: 10,
    debug: false,
    undoType: COUNTER_UNDO,
    redoType: COUNTER_REDO
});

