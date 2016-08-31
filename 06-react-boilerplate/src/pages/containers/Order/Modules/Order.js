import React, { Component, PropTypes } from 'react';
import * as types from '../../../constants/actions/order';
/*ant*/
import {
	Toast
} from 'antd-mobile';
/**/
import Express from '../../../components/Order/Express';
import Goods from '../../../components/Order/Goods';
import Memo from '../../../components/Order/Memo';
import Amount from '../../../components/Order/Amount';
import Pay from '../../../components/Order/Pay';
import './Order.scss';
class Home extends Component {
	componentWillMount() {
		if (this.props.order.main.isFetching === 0) {
			Toast.loading(null,0);
			let url = types.ORDER_GET_MAIN;
			let param = {};
			let params = {
				param: param,
				ajaxType: 'GET',
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
	}
	componentWillUnmount () {
		console.info('卸载组件');
		this.props.actions.navigator();
	}	
	render() {
		let {order,actions} = this.props;
		let {
			addr,
			itemArr,
			itemObj,
			logis,
			amounts
		} = order.main;//main的数据
		return (
			<div className="w-reset">
				<Express addr = {addr} 
						 actions = {actions}		
				/>
				<Goods 	itemArr = {itemArr} 
						itemObj = {itemObj} 
						logis={logis}
						actions = {actions}		
				/>
				<Memo />
				<Amount amounts = {amounts} />
				<Pay amounts = {amounts} />
      		</div>
		);
	}
}

Home.propTypes = {};

export default Home;