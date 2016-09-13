import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import './List.scss';
const List = () => {
	return (
		<div>
			<div className="user-list w-row w-reset w-m-tb">
			    <Link to="/">
			        <div className="w-col-6">
			            <i className="iconfont icon-jinhuoche w-orange" />
			            购物车
			        </div>
			        <div className="w-col-6 w-tr">
			            <i className="iconfont icon-right" />
			        </div>
			    </Link>
			    <Link to="/">
			        <div className="w-col-6">
			            <i className="iconfont icon-daohang w-blue" />
			            修改地址
			        </div>
			        <div className="w-col-6 w-tr">
			            <i className="iconfont icon-right" />
			        </div>
			    </Link>
			</div>
			<div className="user-list w-row w-reset w-m-tb">
			    <a href="tel:12333333">
			        <div className="w-col-6">
			            <i className="iconfont icon-zuoji w-black-2" />
			            举报
			        </div>
			        <div className="w-col-6 w-tr">
			            <i className="iconfont icon-right" />
			        </div>
			    </a>
			</div>
		</div>
		
	);
};
export default List;