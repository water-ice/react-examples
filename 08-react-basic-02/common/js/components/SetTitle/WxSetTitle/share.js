/**
 * 微信分享功能
 * config = {
 *     type  : 哪里发起的请求，agent还是user
 *     title : 分享标题
 *     desc ：分享详情，可不写
 *     imgUrl：分享图片链接
 *     title_shop：分享时候标题是否显示店铺标题
 *     desc_shop: 分享时候详情是否显示店铺标题
 * }
 */
import wx from '@utils/agent/lib/jweixin-1.1.0.js';
import net from '@utils/agent/net';
import { parseUrl } from '@utils/agent/utils';
import API_ROOT from '@constants/agent/apiRoot';
import { Toast } from 'antd-mobile';
export function setShare(config = {}) {
	/**
	 * 不是微信禁止分享
	 */
	if(!_global.device.weixin || process.env.NODE_ENV !== "production" ){return false;}
	let param ={
		url:`${location.origin}${location.pathname}${location.search}`,//location.href貌似也可以，可能#要去掉
		type:config.type==='user'?'user':'agent'
	};
	// 微信自身版本修复
	// if(_global.device.ios){//ios微信分享的坑
	// 	param ={
	// 		...param,
	// 		url:_global.landingSharePage
	// 	};
	// }
	net.ajax({
		url: API_ROOT['_WECHAT_SHARE'],
		type: 'POST',
		param,
		success: (response) => {
			let res = {
				...response.data
			};
			/**
			 * 构造分享的url
			 * 需要重写，需要带上邀请者id/代理商id
			 */
			/**
			 * 不在此模块，链接采用首页链接
			 */
			let url;
			const {
				origin,
				pathname,
				search,
			} = location;
			const localUrl = parseUrl().path[0];
			const in_type = ['goods']; 
			if (config.type === 'user') {
				if (in_type.includes(localUrl)) {
					/**
					 * 构造分享url
					 */
					url = `${origin}${pathname}${search?`${search}&`:"?"}agent_id=${res.agent_id}`;
				} else {
					/**
					 * 用户端默认
					 */
					url = `${origin}/?agent_id=${res.agent_id}`;
				}
			}else{
				/**
				 * 代理端默认
				 */
				url = `${origin}/agent-login`;
			}
			res = {
				...res,
				url:config.url||url
			};
			console.log(`share:`, res.url);
			/**
			 * 分享的标题，描述，图片
			 */
			res = {
				...res,
				share_title: config.title_shop ? `${config.title}——${res.share_title}` : (config.title || res.share_title),
				share_desc: config.desc ? (config.desc_shop ? `${config.desc}，来自${res.share_title}` : config.desc) : res.share_desc,
				share_img: config.imgUrl || res.share_img
			};
			/**
			 * config
			 */
			wx.config({
				debug: false,
				appId: res.appId,
				timestamp: res.timestamp,
				nonceStr: res.nonceStr,
				signature: res.signature,
				jsApiList: [
					/**
					 * 所有要调用的 API 都要加到这个列表中
					 */
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'onMenuShareQZone',
					'openAddress',
					'scanQRCode'
				]
			});
			/**
			 * error
			 */
			wx.error(function(res) {
				let str = JSON.stringify(res);
				console.error(`wx-error:${str}`);
			});
			/**
			 * ready
			 */
			wx.ready(function() {
				/**
				 * 在这里调用 API
				 */
				wx.onMenuShareAppMessage({
					title: res.share_title, // 分享标题
					desc: res.share_desc, // 分享页面描述
					link: res.url, // 分享链接
					imgUrl: res.share_img, // 图片链接
					success: function(ress) {
						/**
						 * 用户确认分享后执行的回调函数
						 */
						Toast.info('操作成功');
					},
					cancel: function() {
						/**
						 * 用户取消分享后执行的回调函数
						 */
						Toast.info('您取消了该操作');
					}
				});
				wx.onMenuShareTimeline({
					title: res.share_title,
					link: res.url,
					desc: res.share_desc, // 分享页面描述
					imgUrl: res.share_img,
					success: function() {
						/**
						 * 用户确认分享后执行的回调函数
						 */
						Toast.info('分享到朋友圈成功');
					},
					cancel: function() {
						/**
						 * 用户取消分享后执行的回调函数
						 */
						Toast.info('您已取消分享到朋友圈');
					}
				});
				wx.onMenuShareQQ({
					title: res.share_title,
					link: res.url,
					desc: res.share_desc, // 分享页面描述
					imgUrl: res.share_img,
					success: function() {
						/**
						 * 用户确认分享后执行的回调函数
						 */
						Toast.info('分享到QQ成功！');
					},
					cancel: function() {
						/**
						 * 用户取消分享后执行的回调函数
						 */
						Toast.info('您已取消分享到QQ');
					}
				});
				wx.onMenuShareWeibo({
					title: res.share_title,
					link: res.url,
					desc: res.share_desc, // 分享页面描述
					imgUrl: res.share_img,
					success: function() {
						/**
						 * 用户确认分享后执行的回调函数
						 */
						Toast.info('分享到微博成功！');
					},
					cancel: function() {
						/**
						 * 用户取消分享后执行的回调函数
						 */
						Toast.info('您已取消分享到微博');
					}
				});
				wx.onMenuShareQZone({
					title: res.share_title,
					desc: res.share_desc, // 分享页面描述
					link: res.url.replace('http://', ''),
					url: res.url,
					imgUrl: res.share_img,
					success: function() {
						/**
						 * 用户确认分享后执行的回调函数
						 */
						Toast.info('分享到QQ空间成功！');
					},
					cancel: function() {
						/**
						 * 用户取消分享后执行的回调函数
						 */
						Toast.info('您已取消分享到QQ空间');
					}
				});
			});
		},
		error: (res) => {
			console.error('wechat-share is failed');
		}
	});
};