import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import pureRender from 'pure-render-decorator';
import { setShare } from './share';
import GoBack from '../GoBack';
@pureRender
class WxSetTitle extends Component {
	constructor(props) {
		super(props);
		this.wrapper = props.wrapper;//需要监听位置的class
		this.bindScroll = this.bindScroll.bind(this);
		this.scrollEvt = this.scrollEvt.bind(this);
		// 分享失败
		this.shareDelay = 500;
		this.shareLastTime = 0;
	}
	componentDidMount() {
		const {
			scroll,
			refresh,
			share
		} = this.props;
		!refresh&&this.hack();
		!refresh&&setShare({...share});
		/**
		 * 每个页面滚动条置顶
		 */
		document.querySelector('body').scrollTop = 0;
		scroll&&this.bindScroll();//绑定滚动监听
	}
	componentDidUpdate() {
		const shareDelay = 500;
		let now = Date.now(),
			delta = now - (this.shareLastTime || now);
		if (delta >=0 && delta <= shareDelay) {
			/**
			 * 两次发起时间小于500毫秒，属于多次发起
			 */
			this.shareLastTime = now;
			this.shareTimeout && clearTimeout(this.shareTimeout);
		}
		this.shareTimeout = setTimeout( () =>{
			const {
				refresh,
				share
			} = this.props;
			refresh&&this.hack();
			refresh&&setShare({...share});
		}, shareDelay );
	}
	componentWillUnmount() {
		this.shareTimeout && clearTimeout(this.shareTimeout);
		const {
			scroll
		} = this.props;
		scroll&&this.scrollContainer.removeEventListener('scroll', this.scrollEvt);
	}
	/**
	 * 绑定监听事件
	 * window还是wrapper
	 */
	bindScroll() {
		this.scrollContainer = (this.wrapper) ? document.querySelector(this.wrapper) : window;
		this.scrollContainer.addEventListener('scroll', this.scrollEvt);
		setTimeout(() => {
			let isWindow = (this.scrollContainer === window);
			/**
			 * 滚动到记忆位置；
			 * 这里是针对节点操作
			 */
			let scrollEle = (isWindow) ? document.body : this.scrollContainer;
			let curUrl = `${location.pathname}${location.search}`;
			let curTop = _global.scroll[curUrl] || 0;
			scrollEle.scrollTop = curTop;
			// 首页有react-lazyload懒加载
			setTimeout(()=>{
				let scrollTopHack = (isWindow) ? document.body.scrollTop : this.scrollContainer.scrollTop;
				if( curTop - scrollTopHack >= 50) {
					scrollEle.scrollTop = curTop;
				}
			},1);
			/**
			 * hack
			 * 点击按钮时候为0了
			 */
			let scrollTopHack = (isWindow) ? document.body.scrollTop : this.scrollContainer.scrollTop;
			_global.scroll[curUrl] = scrollTopHack;
		},0);
	}
	scrollEvt(event) {
		let isWindow = (this.scrollContainer === window);
		let curUrl = `${location.pathname}${location.search}`;
		let scrollTop = (isWindow) ? document.body.scrollTop : this.scrollContainer.scrollTop;
		_global.scroll[curUrl] = scrollTop;
	}
	hack(){
		// hack在微信等webview中无法修改document.title的情况
		if (_global.device.weixin) {
			let Dom = document.body;
			const iframe = document.createElement('iframe');
			iframe.style.display = 'none';
			iframe.setAttribute('src', '/empty.html');
			Dom.appendChild(iframe);
			iframe.addEventListener('load', () => {
				setTimeout(() => {
					iframe.removeEventListener("load", () => {});
					Dom.removeChild(iframe);
				}, 0);
			});
		}
	}
	render() {
		const {
			title,
			className,
			back,
			style
		} = this.props;
		return (
			<div className={className} style={style}>
				<title>{title}</title>
				{this.props.children}
				{!back&&<GoBack />}
			</div>
		);
	}
}
WxSetTitle.PropTypes={
	/**
	 * document.title
	 */
	title:PropTypes.string,
	/**
	 * 初始化class与style
	 */
	className:PropTypes.string,
	style:PropTypes.object,
	/**
	 * 保证分享触发一个页面仅有一次，同样保证hack行数只执行一次，尤为重要
	 * 在componentDidUpdate还是在componentDidMount触发
	 * false 在 componentDidMount触发
	 * true 在 componentDidUpdate触发
	 */
	refresh:PropTypes.bool,
	/**
	 * 记忆滚动监听需要的wrapper
	 */
	wrapper:PropTypes.string,
	/**
	 * 分享的内容
	 */
	share:PropTypes.object,
	/**
	 * 是否启动记忆滚动监听
	 * true为开启
	 */
	scroll:PropTypes.bool,
	/**
	 * 是否关闭返回，
	 * true为关闭
	 */
	back:PropTypes.bool,
};
/**
 *实现三个功能，标题（需要额外传入参数，使componentDidUpdate不触发），分享，滚动监听 
 */
export default WxSetTitle;

