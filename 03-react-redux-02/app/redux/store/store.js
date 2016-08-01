import {createStore,applyMiddleware} from 'redux';//利用中间件做打印log
import createLogger from 'redux-logger';
import rootReducer from '../reducer/rootReducer';
/*
	如果是开发模式可以引入logger，但是生产模式注释掉，影响性能；
    以前创建store的方式：
    let store = createStore(rootReducer);
    
    //利用中间件可以做一些ajax异步处理，引入redux-thunk
*/
let createStoreWithMiddleware = applyMiddleware(
  createLogger(),
)(createStore);
let store = createStoreWithMiddleware(rootReducer);

export default store;