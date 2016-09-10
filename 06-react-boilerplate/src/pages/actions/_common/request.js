/*common*/
import * as types from '../../constants/actions/_common';
export function request(apiName, params, opts = {}, requiredFields = []) {
    return (dispatch, getState) => {
        let action = {
            'API': {
                apiName: apiName,
                params: params,
                opts: opts
            },
            type: types.API_REQUEST
        };
        return dispatch(action);
    };
}
/*export function addCart(cart) {
    return (dispatch, getState) => {
        //第一种方法,但不是异步执行 （比第二种合理）
        getState()['cart'].isFetching=1; //改变了其单向数据流的特性
        let action = {
            type: ADD_CART,
        //第二种方法，异步执行（感觉有点怪）//同样也是操控全局
            store:getState
        };
        //第三种方式（主 Component） 里的 componentWillUnmount 里 dispatch 一个自定义事件，对应的 reducer 里监听并重置状态 
        //需要一个方法，怎么转化为异步的形式改变store中的值
        return dispatch(action);
    };
}*/