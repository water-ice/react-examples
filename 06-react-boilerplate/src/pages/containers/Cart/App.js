import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CartActions from '../../actions/cart';
import * as NavigatorAction from '../../actions/_common/navigator';

import Cart from './Modules/Cart';
class App extends Component {
	constructor(props,context) {
	    super(props,context);
	}
  	render() {//做路由判断，返回不同组件
    	let { actions,cart } = this.props;
      	return (
      		<Cart 
      			actions={actions}
      			main={cart.main}
      		/>
      	);
  	}
}

function mapStateToProps(state) {
	return {
		cart: state.cart
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions:bindActionCreators(CartActions, dispatch)
	};
}

/*错误页面时，可以直接暴露一个404的组件页面*/
export default connect(mapStateToProps, mapDispatchToProps)(App);