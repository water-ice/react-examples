//home中的数据
import * as types from '../constants/actions/home';
const initialState = {
    main:{
        isFetching: 0,//是否已经获取 
        didInvalidate:1,//是否失效
        itemArr:[],//自定义模版
        itemObj:{},//自定义模版数据
        header:{}//头部导航
    }
};
function initItemMain(res){
    let itemArr = [];
    let itemObj = {};
    for (let i = 0; i < res.diy.length; i++) {
        itemArr = [...itemArr,res.diy[i].type];
        itemObj[res.diy[i].type] = res.diy[i].content;
    }
    let {shop,header}= res;
    return {itemArr,itemObj,header,shop};
}
export default function(state = initialState, action) {
    let newState,items;
    switch (action.type) {
        case types.HOME_MAIN_GET + '_SUCCESS':
            if (state.main && state.main.didInvalidate == 0) { //当数据失效的时候，变为初始值；
                state ={
                    ...state,
                    main:{...initialState.main}
                };
            }
            items = initItemMain(action.data);
            newState = {
                ...state,
                main:{
                    ...items,
                    isFetching:1,
                    didInvalidate:1
                }
            };
            return newState;
        default:
            return state;
    }
};