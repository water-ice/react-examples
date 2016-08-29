import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Memo extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		let {amounts} = this.props;
		return (
			<div className="order-amount w-pd-lr">
				<ul>
					<li>
						<span>商品总金额</span>
						<div>￥<b>{amounts.goods_amount}</b></div>
					</li>
					{
					/*
					<li>
						<span>总优惠金额</span>
						<div>￥-<b></b></div>
					</li>
					*/
					}
					<li>
						<span>运费</span>
						<div>￥<b>{amounts.logis_amount}</b></div>
					</li>
				</ul>
			</div>
		);
	}
}
Memo.propTypes = {
};
export default Memo;