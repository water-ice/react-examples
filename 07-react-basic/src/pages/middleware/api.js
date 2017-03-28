// ajax 
import net from 'net';
import API_ROOT from 'apiRoot';
import {DEV_WITH_PHP} from '../constants/constants';

export default store => next => action => {
	let API_OPT = action['API'];

	if (!API_OPT) {
		return next(action);
	}

	let ACTION_TYPE = action['type'];
	let { apiName, params = {} , opts = {} } = API_OPT;
	/**
	 * 如果有传递localData，就不会触发ajax了，直接触发_success
	 * 当前也可以传其他参数
	 */
	let { localData,isCallbackFirst } = opts;
	let {
		onSuccess,
		onError,
		onProgress,
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

	params={
		...params,
		data: null
	};
	// 触发正在请求的action
	let result = next(nextAction(apiName + '_ON', params, opts));

	net.ajax({
		url: API_ROOT[apiName],
		type: ajaxType,
		param,
		localData,
		success: data => {
			params={//由于后端格式是status:1,data:{}
				...params,
				data:data.data
			};
			//  触发请求成功的action
			next(nextAction(apiName + '_SUCCESS', params, opts));
			return (onSuccess && onSuccess(data));
		},
		error: data => {
			next(nextAction(apiName + '_ERROR', params, opts));
			return (onError && onError(data));
			//  触发请求失败的action
		}
	});
	return result;
};