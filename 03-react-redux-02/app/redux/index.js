
'use strict';

import React from 'react';
//注意这里引入：bindActionCreators
import { bindActionCreators } from 'redux';
import { Provider,connect } from 'react-redux';

//这里引入了组件
import Index from '../component/index';

//引入了action creator 和 store。为啥没有引入reducer？
//因为reducer在上面创建store的时候已经用到了
import * as actions from './action/creator';
import store from './store/store';

let {Component} = React;

/*
    mapStateToProps里面需要注意的是，由于我们的reducer是合并起来的，因此我们的state也是几个state拼起来。至于是哪几个state拼起来？
    可以看回去rootReducer.js里面combineReducers的时候，里面的对象名字就是这里state的名字。
    当然这里的return可以写成：return {state}也没所谓。但是为了大家能认清这个state里面有什么东西，这里写的稍微复杂一点
*/
let mapStateToProps = (state) =>{
    //return {state}
    return {
        reduxState:{
            Increase:state.Increase,
            Theme:state.Theme,
        }
    };
};
/*
    mapDispatchToProps里面用到了bindActionCreators。关于bindActionCreators的作用看下面注释3
*/
let mapDispatchToProps = (dispatch) =>{
    return{
        reduxActions:bindActionCreators(actions,dispatch)
    };
};
let Content = connect(mapStateToProps,mapDispatchToProps)(Index);



class App extends Component{
    render(){
        return <Provider store={store}><Content /></Provider>;
    }
}

export default App;

