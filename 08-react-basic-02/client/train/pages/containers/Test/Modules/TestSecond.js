import React, { Component } from 'react';
import PropTypes from 'prop-types';
// redux相关
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@train/actions/test';
import * as types from '@train/constants/actions/test';
// 业务组件
import  Content from '@train/components/Test/Second/Content';
// 第三方
import { Toast } from 'antd-mobile';
class Container extends Component {
	constructor(props){
		super(props);
	}
	componentWillMount() {
		if (this.props.testSecond.isFetching === 0) {
			let url = types.TEST_SECOND_GET;
			let param = {};

			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res)=> {
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
				<Content />
			</div>
		);
	}
}

Container.propTypes = {};
function mapStateToProps(state) {
	return {
		testMain: state.testMain,
		testSecond: state.testSecond,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(creators, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
