import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Tpl extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			tel,
			name,
			m_tb
		} = this.props;
		return (
			<div className="diy-conitem w-pd w-bg-white" style={{margin:m_tb+" 0"}}>
			    <i className="iconfont icon-dianjia w-pd-r" />
			    <a className="w-black" href={'tel:'+tel}>{name} {tel}</a>
			</div>
		);
	}
}
Tpl.propTypes = {

};
export default Tpl;