import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import classnames from 'classnames';
import * as types from '../../constants/actions/cart';
import Sku from '../_common/Sku/Sku';
/*ant*/
import {
	Toast
} from 'antd-mobile';
@pureRender
class GoodsList extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {};
		this.handleChange = this.handleChange.bind(this);
		this.handleQuantity = this.handleQuantity.bind(this); // 数量
		this.handleProps = this.handleProps.bind(this);
		this.handleInvalid = this.handleInvalid.bind(this);
	}
	componentWillReceiveProps(nextProps){
		let {itemData} = nextProps;
		this.setState({
			quantity:itemData.quantity
		});
	}
	handleChange(event){ // input输入
		let $this = event.target;
		let quantity = event.target.value || 1;
		quantity = this.compareWithStock(quantity);
		this.setState({
			quantity : quantity
		});
	}
	compareWithStock(quantity){
		let {itemData} = this.props;
		let stock = parseInt(itemData.stock);
		if (isNaN(quantity) || quantity <= 0) {
			Toast.info('至少可购买1件');
			quantity = 1;
		} else if (quantity > stock) {
			Toast.info('最多可购买' + stock + '件');
			quantity = stock;
		}
		return quantity;
	}
	handleQuantity(event){ // 修改数量
		let $this  = event.target;
		let type = $this.getAttribute('data-type');
		let quantity;
		let {itemData,item} = this.props;
		let curQuantity = parseInt(itemData.quantity);
		if(type == 'minus'){
			quantity = curQuantity - 1;
			quantity = this.compareWithStock(quantity);
		}else if(type == 'plus'){
			quantity = curQuantity + 1;
			quantity = this.compareWithStock(quantity);
		}else{
			quantity = parseInt($this.value);
		}
		let url = types.CART_PUT_MAIN;
		let param = {
			id:item,
			quantity:quantity
		};

		let params = {
			param: param,
			ajaxType: 'PUT',
			onSuccess: (res) => {
				Toast.hide();
			},
			onError: (res) => {
				Toast.hide();
			}
		};
		if(curQuantity != quantity){//数量变化时
			Toast.loading(null, 0);
			this.props.actions.request(url,params);
		}
	}
	handleProps(event){//修改规格
		let $this  = event.target;
		let {itemData,item} = this.props;
		let quantity;
		let goods_id = itemData.goods_id;
		let product_id = itemData.product_id;
		Sku.popup({
			cart_id: item,
			btnType: 3, //表示修改购物车中的规格
			goods_id,
			product_id
		}).then((res) => {
			console.info('回调成功');
			console.log(res);
			this.props.actions.cartProps(res);
		}).catch(() => {
			console.info('失败');
		});
	}
	handleInvalid(){
		Toast.info('商品已过期');
	}
	renderEdit(){
		let editHtml,propHtml;
		const {edit,item,itemData,onDelete} = this.props;
		const {
			prop,
			goods_title,
			price,
			old_price,
			quantity,
			status
		} = itemData;
		if(prop){//onclick不能绑定在最外层div上 原因未知
			propHtml = (
				<div className="w-col-12">
					<em className="w-col-9 w-oneline">规格：<b>{prop}</b></em>
					<i className="iconfont w-col-3 icon-down" onClick = {this.handleProps} />
				</div>
			);
		}
		if (edit) {
			editHtml = (
				<div className="w-col-7">
					<p className="w-twoline">{goods_title}</p>
					<small>规格：<b>{prop}</b></small>
					<div className="w-col-12">
						<div>￥<b>{price}</b></div>
						<small>￥{old_price}</small>
						<div>X<em>{quantity}</em></div>
					</div>
				</div>
			);

		} else {
			editHtml = (
				<div className = "cart-edit">
					{!status&&
					<div className="w-col-5">
						<div className="w-col-12">
							<i 	className="iconfont w-btn-step icon-minus"
								data-type="minus" 	
								onClick = {this.handleQuantity} 
							/>
							<input  type="number" 
									className="w-btn-input" 
									onChange= {this.handleChange}
									onKeyUp = {(e)=>{if(e.keyCode ==13){this.handleQuantity(e);}}}
									value={this.state.quantity}
									data-type="input" 
									onBlur = {this.handleQuantity} 
							/>
							<i  className="iconfont w-btn-step icon-plus" 
								data-type="plus"
								onClick = {this.handleQuantity} 
							/>
						</div>
						{propHtml}
					</div>
					}
					<div className="w-col-2" onClick = {onDelete} data-id={item}>删除</div>
				</div>
			);
		}
		return editHtml;
	}
	render() {
		let {item,itemData,selected,onSelect} = this.props;
		console.log('re render');
		return (
			<li>
				{!itemData.status?
				<i  className={
						classnames(
							"iconfont w-col-2 w-tc",
							(selected? "icon-select w-orange" : "icon-not-select")
						)
					}
					onClick = {onSelect} 
					data-id = {item}
				/>
				:
				<i  className="iconfont w-col-2 w-tc icon-info"
					onClick = {this.handleInvalid} 
				/>
				}
				<img className="w-fl" src={itemData.img} />
				{this.renderEdit()}
			</li>
		);
	}
}
GoodsList.PropTypes = {
	edit:React.PropTypes.bool,
	onSelect:React.PropTypes.func,
	onDelete:React.PropTypes.func,
	actions:React.PropTypes.object,
	item:React.PropTypes.number,
	itemData:React.PropTypes.object,
	selected:React.PropTypes.bool
};
export default GoodsList;