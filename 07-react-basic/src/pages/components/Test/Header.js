import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Header extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				test header
			</div>
		);
	}
}
Header.propTypes = {
};
export default Header;