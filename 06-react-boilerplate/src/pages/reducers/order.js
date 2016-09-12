//home中的数据
import {initItem} from 'utils';
import * as types from '../constants/actions/order';
import * as typesCommon from '../constants/actions/_common';
const initialState = {
    //下单页
    main: {
        isFetching: 0,      //是否已经获取 
        didInvalidate: 1,   //是否失效
        addr:{},
        amounts:{},
        logis:{},
        itemArr:[],        //拆分出来的id
        itemObj:{}  
    },
    //详情页
    detail: {
        isFetching: 0,      //是否已经获取 
        didInvalidate: 1,   //是否失效
    },
    //评论页
    comment: {
        isFetching: 0,      //是否已经获取 
        didInvalidate: 1,   //是否失效
    },
    //退款页
    refund: {
        isFetching: 0,      //是否已经获取 
        didInvalidate: 1,   //是否失效
    },
    //列表页
    list:{
        all:{
            curPage: 0,//当前页数
            totalPage:1,//总页数
            pageSize: 10,//条数
            isEnd: 0,//是否正在加载 0 上拉加载，1为加载中，2为已全部加载
            itemArr:[],
            itemObj:{}  
        },
        tosend:{
            curPage: 0,//当前页数
            totalPage:1,//总页数
            pageSize: 10,//条数
            isEnd: 0,//是否正在加载 0 上拉加载，1为加载中，2为已全部加载
            itemArr:[],
            itemObj:{}  
        },
        topay:{
            curPage: 0,//当前页数
            totalPage:1,//总页数
            pageSize: 10,//条数
            isEnd: 0,//是否正在加载 0 上拉加载，1为加载中，2为已全部加载
            itemArr:[],
            itemObj:{}  
        },
        torec:{
            curPage: 0,//当前页数
            totalPage:1,//总页数
            pageSize: 10,//条数
            isEnd: 0,//是否正在加载 0 上拉加载，1为加载中，2为已全部加载
            itemArr:[],
            itemObj:{}  
        },
        complete:{
            curPage: 0,//当前页数
            totalPage:1,//总页数
            pageSize: 10,//条数
            isEnd: 0,//是否正在加载 0 上拉加载，1为加载中，2为已全部加载
            itemArr:[],
            itemObj:{}  
        }
    }
};
function initItemMain (data){
    let itemArr = [];
    let itemObj = {};
    for (let i = 0; i < data.order_goods.length; i++) {
        itemArr = [...itemArr,data.order_goods[i].id];
        itemObj[data.order_goods[i].id] = data.order_goods[i];
    }
    addr = data.addr;
    amounts = data.amounts;
    let {addr,amounts,logis} = data;
    return {itemArr,itemObj,addr,amounts,logis};
}
export default function(state = initialState, action) {
    /*common*/
    let newState,items;
    /*order*/
    let id,quantity;
    /*orderlist*/
    let type,curPage,totalPage,isEnd;
    switch (action.type) {
        /*order*/
        case types.ORDER_MAIN_GET + '_SUCCESS':
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
                    //...action.data,//不需要保存原始数据，保存加工后的数据（如果可以，后端可做处理）
                    ...items,
                    isFetching:1,
                    didInvalidate:1
                }
            };
            return newState;
        case types.ORDER_MAIN_ADDR_PUT + '_SUCCESS':
            //action.param暂时先由传递过来，到时转换为action.data异步传递 必须使用异步传回来的（统一）
            newState = {
                ...state,
                main:{
                    ...state.main,
                    addr:{...action.param}
                }
            };
            return newState;
        case types.ORDER_MAIN_GOODS_PUT + '_SUCCESS':
            id = action.param.id;
            newState = {
                ...state,
                main:{
                    ...state.main,
                    itemObj:{
                        ...state.main.itemObj,
                        [id]:{
                            ...state.main.itemObj[id],
                            quantity:action.param.quantity
                        }
                    }
                }
            };
            return newState;
        case types.ORDER_MAIN_LOGIS_PUT + '_SUCCESS':
            id = action.param.id;
            newState = {
                ...state,
                main:{
                    ...state.main,
                    logis:{
                        ...state.main.logis,
                        ...action.param
                    }
                }
            };
            return newState;
        /*common*/
        case typesCommon.ROUTER_CHANGE:
        case types.ORDER_MAIN_GET + '_ERROR':
            //结算；为了方便，暂时考虑是清空购物车数据
            return {
                    ...state,
                    main:{...initialState.main}
            };
        /*orderlist*/
        case types.ORDER_LIST_GET + '_ON':
            type = action.param.type;
            newState = {
                ...state,
                list:{
                    ...state.list,
                    [type]:{
                        ...state.list[type],
                        isEnd:1
                    }
                }
            };
            return newState;
        case types.ORDER_LIST_GET + '_SUCCESS':
            type = action.param.type;
            //curPage = action.data.curPage;
            curPage = state.list[type].curPage+1;
            totalPage = action.data.totalPage;
            items = initItem(action.data.item_list);
            newState = {
                ...state,
                list:{
                    ...state.list,
                    [type]:{
                        ...state.list[type],
                        curPage,
                        totalPage,
                        itemArr:[...state.list[type].itemArr,...items.itemArr],
                        itemObj:{...state.list[type].itemObj,...items.itemObj},
                        isEnd:curPage+1>totalPage?2:0
                    }
                }
            };
            return newState;
        case types.ORDER_LIST_GET + '_ERROR':
            newState = {
                ...state,
                list:{
                    ...state.list,
                    [type]:{
                        ...state.list[type],
                        isEnd:0
                    }
                }
            };
            return newState;
        default:
            return state;
    }
};