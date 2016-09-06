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
			code
		} = this.props;
		const src="http://v.qq.com/iframe/player.html?"+code+"&height=400&auto=0";
		const styleCss = {
			width:100+'%',
			height:400
		};
		return (
			<div className="diy-conitem" style={{margin:m_tb+" 0"}}>
			    <iframe style={styleCss} src={src} />
			</div>
		);
	}
}
Tpl.propTypes = {

};
export default Tpl;