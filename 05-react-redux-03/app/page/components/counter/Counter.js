import React, { Component, PropTypes } from 'react';

class Counter extends Component {
    increment = () =>{
        let {incrementAction} = this.props;
        incrementAction();
    }
    decrement = () =>{
        let {decrementAction} = this.props;
        decrementAction();
    }
    incrementOdd = () =>{
        const { counter } = this.props;
        if (counter % 2 === 0) {
            return;
        }
        let {incrementAction} = this.props;
        incrementAction();
    }
    incrementAsync = () =>{
        setTimeout(()=>{
            let {incrementAction} = this.props;
            incrementAction();
        },1000);
    }
    render() {
        //从组件的props属性中导入四个方法和一个变量
        const { counter } = this.props;
        //渲染组件，包括一个数字，四个按钮
        return (
            <p>
                点击{counter} 次数 
            {' '}
            <button onClick={this.increment}>+</button>
            {' '}
            <button onClick={this.decrement}>-</button>
            {' '}
            <button onClick={this.incrementOdd}>奇数就增加</button>
            {' '}
            <button onClick={this.incrementAsync}>异步</button>
            </p>
        );
    }
}
//限制组件的props安全
Counter.propTypes = {
    counter         : PropTypes.number.isRequired
};
export default Counter;