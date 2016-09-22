import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import pureRender from 'pure-render-decorator';
import {Link} from 'react-router';
@pureRender
class Title extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			style,
			item_list,
			m_tb,
			pd
		} = this.props;
		return (
			<div className="diy-conitem w-tc w-reset" style={{margin:m_tb+" 0"}}>
			    <ul 
			    	className={
			            classnames(
			                'w-row',
			                ('diy-top-nav-'+style)
			            )        
			        }
			    >
			    {item_list.map((item,index)=>{
			    	let {
			    		bg,
			    		pd,
			    		url,
			    		img,
			    		title
			    	} = item;
			        let styleCss = {
			            background:bg,
			            boxShadow:'inset 0 0 0 '+pd+' #f4f4f4',
			            width:100/item_list.length+'%'
			        };
			        return(
			            <li key={index} style={styleCss}>
			                <Link to={url}>
			                {
		                		style==0?
			                    	title
			                	:
				                (
				                	<div>
				                    	<img src={img} />
				                    	<div>{title}</div>
				                 	</div>
				                )
			                }
			                </Link>
			            </li>
			        );
			    })}
			    </ul> 
			</div>
		);
	}
}
Title.propTypes = {

};
export default Title;