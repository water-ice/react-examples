import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import Container from './Container';
@pureRender
class Single extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				<h3>2.拖拽到容器里</h3>
				<Container />
			</div>
		);
	}
}
Single.propTypes = {
};
export default Single;