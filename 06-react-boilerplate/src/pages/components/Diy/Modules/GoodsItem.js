import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import pureRender from 'pure-render-decorator';
import Sku from '../../_common/Sku/Sku';
@pureRender
class GoodsItem extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleSku = this.handleSku.bind(this);
	}
	handleSku(event){
		const {
			id
		} = this.props;
		Sku.popup({
			btnType: 0, //表示修改购物车中的规格
			goods_id:id
		}).then((res) => {
			console.info('回调成功');
		}).catch(() => {
			console.info('失败');
		});
	}
	render() {
		const {
			style,
			id,
			title,
			img,
			nowprice,
			sales,
			seckill,
			freesend,
			bargain
		} = this.props;
		switch(style){
			case 1 :
				return(
					<div className="w-col-6">
						<Link to={'/goods/'+id}>
							<img src = {img+'!2-2'} />
							<div className="goods-title w-twoline">{title}</div>
						</Link>
						<div className="goods-price">
							<span>￥{nowprice}</span>
							<i className="iconfont icon-jinhuoche" onClick={this.handleSku} />
						</div>
						<div className="goods-active w-nowrap">
							<b>销量:{sales}</b>
							{seckill&&(<span name="seckill">秒杀</span>)}
							{freesend&&(<span name="freesend">包邮</span>)}
							{bargain&&(<span name="bargain">砍价</span>)}
						</div>
					</div>
				);
			case 2 :
				return(
					<div className="goods-list">
						<Link to={'/goods/'+id}>
							<img src = {img+'!1-1'} />
							<div className="goods-title w-twoline">{title}</div>
						</Link>
						<div className="goods-active w-nowrap">
							{seckill&&<span name="seckill">秒杀</span>}
							{freesend&&<span name="freesend">包邮</span>}
							{bargain&&<span name="bargain">砍价</span>}
						</div>
						<div className="goods-price">
							<span>￥{nowprice}</span>
							<b>销量:{sales}</b>
							<i className="iconfont icon-jinhuoche" onClick={this.handleSku} />
						</div>
					</div>
				);
			case 4 :
				return (
					<div className="goods-list">
						<Link to={'/goods/'+id}>
							<img src = {img+'!4-4'} />
						</Link>
						<div className="w-col-8">
							<Link to={'/goods/'+id}>
								<div className="goods-title w-twoline">{title}</div>
								<div className="goods-active w-nowrap" style={{minHeight:40}}>
									{seckill&&<span name="seckill">秒杀</span>}
									{freesend&&<span name="freesend">包邮</span>}
									{bargain&&<span name="bargain">砍价</span>}
								</div>
							</Link>
							<div className="goods-price">
								<span>￥{nowprice}</span>
								<b>销量:{sales}</b>
								<i className="iconfont icon-jinhuoche" onClick={this.handleSku} />
							</div>
						</div>
					</div>
				);
			default:
				return null;
		}
	}
}
GoodsItem.propTypes = {

};
export default GoodsItem;