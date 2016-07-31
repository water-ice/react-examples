'use strict';
/*eslint no-console:0*/
console.log('lesson_0.js start');
import React from 'react';
import { createStore } from 'redux';
import { Provider,connect } from 'react-redux';

//这个index.js文件会在在下一步创建
import Index from '../component/index';
import reducers from '../redux/reducer';
/*
    注意：这里是新增的
    相对原来，我们在最外层打包这里引入Action
*/
import {increaseAction} from '../redux/action';

//创建store
let store = createStore(reducers);
/*  mapStateToProps你可以理解成在下面connect的时候为组件提供一个props，这个props的值是redux的state
*/
console.log(store);
let mapStateToProps = (state) =>{
	console.log('lesson_0.js mapStateToProps trigger');
	console.log(state);
    return {count:state.count};
};
/*
    注意：这里是新增的
    mapDispatchToProps你可以理解成在下面connect的时候提供一个放置好钥匙的函数onIncreaseClick,直接调用就可以去reducer修改state了
*/
let mapDispatchToProps = (dispatch) =>{
	console.log('lesson_0.js mapDispatchToProps trigger');
    return{onIncreaseClick:()=>dispatch(increaseAction)};
};
//连接你的state和最外层的组件，主要注意第一个是state，第二个为了传递方法进去
let Content = connect(mapStateToProps,mapDispatchToProps)(Index);
let {Component} = React;

//使用Provider来把新的App组件打包出来
class App extends Component{
    render(){
        return <Provider store={store}><Content /></Provider>;
    }
}
console.log('lesson_0.js end');
export default App;