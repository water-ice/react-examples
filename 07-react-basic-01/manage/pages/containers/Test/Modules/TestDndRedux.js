import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@actions/test';
import * as types from '@constants/actions/test';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Combo from '@components/Test/Dnd/Redux/Combo';
import SetNav from '@components/_common/SetNav/SetNav';

import { Breadcrumb } from 'antd';
import { Link } from 'react-router';
const nav = [
	{ to: "/home/", name: "首页" },
	{ to: null, name: "拖拽" }
];
@DragDropContext(HTML5Backend)
class Container extends Component {
	componentWillMount() {
	}
	render() {
		const { actions, testDnd } = this.props;
		return (
			<div className="g-none-select">
				<SetNav nav={nav}/>
				<Combo actions={actions} data={testDnd} />
			</div>
		);
	}
}

Container.propTypes = {};


function mapStateToProps(state) {
	return {
		testDnd: state.testDnd
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);