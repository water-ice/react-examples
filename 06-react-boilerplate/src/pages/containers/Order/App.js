import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as OrderActions from '../../actions/order';
import Order from './Modules/Order';
import OrderList from './Modules/OrderList';
class App extends Component {
	constructor(props,context) {
	    super(props,context);
	}
  	render() {//做路由判断，返回不同组件
    	const { ...rest,location } = this.props;
    	const {pages,type} = location.query;
    	switch(pages){
    		case 'list':
    			return (<OrderList {...rest} type={type||'all'} />);
    		default :
    			return (<Order {...rest} />);
    	}
  	}
}

function mapStateToProps(state) {
	return {
		order: state.order
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(OrderActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);