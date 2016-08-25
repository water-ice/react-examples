import React, { Component, PropTypes } from 'react';
import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';
import * as HomeActions from '../../actions/home';
import Home from './Modules/Home';
class App extends Component {
	constructor(props,context) {
	    super(props,context);
	}
  	render() {//做路由判断，返回不同组件
    	let { ...rest } = this.props;
      	return (<Home {...rest} />);
  	}
}

function mapStateToProps(state) {
	return {
		home: state.home
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(HomeActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);