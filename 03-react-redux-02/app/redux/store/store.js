import {createStore,applyMiddleware} from 'redux';//利用中间件做打印log
import createLogger from 'redux-logger';
import rootReducer from '../reducer/rootReducer';
/*
    以前创建store的方式：
    ?用什么方法控制开发模式和生产模式的代码不同，部分没必要，用if？？else？？
    let store = createStore(rootReducer);
*/
let createStoreWithMiddleware = applyMiddleware(
  createLogger(),
)(createStore);
let store = createStoreWithMiddleware(rootReducer);

export default store;