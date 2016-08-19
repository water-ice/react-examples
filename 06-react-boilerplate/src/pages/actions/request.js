/*common*/
const API_REQUEST = 'API_REQUEST';
export function request(apiName, params, opts = {}, requiredFields = []) {
    return (dispatch, getState) => {
        //getState()['home'].isLoading=1;//可以通过这个方式改变store中的值；请使用dispatch分配
        let action = {
            'API': {
                apiName: apiName,
                params: params,
                opts: opts
            },
            type: API_REQUEST
        };
        return dispatch(action);
    };
}