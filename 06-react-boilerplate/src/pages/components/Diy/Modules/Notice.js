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
			notice,
			m_tb,
			bgcolor
		} = this.props;
		let styleCss={
		 	background:bgcolor?bgcolor:"white",
		 	margin:m_tb+' 0'
		};
		return (
			<div className="diy-conitem w-row w-pd w-orange" style={styleCss}>
			        <i className="iconfont w-col-1 icon-yan" />
			        <marquee className="w-col-11">{notice}</marquee>
			</div>
		);
	}
}
Title.propTypes = {

};
export default Title;