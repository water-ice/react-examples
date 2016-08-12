import * as types from '../constants/actionTypes';
export function request(cgiName, params, opts = {}, requiredFields = []) {
    return (dispatch, getState) => {
        let action = {
            'API': {
                cgiName: cgiName,
                params: params,
                opts: opts
            },
            type: types.API_REQUEST
        };
        return dispatch(action);
    };
}