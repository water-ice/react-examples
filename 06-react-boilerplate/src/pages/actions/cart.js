import * as types from '../constants/actions/cart';

export { request } from './request';

export function cartSelect(id) {
    return { 
        type: types.CART_SELECT_MAIN, 
        id
    };
}