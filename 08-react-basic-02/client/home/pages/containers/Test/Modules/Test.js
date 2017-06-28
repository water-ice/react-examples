import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TestActions from '@home/actions/test';
import * as types from '@home/constants/actions/test';
import  Header from '@home/components/Test/Header';
/*ant*/
import { Toast } from 'antd-mobile';
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);