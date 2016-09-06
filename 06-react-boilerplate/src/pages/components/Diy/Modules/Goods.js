import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Tpl extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			m_tb,
		} = this.props;
		return (
			<div className="diy-conitem" style={{margin:m_tb+" 0"}}>
			    商品
			</div>
		);
	}
}
Tpl.propTypes = {

};
export default Tpl;