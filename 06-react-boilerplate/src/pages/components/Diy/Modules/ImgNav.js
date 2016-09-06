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
			m_tb
		} = this.props;
		return (
			<div className="diy-conitem w-reset" style={{margin:m_tb+" 0"}}>
			    <ul className={
			            classnames(
			                'w-row',
			                ('diy-img-nav-'+style),
			                {'w-bg-white':style==1}
			            )        
			        }
			    >
			        {item_list.map((item,index)=>{
			        	let {
			        		bg,
			        		url,
			        		img,
			        		title
			        	} = item;
			            return(
				            <li key={index} style={{width:100/item_list.length+'%'}}>
				                <Link to={url}>
				                    <img src={img} />
				                    <div style={{background:bg}}>{title}</div>
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