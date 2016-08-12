import * as types from '../constants/actionTypes';

export function increase(num = 1) {
	return {
		type: types.TEST_INCREASE,
		num
	};
};

export function themeAction() {
	return {
		type: types.TEST_THEME,
	};
};