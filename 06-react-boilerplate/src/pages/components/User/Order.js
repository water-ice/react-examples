import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
@pureRender
class Order extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const{
			topay,
			tosend,
			torec,
			complete
		} = this.props;
		return (
			<div className="user-order w-row w-reset">
			    <div className="w-col-6">
			    	<i className="iconfont icon-jinhuodan w-pd-lr w-blue" />
			    	普通订单
		    	</div>
			    <Link to="/order?pages=list&type=all" className="w-col-6 w-tr">
			    	查看全部订单 
			    	<i className="iconfont icon-right w-pd-r" />
		    	</Link>
			    <div className="order-list w-row w-tc">
			        <Link to="/order?pages=list&type=topay">
			        	<div className="iconfont icon-topay" />
			        	待付款
			        	{topay>0&&<span>{topay}</span>}
		        	</Link>
			        <Link to="/order?pages=list&type=tosend">
			        	<div className="iconfont icon-tosend" />
			        	待发货
			        	{tosend>0&&<span>{tosend}</span>}
		        	</Link>
			        <Link to="/order?pages=list&type=torec">
			        	<div className="iconfont icon-torec" />
			        	待收货
			        	{torec>0&&<span>{torec}</span>}
		        	</Link>
			        <Link to="/order?pages=list&type=complete">
			        	<div className="iconfont icon-complete" />
			        	已完成
			        	{complete>0&&<span>{complete}</span>}
		        	</Link>
			    </div>
			</div>
		);
	}
}
Order.propTypes = {
	amounts:React.PropTypes.object
};
export default Order;