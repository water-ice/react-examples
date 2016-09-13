import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import './Btn.scss';
@pureRender
class Btn extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleCommon = this.handleCommon.bind(this);
    }
    handleCommon(event){
    	let $this = event.target;
    	let action = $this.getAttribute('data-action');
    	console.log(action);
    }
	render() {
		const {
			id,
			btnType
		} = this.props; 
		switch(item){
			/*重定向*/
			//#/order?pages=comment&order_id=111
			case 'additional':
				return(<div>追加评价</div>);
			case 'ratedinfo':
				return(<div>查看评价</div>);
			case 'rated':
				return(<div>我要评价</div>);
			/*事件*/
			case 'confirm':
				return(<div data-action="receipt" onClick={this.handleCommon}>确认收货</div>);
			case 'paynow':
				return(<div data-action="pay" onClick={this.handleCommon}>立即支付</div>);
			case 'reminder':
				return(<div data-action="remind" onClick={this.handleCommon}>提醒发货</div>);
			case 'extended':
				return(<div data-action="extend" onClick={this.handleCommon}>延长收货</div>);
			case 'logistics':
				return(<div data-action="logis" onClick={this.handleCommon}>查看物流</div>);
			case 'delete':
				return(<div data-action="delete" onClick={this.handleCommon}>删除订单</div>);
			case 'cancel':
				return(<div data-action="cancel" onClick={this.handleCommon}>取消订单</div>);
			default:
				return null;
		}
	}
}
export default Btn;