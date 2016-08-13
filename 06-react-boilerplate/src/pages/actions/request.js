/*common*/
const API_REQUEST = 'API_REQUEST';
export function request(apiName, params, opts = {}, requiredFields = []) {
    return (dispatch, getState) => {
        let action = {
            'API': {
                apiName: apiName,
                params: params,
                opts: opts
            },
            type: types.API_REQUEST
        };
        return dispatch(action);
    };
}