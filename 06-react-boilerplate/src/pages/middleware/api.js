// ajax 
import net from 'net';
import API_ROOT from '../constants/apiRoot';

export default store => next => action => {
    let API_OPT = action['API'];

    if (!API_OPT) {
        return next(action);
    }

    let ACTION_TYPE = action['type'];
    let { apiName, params = {} , opts = {} } = API_OPT;
    let { localData } = opts;
    let {
        onSuccess,
        onError,
        ajaxType = 'GET',
        param
    } = params;
    // 触发下一个action
    let nextAction = function(type, param, opts) {
        action['type'] = type;
        action['opts'] = opts;
        delete param['onSuccess'];
        delete param['onError'];
        const nextRequestAction = Object.assign({}, action, param);
        return nextRequestAction;
    };

    params.data = null;
    // 触发正在请求的action
    let result = next(nextAction(apiName + '_ON', params, opts));
    if (ajaxType === 'GET' || ajaxType === 'jsonp') { // 目的是让json-server 不缓存暂时处理方法
        param.v = new Date().getTime();
    }
    if ("production" != process.env.NODE_ENV && ajaxType != 'GET') { //因为json-server是rest的接口；本地测试做个判断
        setTimeout(() => {
            params.data = {
                status: 1
            };
            onSuccess && onSuccess(params.data);
            return next(nextAction(apiName + '_SUCCESS', params, opts));
        }, 500);
    } else {
        net.ajax({
            url: API_ROOT[apiName],
            type: ajaxType,
            param,
            localData,
            success: data => {
                onSuccess && onSuccess(data);
                params.data = data;
                //  触发请求成功的action
                return next(nextAction(apiName + '_SUCCESS', params, opts));
            },
            error: data => {

                onError && onError(data);
                //  触发请求失败的action
                return next(nextAction(apiName + '_ERROR', params, opts));
            }
        });
    }
    

    return result;
};