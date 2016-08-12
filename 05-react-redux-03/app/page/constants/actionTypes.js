//为了更加直观，我们把每个Action的type属性的值额外用一个文件去描述
//for test
export const TEST_INCREASE 	= 'TEST_INCREASE';  	//增加数字的
export const TEST_THEME 	= 'TEST_THEME';  	//切换主题的

//for Counter
export const COUNTER_INCREMENT 		= 'COUNTER_INCREMENT';
export const COUNTER_DECREMENT 		= 'COUNTER_DECREMENT';
export const COUNTER_UNDO 			= 'COUNTER_UNDO';
export const COUNTER_REDO 			= 'COUNTER_REDO';

//for todoMVC
export const ADD_TODO 		= 'ADD_TODO';
export const DELETE_TODO 	= 'DELETE_TODO';
export const EDIT_TODO 		= 'EDIT_TODO';
export const COMPLETE_TODO	= 'COMPLETE_TODO';
export const COMPLETE_ALL 	= 'COMPLETE_ALL';
export const CLEAR_COMPLETED= 'CLEAR_COMPLETED';

//for async
export const REQUEST_POSTS		= 'REQUEST_POSTS';
export const RECEIVE_POSTS 		= 'RECEIVE_POSTS';
export const SELECT_REDDIT 		= 'SELECT_REDDIT';
export const INVALIDATE_REDDIT 	= 'INVALIDATE_REDDIT';
//
export const GET_ARGS 			= 'GET_ARGS';
export const TOGGLE_SPIN_LOADING = 'TOGGLE_SPIN_LOADING';
export const TOGGLE_LIST_LOADING = 'TOGGLE_LIST_LOADING';

export const TABS_UPDATE = 'TABS_UPDATE';

export const LIKE_NEWS = 'LIKE_NEWS';
export const DISLIKE_NEWS = 'DISLIKE_NEWS';

export const GET_NEWS_LIST = 'GET_NEWS_LIST';
export const GET_TOP_NEWS = 'GET_TOP_NEWS';
export const GET_COMMENT_LIST = 'GET_COMMENT_LIST';
export const GET_NEWS_DETAIL = 'GET_NEWS_DETAIL';
//common
export const API_REQUEST = 'API_REQUEST';
