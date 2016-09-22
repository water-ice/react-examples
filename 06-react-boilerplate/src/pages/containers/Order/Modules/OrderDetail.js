import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as types from '../../../constants/actions/order';
/*ant*/
import {
	Toast
} from 'antd-mobile';
class OrderDetail extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentWillMount() {
		if (this.props.detail.isFetching === 0) {
			Toast.loading(null,0);
			let url = types.ORDER_DETAIL_GET;
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
	render() {
		return (
			<div className="w-reset">
				test
      		</div>
		);
	}
}

OrderDetail.propTypes = {

};

export default OrderDetail;