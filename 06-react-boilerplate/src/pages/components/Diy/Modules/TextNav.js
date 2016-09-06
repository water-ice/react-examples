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
			    <ul className="diy-text-nav w-row w-bg-white w-lh-60">
			        {item_list.map((item,index)=>{
			        	let {
			        		url,
			        		title
			        	} = item;
			        	return(
			        		<Link to={url} key={index}>
			        		    <li>
			        		        <span>{title}</span>
			        		        <i className="iconfont w-fr icon-right" />
			        		    </li>
			        		</Link>
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