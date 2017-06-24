import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createEcharts } from '@common/js/components/CreateEcharts/index';
import Test from '@home/components/Test/Echart/Test';
@createEcharts({})
class TestEchart extends Component {
	render() {
		return (
			<div className="">
				<Test />
			</div>
		);
	}
}

TestEchart.propTypes = {};

export default TestEchart;