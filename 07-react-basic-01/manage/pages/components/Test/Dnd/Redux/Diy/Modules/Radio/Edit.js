import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
@pureRender
class Edit extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				<h3>暂时没有编辑功能</h3>
			</div>
		);
	}
}
Edit.propTypes = {
};
export default Edit;