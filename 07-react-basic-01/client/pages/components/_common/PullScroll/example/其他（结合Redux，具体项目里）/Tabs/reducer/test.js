import * as types from '../../constants/actions/test';
import { initObj, initItem } from '@common/js/utils/utils';
const initialState = {
	info:{
		isFetching: 0,      //是否已经获取 
		didInvalidate: 1,    //是否失效
		// 放列表以外的数据
	},
	/**
	 * 0: 全部
	 */
	"0": {...initObj},
	"1": {...initObj},
	"2": {...initObj},
	"3": {...initObj},
	"4": {...initObj},
};
export const rebateCostRecord = (state = initialState, action) => {
	let items, currentPage, totalPage, type;
	switch (action.type) {
		case types.TEST_TABS_GET + '_SUCCESS':
			return state;
		case types.TEST_TABS_LIST_GET + '_ON':
			type = action.param.type;
			state = {
				...state,
				[type]: {
					...state[type],
					isEnd: 1
				}
			};
			return state;
		// 上拉加载
		case types.TEST_TABS_LIST_GET + '_SUCCESS':
			type = action.param.type;
			currentPage = state[type].currentPage + 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'id');
			state = {
				...state,
				[type]: {
					...state[type],
					currentPage,
					totalPage,
					itemArr: [...state[type].itemArr, ...items.itemArr],
					itemObj: {...state[type].itemObj, ...items.itemObj},
					isEnd: currentPage + 1 > totalPage ? 2 : 0
				}
			};
			return state;
		// 下拉刷新
		case types.TEST_TABS_LIST_GET + '_REFRESH':
			type = action.param.type;
			currentPage = 1;
			totalPage = action.data.totalPage;
			items = initItem(action.data.list, 'id');
			state = {
				...state,
				[type]: {
					...initObj,
					currentPage,
					totalPage,
					itemArr: items.itemArr,
					itemObj: items.itemObj,
					isEnd: currentPage + 1 > totalPage ? 2 : 0
				}
			};
			return state;
		case types.TEST_TABS_LIST_GET + '_ERROR':
			type = action.param.type;
			state = {
				...state,
				[type]: {
					...state[type],
					isEnd: 3
				}
			};
			return state;
		default:
			return state;
	}
};