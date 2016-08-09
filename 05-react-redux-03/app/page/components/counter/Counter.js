import React, { Component, PropTypes } from 'react';

class Counter extends Component {
    incrementOdd = () =>{
        const { counter , increment } = this.props;
        if (counter % 2 === 0) {
            return;
        }
        increment();
    }
    incrementAsync = () =>{
        setTimeout(()=>{
            this.props.increment();
        },1000);
    }
    render() {
        //从组件的props属性中导入四个方法和一个变量
        const { counter , increment , decrement , undo , redo} = this.props;
        //渲染组件，包括一个数字，四个按钮
        return (
            <p>
                点击{counter} 次数 
            {' '}
            <button onClick={increment}>+</button>
            {' '}
            <button onClick={decrement}>-</button>
            {' '}
            <button onClick={this.incrementOdd}>奇数就增加</button>
            {' '}
            <button onClick={this.incrementAsync}>异步</button>
            {' '}
            <button onClick={undo}>撤销</button>
            {' '}
            <button onClick={redo}>重置</button>
            </p>
        );
    }
}
//限制组件的props安全
Counter.propTypes = {
    counter         : PropTypes.number.isRequired
};
export default Counter;