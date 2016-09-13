import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import {Toast} from 'antd-mobile';
import * as types from '../../constants/actions/order';
@pureRender
class GoodsItem extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleQuantity = this.handleQuantity.bind(this);
	}
	handleQuantity(event){
		//console.log(event)
		let {item,itemData,aid} = this.props;
		let {quantity,stock} = itemData;
		let $this = event.target;
		let type = $this.getAttribute('data-type');
		if(type == 'minus'){
			quantity = quantity - 1;
			if(quantity==0){
				Toast.info('至少可购买1件');
				return !1;
			}
		}else if(type == 'plus'){
			quantity = quantity + 1;
			if(quantity>stock){
				Toast.info('最多可购买' + stock + '件');
				return !1;
			}
		}

		Toast.loading(null,0);
		let url = types.ORDER_MAIN_GOODS_PUT;
		let param = {
			id:item,
			quantity,
			aid
		};
		let params = {
			param: param,
			ajaxType: 'PUT',
			onSuccess: function(data) {
				Toast.hide();
			},
			onError: function(res) {
				Toast.hide();
				alert('error');
			}
		};
		this.props.actions.request(url,params);
	}
	render() {
		let {item,itemData} = this.props;
		let {
			img,
			goods_title,
			props_str,
			coupon,
			price,
			quantity,
		} = itemData;
		return (
			<li>
				<img className="w-fl" src={img} />
				<div>
					<p className="w-oneline">{goods_title}</p>
					<div className="order-goods-props">{props_str}</div>
					{coupon&&
						<span>优惠券</span>
					}
					<div>价格：<b>{price}</b></div>
					<div className="order-goods-edit">
						<i className="iconfont w-btn-step icon-minus" onClick={this.handleQuantity} data-type="minus"/>
						<div className="w-fl">X <em>{quantity}</em></div>
						<i className="iconfont w-btn-step icon-plus" onClick={this.handleQuantity} data-type="plus"/>
					</div>
				</div>
			</li>
		);
				
	}
}
GoodsItem.propTypes = {
	item:React.PropTypes.string,
	itemData:React.PropTypes.object
};
export default GoodsItem;