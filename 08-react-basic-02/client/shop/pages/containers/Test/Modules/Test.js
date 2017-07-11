import React, { Component } from 'react';
import PropTypes from 'prop-types';
// redux相关
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as creators from '@shop/actions/test';
import * as types from '@shop/constants/actions/test';
// 功能组件
import  ImgsPicker from '@common/js/components/ImgsPicker/example/Test';
import  ImgsPreview from '@common/js/components/ImgsPreview/example/Test';
import  DownCount from '@common/js/components/DownCount/example/Test';
import  Input from '@common/js/components/Input/example/Test';
import  PullScroll from '@common/js/components/PullScroll/example/Test';
// 业务组件
import  Header from '@shop/components/Test/Header';
// 第三方
import { Toast } from 'antd-mobile';
class Container extends Component {
	constructor(props){
		super(props);
	}
	componentWillMount() {
		if (this.props.testMain.isFetching === 0) {
			let url = types.TEST_MAIN_GET;
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
			<div className="g-flex g-fd-c">
				<Header />
				<ImgsPicker />
				<ImgsPreview />
				<DownCount />
				<Input />
				<PullScroll />
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