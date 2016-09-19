import React, { Component, PropTypes } from 'react';
import * as types from '../../constants/actions/cart';
import pureRender from 'pure-render-decorator';
import {Modal,Toast} from 'antd-mobile';
/*ant*/
@pureRender
class Invalid extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleDelete = this.handleDelete.bind(this); // 删除
	}
	handleDelete(event){
		const {carts_lose} = this.props;
		let url = types.CART_MAIN_DELETE;
		let param = {
			id:carts_lose
		};
		let params = {
			param: param,
			ajaxType: 'DELETE',
			onSuccess: (res) => {
				Toast.hide();
			},
			onError: (res) => {
				Toast.hide();
			}
		};
		Modal.alert('删除', '确定删除么?', [
		   { text: '取消'},
		   { text: '确定', onPress: () => {
				Toast.loading(null, 0);
		   		this.props.actions.request(url, params);
		   }}
	 	]);
	}
	render() {
		return (
			<div className="w-tc">
				<i className="iconfont icon-clear" />
				<span onClick = {this.handleDelete} data-id="carts_lose">清除失效宝贝</span>
		  	</div> 
		);
	}
}
Invalid.propTypes = {};
export default Invalid;