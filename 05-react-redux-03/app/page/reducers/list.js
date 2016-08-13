import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { setItem } from 'utils';
import { initialState } from '../stores/stores';
console.log(initialState);
import { 
	GET_NEWS_LIST, 
	GET_TOP_NEWS, 
	GET_COMMENT_LIST, 
	GET_NEWS_DETAIL 
} from '../constants/constants';
import { 
	GET_ARGS, 
	TABS_UPDATE, 
	TOGGLE_CONTENT,
	TOGGLE_LIST_LOADING, 
	TOGGLE_SPIN_LOADING, 
	LIKE_NEWS, 
	DISLIKE_NEWS 
} from '../constants/actionTypes';


let news = function(state = initialState.news, action) {
	let listInfoMap = {
		10: 'listLatest',  // 最新新闻
		11: 'listLike', //  收藏新闻
	};
	switch(action.type) {

		case GET_TOP_NEWS + '_SUCCESS':
			if (!action.data || !action.data.idlist || action.data.idlist.length === 0) {
				return state;
			}

			var idlist = action.data.idlist,
			    newState = Object.assign({}, state);
			
			newState.ids = Object.assign([], idlist[0].ids);
			newState.listLatest = Object.assign([], newState.listLatest.concat(idlist[0].newslist));

			return newState;


		case GET_NEWS_LIST + '_ON':
			var newState = Object.assign({}, state);
			newState.listInfo['listLatest'].isLoading = true;

			return newState;

		case GET_NEWS_LIST + '_SUCCESS':

			if (!action.data || !action.data.newslist) {
				return state;
			}

			var newState = Object.assign({}, state),
				listInfo = {
					curPage: (++newState.listInfo['listLatest'].curPage),
					isLoading: false,
				};

			newState.listInfo['listLatest'] = Object.assign({}, newState.listInfo['listLatest'], listInfo);
			newState['listLatest'] = newState['listLatest'].concat(action.data.newslist);

			return newState;

		case GET_NEWS_LIST + '_ERROR':
			var newState = Object.assign({}, state);
			newState.listInfo['listLatest'].isLoading = false;

			return newState;

		case LIKE_NEWS:
			if (!action.value) {
				return state;
			}

			var newState = Object.assign({}, state),
				isDuplicate = false;

			newState['listLike'].map((item, index) => {
				if (item.id === action.value.id) {
					isDuplicate = true;
				}
			});

			if (isDuplicate) {
				return newState;
			}

			newState['listLike'] = newState['listLike'].concat(action.value);
			setItem('like-list', JSON.stringify(newState['listLike']));

			return newState;

		case DISLIKE_NEWS:
			if (!action.value) {
				return state;
			}

			var newState = Object.assign({}, state);
			newState['listLike'] = newState['listLike'].filter((item, index) => {
				return (item.id !== action.value.id);
			});
			setItem('like-list', JSON.stringify(newState['listLike']));

			return newState;

		default:
			return state;
	}
};

let details = function(state = initialState.details, action) {
	switch (action.type) {
		case GET_NEWS_DETAIL + '_SUCCESS':
			var newState = Object.assign({}, state);
			if (!action.data || !action.data.content) {
				return newState;
			}
			newState[action.param.news_id] = action.data.content;
			return newState;
		default:
			return state;
	}
};

let comments = function(state = initialState.comments, action) {
	switch (action.type) {
		case GET_COMMENT_LIST + '_SUCCESS':
			var newState = Object.assign({}, state);
			if (!action.data || !action.data.comments || !action.data.comments.list) {
				return newState;
			}

			newState[action.param.comment_id] = action.data.comments.list;
			return newState;
		default:
			
			return state;
	}
};

let args = function(state = initialState.args, action) {
	switch(action.type) {
		case GET_ARGS:
			return Object.assign({}, state, action.value);
		default:
			return state;
	}
};

let tabs = function(state = initialState.tabs, action) {
	switch(action.type) {
		case TABS_UPDATE:
			return action.value;
		default:
			return state;
	}
};

let listLoading = function(state = initialState.listLoading, action) {
	switch(action.type) {
		case TOGGLE_LIST_LOADING:
			return action.value;

		default:
			return state;
	}
};

let spinLoading = function(state = initialState.spinLoading, action) {
	switch(action.type) {
		case TOGGLE_SPIN_LOADING:
			return action.value;
		
		case GET_COMMENT_LIST + '_ON':
		case GET_NEWS_DETAIL + '_ON':
			return true;

		case GET_COMMENT_LIST + '_SUCCESS':
		case GET_COMMENT_LIST + '_ERROR':
		case GET_NEWS_DETAIL + '_SUCCESS':
		case GET_NEWS_DETAIL + '_ERROR':
			return false;

		default:
			return state;
	}
};
export {
	args,
	tabs,
	news,
	details,
	comments,
	listLoading,
	spinLoading
};