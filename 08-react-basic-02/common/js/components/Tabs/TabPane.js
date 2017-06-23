import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
class Tab extends Component {
	constructor(props,context) {
		super(props);
	}
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default Tab;


