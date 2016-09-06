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
			style,
			position,
			title,
			m_tb,
			bgcolor
		} = this.props;
		return (
			<div>
				<div className="diy-conitem" style={{margin:m_tb+" 0"}}>
				    <div className={
				    			classnames(
				    				"w-pd-lr diy-title",
				    				("title-style-"+style),
				    				(
				    					(()=>{
				    						switch(position){
					    						case 0:
					    							return 'w-tl';
					    						case 1:
					    							return 'w-tc';
					    						default:
					    							return 'w-tr';
				    						}
				    					})()
				    				)
				    			)
				    		} 
				    		style={{background:bgcolor}}
				    >
				        <h3>{title}</h3>
				        <span></span>
				    </div>
				</div>
          	</div>
		);
	}
}
Title.propTypes = {

};
export default Title;