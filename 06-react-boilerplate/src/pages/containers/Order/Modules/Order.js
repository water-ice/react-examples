import React, { Component, PropTypes } from 'react';
import * as types from '../../../constants/actions/order';
/*ant*/
import {
	Toast,
	WhiteSpace,
	WingBlank,
	Button
} from 'antd-mobile';
/**/
import Express from '../../../components/Order/Express';

class Home extends Component {
	componentWillMount() {
		if (this.props.order.isFetching === 0) {
			let url = types.ORDER_GET_MAIN;
			let param = {};

			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: function(data) {
					// console.log(data);
				},
				onError: function(res) {
					console.log("err");
				}
			};

			this.props.actions.request(url, params, {});
		}
	}
	render() {
		return (
			<div>
				<Express />
      		</div>
		);
	}
}

Home.propTypes = {};

export default Home;