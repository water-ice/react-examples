//home中的数据
import {initItem} from 'utils';
import * as types from '../constants/actions/category';
const initialState = {
    main:{
        isFetching: 0,//是否已经获取 
        didInvalidate:1,//是否失效
        curId:null,//当前的cat_id
        dataLeft:[],//左边数据
        dataRight:{},//右边数据
    }
};
const initObj = {
    curPage: 0,//当前页数
    totalPage:1,//总页数
    pageSize: 10,//条数
    isEnd: 0,//是否正在加载 0 上拉加载，1为加载中，2为已全部加载
    itemArr:[],
    itemObj:{} 
};
export default function(state = initialState, action) {
    let newState,items,cat_id,curPage,totalPage;
    switch (action.type) {
        case types.CATEGORY_MAIN_GET + '_SUCCESS':
            if (state.main && state.main.didInvalidate == 0) { //当数据失效的时候，变为初始值；
                state ={
                    ...state,
                    main:{...initialState.main}
                };
            }
            items = initItem(action.data,'cat_id',null,initObj);
            newState = {
                ...state,
                main:{
                    ...state.main,
                    curId:items.itemArr[0],
                    dataLeft:action.data,
                    dataRight:items.itemObj,
                    isFetching: 1,
                    didInvalidate:1
                }
            };
            return newState;
        case types.CATEGORY_MAIN_CHANGE:
            newState = {
                ...state,
                main:{
                    ...state.main,
                    curId:action.id
                }
            };
            return newState;
        case types.CATEGORY_MAIN_LIST_GET + '_ON':
            cat_id = action.param.cat_id;
            newState = {
                ...state,
                main:{
                    ...state.main,
                    dataRight:{
                        ...state.main.dataRight,
                        [cat_id]:{
                            ...state.main.dataRight[cat_id],
                            isEnd:1
                        }
                    }
                }
            };
            return newState;
        case types.CATEGORY_MAIN_LIST_GET + '_SUCCESS':
            cat_id = action.param.cat_id;
            //curPage = action.data.curPage;
            curPage = state.main.dataRight[cat_id].curPage+1;
            totalPage = action.data.totalPage;
            items = initItem(action.data.item_list);
            newState = {
                ...state,
                main:{
                    ...state.main,
                    dataRight:{
                        ...state.main.dataRight,
                        [cat_id]:{
                            ...state.main.dataRight[cat_id],
                            curPage,
                            totalPage,
                            itemArr:[...state.main.dataRight[cat_id].itemArr,...items.itemArr],
                            itemObj:{...state.main.dataRight[cat_id].itemObj,...items.itemObj},
                            isEnd:curPage+1>totalPage?2:0
                        }
                    }
                }
            };
            return newState;
        case types.CATEGORY_MAIN_LIST_GET + '_ERROR':
            cat_id = action.param.cat_id;
            newState = {
                ...state,
                main:{
                    ...state.main,
                    dataRight:{
                        ...state.main.dataRight,
                        [cat_id]:{
                            ...state.main.dataRight[cat_id],
                            isEnd:0
                        }
                    }
                }
            };
            return newState;
        default:
            return state;
    }
};