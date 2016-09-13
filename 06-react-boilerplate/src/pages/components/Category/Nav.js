import React, { Component, PropTypes } from 'react';
import './Nav.scss';
class Nav extends Component {
	render(){
		return (
			<div className="w-col-3 category-nav" style={{height:_global.innerHeight}}>
			    <p className="active">包邮商品</p>
			    <p>包邮商品</p>
			</div>
		);
	}
}

Nav.propTypes = {};

export default Nav;