import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import pureRender from 'pure-render-decorator';
@pureRender
class Title extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className="diy-conitem-off"></div>
		);
	}
}
Title.propTypes = {

};
export default Title;