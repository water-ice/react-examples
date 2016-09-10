import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import Dropload from '../Dropload/Dropload';
/**
 * 使用方法
 * 
 * 请使用以下HTML嵌套方式
 * <Scroll>
 * 		<List></List>
 * </Scroll>
 *
 * 对象参数
 * prvScrollTop -> 当前列表上次滚动到的位置
 * wrapper -> 滚动的对象
 * show  -> 启用滚动 
 * isEnd -> 列表到底 0上拉加载，1加载中，2列表到底
 * curPage -> 当前页数
 *
 * 方法
 * bindScroll -> 滚动绑定
 * scrollEvt -> scroll事件回调
 * props.loadDataForScroll -> 从上层组件传进来的拉取数据方法
 *
 * 注意事项
 * 1. 记录滚动位置
 * 请在放置<Scroll>的组件里面，存放对应列表上次滚动的位置
 *
 * 2. 还原上次滚动位置
 * (1) 如果是双列表滚动，且使用display的block和none切换，则请在放置<Scroll>的组件中，切换列表的方法内，进行还原prvScrollTop
 * (2) 如果是双列表滚动，但使用替换的方式切换，则可以通过销毁<Scroll>同时重新创建，然后触发componentWillMount去还原prvScrollTop
 * 
 */

@pureRender
export default class Scroll extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {};
		this.prvScrollTop = 0;
		this.wrapper = props.wrapper;
		this.bindScroll = this.bindScroll.bind(this);
		this.scrollEvt = this.scrollEvt.bind(this);
		this.firstReq = this.firstReq.bind(this);
		this.timer = null;
	}

	componentWillMount() {
		this.prvScrollTop = 0;
		this.firstReq();
	}

	componentDidMount() {
		this.bindScroll();
	}
	componentWillReceiveProps(nextProps) {
		this.firstReq();
	}
	componentDidUpdate(prevProps, prevState) {
	
	}
	componentWillUnmount() {
		this.scrollContainer.removeEventListener('scroll', this.scrollEvt);
	}
	firstReq(){//第一次请求
		if (!this.props.show || this.props.isEnd==2) { //禁用，加载完成无视
			return;
		}
		if(this.props.curPage==0){
			this.props.loadDataForScroll && this.props.loadDataForScroll();
		}
	}
	bindScroll() {
		this.scrollContainer = (this.wrapper) ? document.querySelector(this.wrapper) : window;
		//this.scrollContainer = document.querySelector(this.wrapper);
		//this.scrollContainer = document.querySelector(this.wrapper);
		this.scrollContainer.addEventListener('scroll', this.scrollEvt);
	}

	scrollEvt(evt) {
		let isWindow = (this.scrollContainer === window);
		// 延迟计算
		this.timer && clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			if (!this.props.show || this.props.isEnd==2) {
				return;
			}

			let scrollEle = (isWindow) ? this.scrollContainer.document : this.scrollContainer;
			let scrollTop = (isWindow) ? 
							scrollEle.body.scrollTop
							: scrollEle.scrollTop;

			// 防止向上滚动也拉数据
            if (this.prvScrollTop > scrollTop) {//同样也防止不同tabs时不往下执行，但仍然存在漏洞
                return;
            }
            this.prvScrollTop = scrollTop;

			let containerHeight = (isWindow) ? scrollEle.documentElement.clientHeight : scrollEle.offsetHeight;
			let scrollHeight = (isWindow) ? scrollEle.body.clientHeight : scrollEle.scrollHeight;

			// 条件一： 滚动到最底部才拉数据
			// if (scrollTop + winHeight >= clientHeight) {
			// 条件二： 滚动到中间拉数据
			// console.log(scrollTop, scrollHeight, containerHeight);

			if (scrollTop >= (scrollHeight - containerHeight) / 2) {
				this.props.loadDataForScroll && this.props.loadDataForScroll();
			}

		}, 50); 
	}

	render() {
		const {
			scrollStyle = null,
			isEnd
		} = this.props;
		return (
			<div className="scroll-wrap-content" style={scrollStyle}>
			   {this.props.children}
  			 	<Dropload isEnd={isEnd}/>
			</div>
		);
	}
}