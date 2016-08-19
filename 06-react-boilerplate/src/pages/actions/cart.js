import * as types from '../constants/actions/cart';

export { request } from './request';

export function cartSelect(id) {
    return { 
        type: types.CART_SELECT_MAIN, 
        id
    };
}
export function cartDelete(id) {
    return { 
        type: types.CART_DELETE_MAIN, 
        id 
    };
}
export function cartQuantity(id,quantity) {
    return { 
        type: types.CART_PUT_MAIN, 
        id,
        quantity
    };
}