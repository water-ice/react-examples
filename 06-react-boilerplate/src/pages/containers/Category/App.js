import React, { Component, PropTypes } from 'react';
import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';
import * as CategoryActions from '../../actions/category.js';
import Category from './Modules/Category';
class App extends Component {
	constructor(props,context) {
	    super(props,context);
	}
  	render() {//做路由判断，返回不同组件
    	let { actions,category } = this.props;
      	return (
      		<Category
      			actions={actions}
      			main={category.main}
      		/>
      	);
  	}
}

function mapStateToProps(state) {
	return {
		category: state.category
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(CategoryActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);