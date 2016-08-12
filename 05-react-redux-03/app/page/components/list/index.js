import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { 
	GET_NEWS_LIST, 
	GET_TOP_NEWS, 
	GET_NEWS_DETAIL , 
	LATEST_NEWS, 
	LIKE_NEWS 
} from '../../constants/constants';

import Scroll from './scroll';
import Dropload from './dropload';//菊花转按钮
import List from './list';
import Tab from './tab';//tabs
import './_index.css';
class Wrapper extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			lock: true
		};
		this.firstGetAllData = false;
		this.loadTopNews = this.loadTopNews.bind(this);
		this.loadNewsList = this.loadNewsList.bind(this);
		this.loadData = this.loadData.bind(this);
		this.loadDataForScroll = this.loadDataForScroll.bind(this);
		this.getNewsDetail = this.getNewsDetail.bind(this);
	}



	componentWillMount() {
		//console.log('will');
		//console.log(this.props);
		if (this.props.news.ids.length === 0) {
			this.loadTopNews();//第一次进入页面加载数据
		}
	}
	componentDidMount() {
	}
	componentWillReceiveProps(nextProps) {
		this.props.toggleSpinLoading(false);
		
		return true;
	}

	loadDataForScroll() {
		this.loadNewsList(null);
	}

	loadTopNews() {
		let url = GET_TOP_NEWS,
			opts = {};

		let param ={
			chlid: 'news_news_top',
			refer: 'mobilewwwqqcom',
			otype: 'jsonp',
			callback: 'getNewsIndexOutput',
			t: (new Date()).getTime()
		};

		let params = {
			param: param,
			ajaxType: 'JSONP',
			onSuccess: (res) => {
				this.setState({
					lock: false
				});
			},
			onError: (res) => {
				// console.log(res);
				// alert(res.errMsg || '加载新闻列表失败，请稍后重试');
			}
		};
		this.props.request(url, params, opts);
	}

	loadNewsList(props) {
		//var props = props || this.props;

		this.loadData(LATEST_NEWS, {});
	}

	//http://mat1.gtimg.com/www/mobi/image/loadimg.png

	loadData(listType, param = {}, opts = {}) {
		let _this = this;
		let url = GET_NEWS_LIST;

		let listInfoParam = this.props.news.listInfo['listLatest'],
			ids = this.props.news.ids,
			args = this.props.args;

		// 防止重复拉取
		if (listInfoParam.isLoading) {
			return;
		}

		let curPage = listInfoParam.curPage,
			page_size = listInfoParam.pageSize,
			startIndex = 0 + (curPage) * page_size,
			endIndex = startIndex + page_size;

		let newIds = ids.slice(startIndex, endIndex),
			newIdArray = [];


		newIds.forEach((item, index) => {
			newIdArray.push(item.id);
		});

		param = Object.assign({}, {
			cmd: GET_NEWS_LIST,
			ids: newIdArray.join(','),
			refer: "mobilewwwqqcom",
			otype: "jsonp",
			callback: "getNewsContentOnlyOutput",
			t: (new Date()).getTime(),
		}, param );

		let params = {
			param: param,
			ajaxType: 'JSONP',
			onSuccess: function(data) {
				console.log(data);
			},
			onError: function(res) {
				console.log("err");
				// console.log(res);
				// alert(res.errMsg || '加载新闻列表失败，请稍后重试');
			}
		};

		this.props.request(url, params, opts);
	}

	getNewsDetail(item) { // 新闻详情的方法
		let url = GET_NEWS_DETAIL,
			opts = {};

		let param = Object.assign({}, {
			url: item.url,
			news_id: item.id,
			v: (new Date()).getTime(),
		}, param);

		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: function(data) {
				
			},
			onError: function(res) {
				console.log("err");
			}
		};

		this.props.request(url, params, opts);
	}

	render() {
		console.dev('render container!!!');
		let tabStyle = this.props.tabs,
			isEnd = this.props.news.listInfo['listLatest']['isEnd'],
			isLoadingShow = tabStyle === LATEST_NEWS;
		console.log(this.props);
		return (
		        <article className="cm-page">
		        	<Tab
		        		tabs={this.props.tabs}
		        		updateActiveTab={this.props.updateActiveTab}
		        	/>
		            <div className="cm-content">
		            	<Scroll 
		            			wrapper={".content-wrap"}
		            			ref="scroll"
		            			loadDataForScroll={this.loadDataForScroll}
		            			disable={this.state.lock}
		            	>
		            		<List 
								  tabs={this.props.tabs}
								  tabsType={LATEST_NEWS}
								  news={this.props.news.listLatest}
								  listInfo={this.props.news.listInfo.listLatest}
								  args={this.props.args}
								  likeNews={this.props.likeNews}
								  getNewsDetail={this.getNewsDetail}
								  details={this.props.details}
							/>
							<List 
								  tabs={this.props.tabs}
								  tabsType={LIKE_NEWS}
								  news={this.props.news.listLike}
								  listInfo={this.props.news.listInfo.listLike}
								  args={this.props.args}
								  dislikeNews={this.props.dislikeNews}
								  getNewsDetail={this.getNewsDetail}
								  details={this.props.details}
							/>
		         <Dropload isState={this.props.spinLoading}/>
							
		            	</Scroll>
		            </div>
		        </article>
		);
	}
}

Wrapper.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Wrapper;