import * as types from './actionTypes';

//导出加一的方法
export function incrementAction() {
	return {
		type: types.COUNTER_INCREMENT
	};
};
//导出减一的方法
export function decrementAction() {
	return {
		type: types.COUNTER_DECREMENT
	};
};