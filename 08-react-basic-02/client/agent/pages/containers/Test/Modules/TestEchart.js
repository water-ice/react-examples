import React, { Component } from 'react';
import PropTypes from 'prop-types';
// 功能组件
import { createEcharts } from '@common/js/components/CreateEcharts/index';
// 业务组件
import Test from '@agent/components/Test/Echart/Test';
@createEcharts({})
class Container extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="">
				<Test />
			</div>
		);
	}
}

Container.propTypes = {};

export default Container;