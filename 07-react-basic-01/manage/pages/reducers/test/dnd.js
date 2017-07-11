import * as types from '@constants/actions/test';
const initialState = {
	isFetching: 0,      //是否已经获取 
	didInvalidate: 1,    //是否失效
	editing: null,
	itemArr: [],
	itemObj: {}
};
let sort = 0;
const getInitData = (atType) => {
	let data,item;
	switch(atType) {
		case "input":
			item = `input#${sort}`;
			data = {
				title: "自定义标题",
				tip: "自定义提示内容"
			};
			sort ++;
			break;
		case "radio":
			item = `radio#${sort}`;
			data = {
				title: "自定义标题",
				tip: "自定义提示内容"
			};
			sort ++;
			break;
		default:
			break;
	}
	return {data,item};
};
export const testDnd = (state = initialState, action) => {
	let atType, atInit, atIndex, item, data, itemArr;
	switch (action.type) {
		case types.TEST_DND_GET + '_SUCCESS':
			return state;
		// 新增
		case types.TEST_DND_ADD:
			atType = action.atType;
			atIndex = action.atIndex;
			atInit = getInitData(atType);
			item = atInit.item;
			data = atInit.data;
			state = {
				...state,
				itemArr:[...state.itemArr,item],
				itemObj:{
					...state.itemObj,
					[item]: data
				}
			};
			if(atIndex != null){
				state.itemArr.pop();
				state.itemArr.splice(atIndex, 0, item);
			}
			return state;
		// 编辑
		case types.TEST_DND_EDIT:
			item = action.item;
			data = action.data;
			state = {
				...state,
				itemObj:{
					...state.itemObj,
					[item]: data
				}
			};
			return state;
		// 排序
		case types.TEST_DND_SORT:
			item = action.item;
			itemArr = state.itemArr.filter(_item => _item != item);
			itemArr.splice(action.atIndex, 0, item);
			state = {
				...state,
				itemArr
			};
			return state;
		// 删除
		case types.TEST_DND_DEL:
			item = action.item;
			itemArr = state.itemArr.filter(_item => _item != action.item);
			state = {
				...state,
				itemArr
			};
			return state;
		default:
			return state;
	}
};