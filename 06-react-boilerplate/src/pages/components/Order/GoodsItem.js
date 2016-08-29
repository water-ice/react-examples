import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class GoodsItem extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		let {item,itemData} = this.props;
		let {
			img,
			goods_title,
			props_str,
			coupon,
			price,
			quantity,
		} = itemData;
		return (
			<li>
				<img className="w-fl" src={img} />
				<div>
					<p className="w-oneline">{goods_title}</p>
					<div className="order-goods-props">{props_str}</div>
					{coupon&&
						<span>优惠券</span>
					}
					<div>价格：<b>{price}</b></div>
					<div className="order-goods-edit">
						<i className="iconfont w-btn-step icon-move" />
						<div className="w-fl">X <em>{quantity}</em></div>
						<i className="iconfont w-btn-step icon-add" />
					</div>
				</div>
			</li>
		);
				
	}
}
GoodsItem.propTypes = {
};
export default GoodsItem;