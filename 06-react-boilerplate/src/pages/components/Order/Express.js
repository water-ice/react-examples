import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import Addr from '../_common/Addr/Addr';
@pureRender
class Express extends Component {

	constructor(props, context) {
		super(props, context);
		this.handleSelcetAddr = this.handleSelcetAddr.bind(this);
		this.handleAddAddr = this.handleAddAddr.bind(this);
	}
	handleSelcetAddr(){
		let {addr}=this.props;
		Addr.popup({
			showType:1,
			selectId: addr.id
		}).then((res) => {
			console.info('回调成功');
			console.log(res);
		}).catch(() => {
			console.info('失败');
		});
	}
	handleAddAddr(){
		console.log(2);
	}
	render() {
		let {addr} = this.props;
		let {
			consignee,
			mobile,
			province_name,
			city_name,
			district_name,
			address
		} = addr;
		return (
			<div className="order-express w-row">
				<i className="iconfont w-col-2 w-tc icon-dizhi-copy" />
				{addr?
				<div className="w-col-9" onClick = {this.handleSelcetAddr}>
					<div>收货人: <span>{consignee}</span> <span className="w-fr">{mobile}</span></div>
					<div className="w-twoline">收货地址：
						<span>	
							{province_name}&nbsp;
							{city_name}&nbsp;
							{district_name}&nbsp;
							{address} 
						</span>
					</div>
				</div>
				:
				<div className="w-col-9 w-tc none-addr" onClick={this.handleAddAddr}>请输入一个收货地址</div>
				}
				<i className="iconfont w-col-1 w-tc icon-right" onClick = {this.handleSelcetAddr} />
			</div>
		);
	}
}
Express.propTypes = {
};
export default Express;