import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';

const styles = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	cursor: 'move',
};
@pureRender
class Box extends Component {
	render() {
		const { title, yellow } = this.props;
		const backgroundColor = yellow ? 'yellow' : 'white';

		return (
			<div style={{ ...styles, backgroundColor }}>
				{title}
			</div>
		);
	}
}
Box.propTypes = {
	title: PropTypes.string.isRequired,
	yellow: PropTypes.bool,
};
export default Box;
