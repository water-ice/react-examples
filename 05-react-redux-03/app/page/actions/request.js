const API_REQUEST = 'API_REQUEST';
export function request(cgiName, params, opts = {}, requiredFields = []) {
    return (dispatch, getState) => {
        let action = {
            'API': {
                cgiName: cgiName,
                params: params,
                opts: opts
            },
            type: API_REQUEST
        };
        return dispatch(action);
    };
}