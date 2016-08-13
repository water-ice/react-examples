import {
    SELECT_REDDIT,
    INVALIDATE_REDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from '../constants/actionTypes';

//选择新闻后，将state.selectedReddit设为所选选项
export function selectedReddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_REDDIT:
            return action.reddit;
        default:
            return state;
    }
}

function posts(state = {
    //是否正在获取最新
    isFetching: false,
    //是否废弃
    didInvalidate: false,
    //内容
    items: []
}, action) {
    switch (action.type) {
        case INVALIDATE_REDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}
//废弃、接收到、开始接受新闻后，将state.postsByReddit设为相关参数
export function postsByReddit(state = {}, action) {
    //console.log(action);
    switch (action.type) {
        case INVALIDATE_REDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.reddit]: posts(state[action.reddit], action)
            });
        default:
            return state;
    }
}