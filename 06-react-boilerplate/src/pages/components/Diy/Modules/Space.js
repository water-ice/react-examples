import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import pureRender from 'pure-render-decorator';
@pureRender
class Title extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			height
		} = this.props;
		return (
			   <div className="diy-conitem-space w-bg-white" style={{height}} />
		);
	}
}
Title.propTypes = {

};
export default Title;