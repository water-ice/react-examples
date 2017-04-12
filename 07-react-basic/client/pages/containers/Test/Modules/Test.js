import React, { Component, PropTypes } from 'react';
import * as types from '@constants/actions/test';
import  Header from '@components/Test/Header';
/*ant*/
import { Toast } from 'antd-mobile';
import SetTitle from '@components/_common/SetTitle/SetTitle';
class Test extends Component {
	componentWillMount() {
		if (this.props.testMain.isFetching === 0) {
			Toast.hide();//hack
			Toast.loading(null, 0);
			let url = types.TEST_MAIN_GET;
			let param = {};

			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res)=> {
					Toast.hide();
				},
				onError: (res)=> {
					Toast.hide();
					Toast.info(res.msg,1.5);
				}
			};
			this.props.actions.request(url, params, {});
		}
	}
	render() {
		return (
			<div>
				<Header />
			</div>
		);
	}
}

Test.propTypes = {};

export default Test;