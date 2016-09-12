/*退出的时候可以触发路由变化，清理数据*/
import * as types from '../../constants/actions/_common';
export function navigator() {
    return {
        type: types.ROUTER_CHANGE
    };
}