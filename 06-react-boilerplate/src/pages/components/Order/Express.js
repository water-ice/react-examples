import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Express extends Component {

	constructor(props, context) {
		super(props, context);
	}
	render() {
		let {addr} = this.props;
		return (
			<div className="order-express w-row">
				<i className="iconfont w-col-2 w-tc icon-dizhi-copy" />
				{addr?
				<div className="w-col-9">
					<div>收货人: <span>{addr.consignee}</span> <span className="w-fr">{addr.mobile}</span></div>
					<div className="w-twoline">收货地址：
						<span>	
							{addr.province_name}&nbsp;
							{addr.city_name}&nbsp;
							{addr.district_name}&nbsp;
							{addr.address} 
						</span>
					</div>
				</div>
				:
				<div className="w-col-9 w-tc none-addr">请输入一个收货地址</div>
				}
				<i className="iconfont w-col-1 w-tc icon-right" />
			</div>
		);
	}
}
Express.propTypes = {
};
export default Express;