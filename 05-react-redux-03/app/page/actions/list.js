import * as types from '../constants/actionTypes';
/*
 * action creators
 */

export function getArgs(value) {
    return { 
        type: types.GET_ARGS, 
        value 
    };
}

export function toggleListLoading(value) {
    return { 
        type: types.TOGGLE_LIST_LOADING, 
        value 
    };
}

export function toggleSpinLoading(value) {
    return { 
        type: types.TOGGLE_SPIN_LOADING, 
        value 
    };
}

export function updateActiveTab(value) {
	return { 
        type: types.TABS_UPDATE, value};
}

export function likeNews(value) {
	return { 
        type: types.LIKE_NEWS, 
        value 
    };
}

export function dislikeNews(value) {
	return { 
        type: types.DISLIKE_NEWS, 
        value 
    };
}