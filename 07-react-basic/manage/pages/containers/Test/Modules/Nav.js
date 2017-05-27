import React, { Component, PropTypes } from 'react';
class Nav extends Component {
	componentWillMount() {
	}
	render() {
		return (
			<div>
				<div>我的导航</div>
				<div>{this.props.children}</div>
			</div>
		);
	}
}

Nav.propTypes = {};

export default Nav;