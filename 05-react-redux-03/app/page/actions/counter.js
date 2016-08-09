import * as types from './actionTypes';

//导出加一的方法
export function increment() {
	return {
		type: types.COUNTER_INCREMENT
	};
};
//导出减一的方法
export function decrement() {
	return {
		type: types.COUNTER_DECREMENT
	};
};
export function undo() {
	return {
		type: types.COUNTER_UNDO
	};
};
export function redo() {
	return {
		type: types.COUNTER_REDO
	};
};