'use strict';
/*eslint no-console:0*/
import React from 'react';
import { connect } from 'react-redux';

/*
    注意：这里是修改了的
    现在不用引入action了，因为前一步已经把钥匙Action放到相应的函数中去，作为props传入组件里面
*/
//import {increaseAction} from '../redux/action';
//console.log(increaseAction);
let {Component,PropTypes}  = React;
class Index extends Component{
    //这一步是检查传入的各个prop类型是否正确
    static ProTypes = {
        count:PropTypes.number.isRequired,
        onIncreaseClick:PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
    }
    handleClick(){
        /*
            这一步输入this.props可以看到，其实里面有两个东西
            在下面的render里面我们用到了this.props.count这个
            那么这里我们要用到dispatch
        */
        /*console.log(this.props);
        let {dispatch} = this.props;
        //粗暴简单的使用
        console.log(increaseAction);
        dispatch(increaseAction);*/
        
        /*
            注意：这里是修改过的
            现在，我们把打包好的，带着钥匙的函数进行调用
        */
        console.log(this.props);
        let {onIncreaseClick} = this.props;
        onIncreaseClick();
    }
    render(){
        console.log('index.js render');
        console.log(this.props);
        let {count} = this.props;
        return <div onClick = {this.handleClick.bind(this)}  style={styles.circle}>{count}</div>;
    }
}
//样式文件，不用细看
let styles = {
    circle:{
        width:'100px',
        height:'100px',
        position:'absolute',
        left:'50%',
        top:'50%',
        margin:'-50px 0 0 -5px',
        borderRadius:'50px',
        fontSize:'60px',
        color:'#545454',
        backgroundColor:'#fcfcfc',
        lineHeight:'100px',
        textAlign:'center',
    }
};
export default Index;
