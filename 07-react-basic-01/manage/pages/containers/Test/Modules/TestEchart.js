import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Test from '@components/Test/Echart/Test';
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