import * as types from '../constants/actions/category';

/*引入公用的actions*/
export { request } from './_common/request';

export function categoryChange(id) {
    return { 
        type: types.CATEGORY_MAIN_CHANGE, 
        id
    };
}