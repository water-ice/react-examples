import React, { Component, PropTypes } from 'react';
import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';
import * as TplActions from '../../actions/_tpl';
import Tpl from './Modules/Tpl';
class App extends Component {
	constructor(props,context) {
	    super(props,context);
	}
  	render() {//做路由判断，返回不同组件
    	let { ...rest } = this.props;
      	return (<Tpl {...rest} />);
  	}
}

function mapStateToProps(state) {
	return {
		home: state.home
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(TplActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);