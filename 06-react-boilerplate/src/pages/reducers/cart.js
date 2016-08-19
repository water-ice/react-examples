//cart中的数据
import * as types from '../constants/actions/cart';
const initialState = {
    main: {
        isFetching: 0,      //是否已经获取 
        didInvalidate: 1,   //是否失效
        itemArr:[],        //拆分出来的id
        itemObj:{},
        carts:[],
        carts_temp:[],
        _price:null,
        _count:null,
        _invalid:null,
        _quantity:null
    }
};
function itemInit (data){
    let itemArr = [];
    let itemObj = {};
    /*
        以上渲染的时候用，
        以下购物车逻辑处理
    */
    let carts = []; //表示选中的商品

    let carts_lose = []; // 失效商品

    let carts_temp = []; // 可以编辑的全部商品 id 用于全选

    let _count = 0; //表示购物车商品类型数量
    let _invalid = 0; //失效数量
    for (let i = 0; i < data.length; i++) {
        itemArr.push(data[i].id);
        itemObj[data[i].id] = data[i];

        if (data[i].status) { //["status": 0]
            carts_lose[i] = data[i].id; //表示过期的商品
            _invalid++;
        } else {
            carts[i] = data[i].id; //可编辑商品
            carts_temp[i] = data[i].id;
        }
        _count++;
    }
    let { _price,_quantity } = sumCommon( carts,itemObj ); // 计算当前价格和数量
    return {itemArr,itemObj,carts,carts_lose,carts_temp,_price,_quantity,_invalid,_count};
}
function sumCommon(carts,itemObj){
    let _price = 0;
    let _quantity = 0;
    for (let i = 0; i < carts.length; i++) { //选中的商品
        _price += itemObj[carts[i]].price * itemObj[carts[i]].quantity;
        _quantity += itemObj[carts[i]].quantity;
    }
    _price = parseFloat(_price).toFixed(2); //保留两位；
    return {_price,_quantity};
}
function deleteCommon(itemArr,carts,carts_temp,_count,id){
    if(id){
        itemArr = itemArr.filter(value => value != id); // 过滤掉一样的值
        carts = carts.filter(value => value != id); // 过滤掉一样的值
        carts_temp = carts_temp.filter(value => value != id); // 过滤掉一样的值
        _count--;
    }else{
        let arr = carts;
        for(let i=0;i<arr.length;i++){
            itemArr = itemArr.filter(value => value != arr[i]); // 过滤掉一样的值
            carts = carts.filter(value => value != arr[i]); // 过滤掉一样的值
            carts_temp = carts_temp.filter(value => value != arr[i]); // 过滤掉一样的值
            _count--;
        }
    }
    return {itemArr,carts,carts_temp,_count};
}
export default function(state = initialState, action) {
    let newState, items, isTrue, carts, carts_temp, itemArr, id, sum , _count ,deleteData,quantity;
    switch (action.type) {
        case types.CART_GET_MAIN + '_SUCCESS':
            if (state && state.didInvalidate == 0) { //当数据失效的时候，变为初始值；
                state.main = initialState.main;
            }
            newState = Object.assign({}, state, {
                main: action.data
            });

            items = itemInit(action.data.data);
            newState.main = Object.assign({}, newState.main, items);
            newState.main['isFetching'] = 1;
            newState.main['didInvalidate'] = 1;
            return newState;
        case types.CART_GET_MAIN + '_ERROR':
            newState = Object.assign({}, state); //就是原数据，可以不写
            return newState;
        case types.CART_SELECT_MAIN:
            //选择
            newState = Object.assign({}, state);
            carts = newState.main.carts; // carts 选中的id数组
            carts_temp = newState.main.carts_temp; // carts 选中的id数组
            id = action.id; //当前操作的id
            if(id){//单选
                isTrue = (carts).includes(id);
                if (isTrue) {
                    carts = carts.filter(value => value != id); // 过滤掉一样的值
                } else {
                    carts.push(id);
                }
            }else{//全选
                if (carts.length > 0) {
                    carts = [];
                } else {
                    carts = carts_temp;
                }
            }
            sum = sumCommon(carts, newState.main.itemObj);
            newState.main = Object.assign({}, state.main, sum, {
                carts
            });
            return newState;
        case types.CART_DELETE_MAIN:
            //删除
            newState = Object.assign({}, state);
            carts = newState.main.carts; // carts 选中的id数组
            carts_temp = newState.main.carts_temp; // carts 选中的id数组
            itemArr = newState.main.itemArr; // 全部id数组
            _count = newState.main._count; // 全部id数组
            id = action.id;
            deleteData = deleteCommon(itemArr,carts,carts_temp,_count,id);
            sum = sumCommon(carts, newState.main.itemObj);
            newState.main = Object.assign({}, state.main, sum, deleteData);
            return newState;
        case types.CART_PUT_MAIN:
            //更新数据
            newState = Object.assign({}, state);
            carts = newState.main.carts; // carts 选中的id数组
            id = action.id;
            quantity = action.quantity;
            newState.main.itemObj[id].quantity = quantity;
            sum = sumCommon(carts, newState.main.itemObj);
            newState.main = Object.assign({}, state.main, sum);
            return newState;
        default:
            return state;
    }
};