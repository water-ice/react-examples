//处理数字增加的reducer
import types from '../constants/action/home';

const writeColor = '#ffffff';
const grayColor = '#cccccc';

const initialState = {
    count: 0
};
export default function(state = initialState, action) {
    switch (action.type) {
        case types.HOME_GET_MAIN:
            return Object.assign({}, state, {
                count: state.count
            });
        default:
            return state;
    }
};