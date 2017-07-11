import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createEcharts } from '@components/_common/CreateEcharts/index';
import Test from '@components/Test/Echart/Test';
@createEcharts({})
class Container extends Component {
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