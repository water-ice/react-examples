import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// 业务组件
import Header from '@components/__tpl__/Third/Three/Header';
class Container extends Component {
	constructor(...params) {
		super(...params);
	}
	render() {
		return (
			<Fragment className="g-none-select">
				<Header />
			</Fragment>
		);
	}
}

Container.propTypes = {};

export default Container;