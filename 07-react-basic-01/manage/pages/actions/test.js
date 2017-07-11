import * as types from '../constants/actions/test';
/**
 * 引入共用的action
 * ajax
 */
export { request } from './_common/request';

/**
 * 新建
 * @param  atType  增加的类型
 * @param  sort     从哪里之后后插入
 * @return {Object}
 */
export function dndAdd(atType, atIndex) {
	return {
		type: types.TEST_DND_ADD,
		atType,
		atIndex
	};
}
/**
 * 编辑内容
 * @param  {string} item     编辑的item
 * @param  {Object} data 编辑后的data
 * @return {Object}
 */
export function dndEdit(item, data) {
	return {
		type: types.TEST_DND_EDIT,
		item,
		data
	};
}
/**
 * 排序内容
 * @param  {string} item 编辑的item
 * @param  {Object} atIndex 从哪里之后后插入
 * @return {Object} 
 */
export function dndSort(item, atIndex) {
	return {
		type: types.TEST_DND_SORT,
		item,
		atIndex

	};
}
/**
 * 排序内容
 * @param  {string} item 删除的item
 * @return {Object} 
 */
export function dndDel(item) {
	return {
		type: types.TEST_DND_DEL,
		item
	};
}
