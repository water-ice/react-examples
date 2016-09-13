import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import './Header.scss';
const Header = (props) => {
	const {
		name,
		mobile,
		headimg
	} = props;
	return (
		<div className="user-header w-row">
		    <img src={headimg} />
		    <div className="w-col-3">
		        <div>我是{name}</div>
		        <div className="w-fs-22">{mobile}</div>
		    </div>
		    <Link to="/">
		    	<div className="iconfont w-fr icon-right w-pd-tb w-fs-40" />
		    </Link>
		</div>
	);
};

export default Header;