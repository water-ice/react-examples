import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import Addr from '../_common/Addr/Addr';
import * as types from '../../constants/actions/order';
import { Toast } from 'antd-mobile';
import './Express.scss';
@pureRender
class Express extends Component {

	constructor(props, context) {
		super(props, context);
		this.handleSelcetAddr = this.handleSelcetAddr.bind(this);
	}
	handleSelcetAddr(event){
		const {addr}=this.props;
		const $this = event.target;
		const type = Number($this.getAttribute('data-type'));
		Addr.popup({
			showType:type,
			selectId: addr.id
		}).then((res) => {
			this.changeAddr(res);
		}).catch(() => {
			console.info('失败');
		});
	}
	changeAddr(res){
		Toast.loading(null,0);
		let url = types.ORDER_MAIN_ADDR_PUT;
		let param = {...res};
		let params = {
			param: param,
			ajaxType: 'PUT',
			onSuccess: function(data) {
				Toast.hide();
			},
			onError: function(res) {
				Toast.hide();
				alert('error');
			}
		};
		this.props.actions.request(url, params, {});
	}
	render() {
		const {addr} = this.props;
		const {
			consignee,
			mobile,
			province_name,
			city_name,
			district_name,
			address
		} = addr;
		return (
			<div className="order-express w-row">
				<i className="iconfont w-col-2 w-tc icon-daohang" />
				{addr?
				<div className="w-col-9" onClick = {this.handleSelcetAddr} data-type="0">
					<div>收货人: <span>{consignee}</span> <span className="w-fr">{mobile}</span></div>
					<div className="w-twoline">收货地址：
						<addr>	
							{province_name}&nbsp;
							{city_name}&nbsp;
							{district_name}&nbsp;
							{address} 
						</addr>
					</div>
				</div>
				:
				<div 
					className="w-col-9 w-tc none-addr" 
					onClick={this.handleSelcetAddr}
					data-type="1"
				>
					请输入一个收货地址
				</div>
				}
				<i  
					className="iconfont w-col-1 w-tc icon-right" 
					onClick = {this.handleSelcetAddr} 
					data-type={addr?0:1}
				/>
			</div>
		);
	}
}
Express.propTypes = {
	addr:React.PropTypes.object
};
export default Express;