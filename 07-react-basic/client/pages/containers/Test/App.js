import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TestActions from '@actions/test';
import Test from './Modules/Test';
import TestSecond from './Modules/TestSecond';

class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() { //做路由判断，返回不同组件
		const { routeParams,testMain,testSecond,actions,location} = this.props;
		const { pages } = routeParams;
		const { type } = location.query;
		switch (pages) {
			case 'sku':
				return (
					<TestSecond
						actions = {actions}
						testSecond = {testMain}
					/>
				);
		   
			default:
				return (
					<Test 
						actions = {actions}
						testMain = {testMain}
					/>
				);
		}
	}
}

function mapStateToProps(state) {
	return {
		testMain: state.testMain,
		testSecond: state.testSecond,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(TestActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);