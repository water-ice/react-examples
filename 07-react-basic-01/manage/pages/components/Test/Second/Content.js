import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Content extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				test second Content
			</div>
		);
	}
}
Content.propTypes = {
};
export default Content;