import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TestActions from '@actions/shop/test';
import * as types from '@constants/shop/actions/test';
import  Content from '@components/shop/Test/Second/Content';
/*ant*/
import { Toast } from 'antd-mobile';
import SetTitle from '@common/js/components/SetTitle/SetTitle';
class TestSecond extends Component {
	componentWillMount() {
		if (this.props.testSecond.isFetching === 0) {
			Toast.hide();//hack
			Toast.loading(null, 0);
			let url = types.TEST_SECOND_GET;
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
				<Content />
			</div>
		);
	}
}

TestSecond.propTypes = {};
function mapStateToProps(state) {
	return {
		testMain: state.testMain,
		testSecond: state.testSecond,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(TestActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TestSecond);
