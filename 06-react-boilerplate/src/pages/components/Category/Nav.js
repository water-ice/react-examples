import React, { Component, PropTypes } from 'react';
import NavItem from './NavItem';
import './Nav.scss';
class Nav extends Component {
	componentDidMount() {
	}
	render(){
		const {dataLeft,curId,actions} =this.props;
		return (
			<div className="w-col-3 category-nav" style={{height:_global.innerHeight}}>
				{dataLeft.map((item,index)=>{
					const {cat_id,cat_name} = item;
					let active = (cat_id == curId);
					return (
						<NavItem key={cat_id} 
								 actions={actions}
								 cat_name={cat_name} 
								 active={active} 
								 cat_id={cat_id} 
					 	/>
					);
				})}
			</div>
		);
	}
}

Nav.propTypes = {};

export default Nav;