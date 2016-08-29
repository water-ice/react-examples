import * as types from '../constants/actions/cart';

export { request } from './request';

export { navigator } from './navigator';

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