
'use strict';

import React from 'react';
//注意这里引入：bindActionCreators
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/test/test';

import * as actionCreators from '../actions/test';

let {Component} = React;

let mapStateToProps = (state) =>{
  	const { count, theme } = state.test;
  	return {
	    count,
	    theme
  	};
};
let mapDispatchToProps = (dispatch) =>{
    return bindActionCreators(actionCreators,dispatch);
};
let App = connect(mapStateToProps,mapDispatchToProps)(Main);
export default App;

