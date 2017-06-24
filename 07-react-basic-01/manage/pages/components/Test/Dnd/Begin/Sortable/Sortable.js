import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import Container from './Container';
@pureRender
class Sortable extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				<h3>3.拖拽排序</h3>
				<Container />
			</div>
		);
	}
}
Sortable.propTypes = {
};
export default Sortable;