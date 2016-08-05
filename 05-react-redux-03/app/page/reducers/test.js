//处理数字增加的reducer
import * as types from '../actions/actionTypes';

const writeColor = '#ffffff';
const grayColor = '#cccccc';

const initialState = {
  count:0,
  theme:grayColor 
};
let reducer = (state=initialState,action)=>{
    switch(action.type){
        case types.INCREASE:
            //注意这里使用的action.num，明白是从哪里来的吗？
            return Object.assign({}, state, {
                count:state.count+action.num,
             });
        case types.THEME:
            let color;
            if(state.theme == writeColor){
                color=grayColor;
            }else {
                color=writeColor;
            }
            return Object.assign({}, state, {theme:color});
        default:
            return state;
    }
};
export default reducer;
