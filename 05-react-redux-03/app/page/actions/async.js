import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';
//选择新闻类型action
export function selectReddit(reddit) {
    return {
        type: types.SELECT_REDDIT,
        reddit
    };
}
//废弃新闻类型action
export function invalidateReddit(reddit) {
    return {
        type: types.INVALIDATE_REDDIT,
        reddit
    };
}
//开始获取新闻action
function requestPosts(reddit) {
    return {
        type: types.REQUEST_POSTS,
        reddit
    };
}
//获取新闻成功的action
function receivePosts(reddit, json) {
    return {
        type: types.RECEIVE_POSTS,
        reddit: reddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    };
}

//获取文章，先触发requestPosts开始获取action，完成后触发receivePosts获取成功的action
function fetchPosts(reddit) {

    return dispatch => {
        dispatch(requestPosts(reddit));//
        return fetch(`https://www.reddit.com/r/${reddit}.json`)
            .then((response) => {
                let data = response.json();
                return data;
            })
            .then((json) => {
                //console.info('fetchPosts get json');
                //console.log(json);
                return dispatch(receivePosts(reddit, json));
            });
    };
}

//是否需要获取文章
function shouldFetchPosts(state, reddit) {
    const posts = state.postsByReddit[reddit];
    if (!posts) {
        return true;
    }
    if (posts.isFetching) {
        return false;
    }
    return posts.didInvalidate;
}

//如果需要则开始获取文章
export function fetchPostsIfNeeded(reddit) {
    //console.log(reddit);
    return (dispatch, getState) => {
        //console.log(getState());//获取状态树
        if (shouldFetchPosts(getState(), reddit)) {
            return dispatch(fetchPosts(reddit));
        }
    };
}