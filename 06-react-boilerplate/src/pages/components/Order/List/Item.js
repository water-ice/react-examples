import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Item extends Component {
	constructor(props, context) {
		super(props, context);
    }
	render() {
		const {
			show
		} = this.props;
		console.log(show);
	  	return (
	  		<div className="order-list-body">
	  			<header className="order-list-header w-row">
	  			    <span>订单号：1321321</span>
	  			</header>
	  			<div className="order-list-item w-row">
	  			    <div className="w-col-3">
	  			        <img src="https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png" />
	  			    </div>
	  			    <div className="w-col-9 w-pd-l">
	  			        <div>
	  			            <div className="w-col-9 w-twoline">111111</div>
	  			            <div className="w-col-3 w-tr">￥112.222</div>
	  			        </div>

	  			        <div className="order-list-sku">
	  			            <div className="w-col-9">111231321</div>
	  			            <div className="w-col-3">
	  			                <div className="w-tr">x1</div>
	  			                <div className="w-tr w-orange">已拒绝</div>
	  			            </div>
	  			        </div>
	  			    </div>
	  			</div>
	  			<footer className="order-list-footer w-row">
	  			    <div className="order-list-amount">
	  			        共111件商品 合计:￥12.22
	  			        (含运费:￥114.11)
	  			    </div>
	  			    <div className="order-list-btn">
	  			    	<div>取消订单</div>
	  			    </div>
	  			</footer>
	  		</div>
	  	);
	}
}
export default Item;