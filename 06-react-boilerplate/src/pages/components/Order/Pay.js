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
			<div className="order-pay w-media-fixed">
				<div className="w-col-9 w-tr w-pd-r">
					<span>合计：<b>￥<b>{amounts.amount}</b></b></span><br />
					<small>含运费</small>
				</div>
				<div className="w-col-3 w-tc btn-order-pay">确认订单</div>
			</div>
		);
	}
}
Memo.propTypes = {
};
export default Memo;