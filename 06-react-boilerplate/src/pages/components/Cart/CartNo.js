import React from 'react';
import { Link } from 'react-router';
import './CartNo.scss';
const CartNo = () => {
	return (
		<div className="cart-no w-tc w-reset">
			<i className="iconfont">&#xe61f;</i>
			<p>主人我饿了！<br />快点去楼下给我找点吃的吧！</p>
			<Link to="/" activeStyle={{color: 'white'}}>
				逛商城
			</Link>
			<p>我是楼下！点我点我</p>
		</div>
	);
};
export default CartNo;