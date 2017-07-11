import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as types from '@agent/constants/actions/test';
import PullScroll from '@common/js/components/PullScroll/PullScroll';
import List from './List';
import { Toast } from 'antd-mobile';
import pureRender from 'pure-render-decorator';
@pureRender
class ScrollList extends Component {
	constructor(props, context) {
		super(props, context);
		// 上滑加载
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		// 下拉刷新
		this.loadDataForPull = this.loadDataForScroll.bind(this, true);
	}

	loadDataForScroll(pullToRefresh = false) {
		const { listInfo, type } = this.props;
		const { currentPage } = listInfo;
		if (listInfo.isEnd > 0 && !pullToRefresh) {
			return false;
		}
		let url = types.TEST_TABS_LIST_GET;
		let param = {
			page: pullToRefresh ? 1 : currentPage + 1,
			type
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: (res) => {
				pullToRefresh&&this.refs.pull.setDefault();
			},
			onError: (res) => {
				Toast.info(res.msg, 1.5);
			}
		};
		this.props.actions.request(url, params, {pullToRefresh});
	}
	render() {
		const { show, type, listInfo, actions } = this.props;
		const { itemArr, itemObj, currentPage, isEnd } = listInfo;
		return (
			<PullScroll
				className="pull-view-wrap"
				wrapper={`.scroll-container-${type}`}
				height={_global.innerHeight - 88}
				loadDataForPull={this.loadDataForPull}
				loadDataForScroll={this.loadDataForScroll}
				isEnd={isEnd}
				currentPage={currentPage}
				show={show} // 总开关 // 默认true
				pull={true} // 允许下拉刷新 默认true
				scroll={true} // 允许上划加载 默认true
				// resetPrvScrollTop //切换过程中判断某个值的不同来置顶
				ref="pull"
			>
				<List 
					actions={actions}
					itemArr={itemArr}
					itemObj={itemObj}
				/>
			</PullScroll>
		);
	}	
} 
export default ScrollList;