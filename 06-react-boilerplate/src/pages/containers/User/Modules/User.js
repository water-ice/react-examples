import React, { Component, PropTypes } from 'react';
import * as types from '../../../constants/actions/user';
import Footer from '../../../components/Footer/Footer';
/*ant*/
import {
	Toast,
	WhiteSpace,
	WingBlank,
	Button
} from 'antd-mobile';
class Home extends Component {
	componentWillMount() {
		if (this.props.user.isFetching === 0) {
			let url = types.USER_GET_MAIN;
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
				用户中心
				<Footer />
      		</div>
		);
	}
}

Home.propTypes = {};

export default Home;