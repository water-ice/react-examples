import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import Sku from '../_common/Sku/Sku';
@pureRender
class Item extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleSku = this.handleSku.bind(this);
	}
	handleSku(event){
		const {
			id
		} = this.props.itemData;
		Sku.popup({
			btnType: 0, //表示修改购物车中的规格
			goods_id:id
		}).then((res) => {
			console.info('回调成功');
		}).catch(() => {
			console.info('失败');
		});
	}
	render(){
		const {
			id,
			title,
			img,
			nowprice,
			oldprice,
			sales,
			stock
		} = this.props.itemData;
		return (
				<div className="w-row">
				    <div className="w-col-4 w-tc">
				        <img src={img} />
				    </div>
				    <div className="w-col-8">
				        <p>{title}</p>
				        <i className="w-black-2">库存 {stock}件</i>
				        <p>
				            <i className="w-bg-pink">￥{nowprice}</i>
				            <i className="w-black-2">￥{oldprice}</i>
				            <i className="iconfont icon-jinhuoche w-pink w-fr w-pd-r" onClick={this.handleSku} />
				        </p>
				    </div>
				</div>
		);
	}
}

Item.propTypes = {};

export default Item;