import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import Payment from '../_common/Payment/Payment';
import './Pay.scss';
@pureRender
class Memo extends Component {
	constructor(props, context) {
		super(props, context);
		this.handlePay = this.handlePay.bind(this);
	}
	handlePay(event){
		let {getPayParams} = this.props;
		/*ajax*/
		console.log(getPayParams());
		Payment.popup({
			req:{
				action:'getPaymentInfo',
				...getPayParams()
			}
		});
	}
	render() {
		const {amounts} = this.props;
		const {amount} = amounts;
		return (
				<div className="order-pay w-media-fixed">
					<div className="w-col-9 w-tr w-pd-r">
						<span>合计：<b>￥<b>{amount}</b></b></span><br />
						<small>含运费</small>
					</div>
					<div 
						className="w-col-3 w-tc btn-order-pay"
						onClick = {this.handlePay}
					>
						确认订单
					</div>
				</div>
		);
	}
}
Memo.propTypes = {
	amounts:React.PropTypes.object,
};
export default Memo;