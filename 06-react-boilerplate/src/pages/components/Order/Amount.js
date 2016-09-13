import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import './Amount.scss';
@pureRender
class Memo extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {amounts} = this.props;
		const {
			goods_amount,
			logis_amount
		} =amounts;
		return (
			<div className="order-amount w-pd-lr">
				<ul>
					<li>
						<span>商品总金额</span>
						<div>￥<b>{goods_amount}</b></div>
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
						<div>￥<b>{logis_amount}</b></div>
					</li>
				</ul>
			</div>
		);
	}
}
Memo.propTypes = {
	amounts:React.PropTypes.object
};
export default Memo;