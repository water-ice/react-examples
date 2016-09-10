import * as types from '../constants/actions/cart';
/*引入公用的actions*/
export { request } from './_common/request';
export { navigator } from './_common/navigator';

export function cartSelect(id) {
    return { 
        type: types.CART_SELECT_MAIN, 
        id
    };
}
export function cartProps(param) {
    return { 
        type: types.CART_PROPS_MAIN, 
        param
    };
}