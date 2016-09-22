import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
class NavItem extends Component {
	constructor(props,context) {
	    super(props,context);
	    this.handleChangeId = this.handleChangeId.bind(this);
	}
	handleChangeId(event){
		const {cat_id,active} =this.props;
		if(active){ return !1;}//id相同无视
		this.props.actions.categoryChange(cat_id);
	}
	render(){
		const {cat_name,active} =this.props;
		return (
				<p 
					className={classnames({'active':active})}
				    onClick={this.handleChangeId}
				>
					{cat_name}
				</p>
		);
	}
}

NavItem.propTypes = {};

export default NavItem;