import * as types from '../../constants/actions/test';
import { initObj, initItem } from '@common/js/utils/utils';
const initialState = {
	...initObj
};
export const testList = (state = initialState, action) => {
	let items, currentPage, totalPage;
	switch (action.type) {
		case types.TEST_LIST_GET + '_ON':
			state = {
				...state,
				isEnd: 1
			};
			return state;
		// 上拉加载
		case types.TEST_LIST_GET + '_SUCCESS':
			currentPage = state.currentPage + 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'id');
			state = {
				...state,
				currentPage,
				totalPage,
				itemArr: [...state.itemArr, ...items.itemArr],
				itemObj: {...state.itemObj, ...items.itemObj},
				isEnd: currentPage + 1 > totalPage ? 2 : 0
			};
			return state;
		// 下拉刷新
		case types.TEST_LIST_GET + '_REFRESH':
			currentPage = 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'id');
			state = {
				...initObj,
				currentPage,
				totalPage,
				itemArr: items.itemArr,
				itemObj: items.itemObj,
				isEnd: currentPage + 1 > totalPage ? 2 : 0
			};
			return state;
		case types.TEST_LIST_GET + '_ERROR':
			state = {
				...state,
				isEnd: 3
			};
			return state;
		default:
			return state;
	}
};