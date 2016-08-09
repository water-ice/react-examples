import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/counter/counter';
import * as CounterActions from '../actions/counter';

//将state.counter绑定到props的counter
function mapStateToProps(state) {
	const { counter } = state.counter.present;//增加了撤销重置的。否则用去掉present
  	return {
	    counter,
  	};
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

//connect
/*
1.	第一个参数，必须是function，作用是绑定state的指定值到props上面。
  	这里绑定的是counter
2.	第二个参数，可以是function，也可以是对象，作用是绑定action创建函
  	数到props上。
3.	返回值，是绑定后的组件
*/