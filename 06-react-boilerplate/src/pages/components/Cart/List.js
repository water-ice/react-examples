import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import classnames from 'classnames';
import * as types from '../../constants/actions/cart';
import Sku from '../_common/Sku/Sku';
/*ant*/
import {
	Modal,
	Toast,
	WhiteSpace
} from 'antd-mobile';
/*建议后期转化为无状态组件*/
@pureRender
class GoodsList extends Component {

	constructor(props, context) {
		super(props, context);
		this.handleChange = this.handleChange.bind(this);
		this.handleQuantity = this.handleQuantity.bind(this); // 数量
		this.handleProps = this.handleProps.bind(this);
		this.handleInvalid = this.handleInvalid.bind(this);
	}
	componentWillReceiveProps(){
		let {itemObj} = this.props.main;
		let state ={};
		for(let i in itemObj){
			state[i] = itemObj[i].quantity;
		}
		this.state = state;//感觉这样设计不合理
	}
	handleChange(event){ // input输入
		let $this = event.target;
		let info = $this.getAttribute('data-id').split('_');
		let id = info[1];
		let quantity = event.target.value || 1;
		quantity = this.compareWithStock(quantity, id);
		this.setState({
			[id]: quantity
		});
	}
	compareWithStock(quantity,id){ // 与库存做比较
		let {itemObj} = this.props.main;
		let stock = parseInt(itemObj[id].stock);
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
		let info = $this.getAttribute('data-id').split('_');
		let type = info[0];
		let id = info[1];
		let quantity;
		let {itemObj} = this.props.main;
		let curQuantity = parseInt(itemObj[id].quantity);
		if(type == 'minus'){
			quantity = curQuantity - 1;
			quantity = this.compareWithStock(quantity,id);
		}else if(type == 'plus'){
			quantity = curQuantity + 1;
			quantity = this.compareWithStock(quantity,id);
		}else{
			quantity = parseInt($this.value);
		}
		let url = types.CART_PUT_MAIN;
		let param = {
			id:id,
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
		let id = $this.getAttribute('data-id');
		let quantity;
		let {itemObj} = this.props.main;
		let goods_id = itemObj[id].goods_id;
		let product_id = itemObj[id].product_id;
		Sku.popup({
			goods_id,
			product_id,
			btnType:3//表示修改购物车中的规格
		}).then(()=>{
			//成功回调
		}).catch(()=>{
			console.log('关闭');
		});
	}
	handleInvalid(){
		Toast.info('商品已过期');
	}
	renderEdit(edit,item,itemObj,onDelete){
		let editHtml,propHtml;
		let v = itemObj[item];
		if(v.prop){//onclick不能绑定在最外层div上 原因未知
			propHtml = (
				<div className="w-col-12">
					<em className="w-col-9 w-oneline">规格：<b>{v.prop}</b></em>
					<i className="iconfont w-col-3" onClick = {this.handleProps} data-id ={item}>&#xe601;</i>
				</div>
			);
		}
		if (edit) {
			editHtml = (
				<div className="w-col-7">
					<p className="w-twoline">{v.goods_title}</p>
					<small>规格：<b>{v.prop}</b></small>
					<div className="w-col-12">
						<div>￥<b>{v.price}</b></div>
						<small>￥{v.old_price}</small>
						<div>X<em>{v.quantity}</em></div>
					</div>
				</div>
			);

		} else {
			editHtml = (
				<div className = "cart-edit">
					{!v.status&&
					<div className="w-col-5">
						<div className="w-col-12">
							<i 	className="iconfont w-btn-step icon-move"
								data-id={'minus_'+item} 	
								onClick = {this.handleQuantity} 
							/>
							<input  type="number" 
									className="w-btn-input" 
									onChange= {this.handleChange}
									onKeyUp = {(e)=>{if(e.keyCode ==13){this.handleQuantity(e);}}}
									value={this.state[item]}
									data-id={'input_'+item} 
									onBlur = {this.handleQuantity} 
							/>
							<i  className="iconfont w-btn-step icon-add" 
								data-id={'plus_'+item} 
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
		let { edit,onSelect,main,onDelete} = this.props;
		let { itemArr,itemObj,carts } = main;
		let liHtml = itemArr.map((item, index) =>{
			return (
				<li key={item} data-id={item}>
					{!itemObj[item].status?
					<i  className={
							classnames(
								"iconfont w-col-2 w-tc",
								(carts.includes(item)? "icon-xuanzhong w-orange" : "icon-not_selected")
							)
						}
						onClick = {onSelect} 
						data-id = {item}
					/>
					:
					<i  className="iconfont w-col-2 w-tc icon-gantanhao"
						onClick = {this.handleInvalid} 
					/>
					}
					<img className="w-fl" src={itemObj[item].img} />
					{this.renderEdit(edit,item,itemObj,onDelete)}
				</li>
			);
		});
		return (
			<div>
				<WhiteSpace />
				<ul className="cart-goods w-row">
					{liHtml}
				</ul>
          	</div>
		);
	}
}
GoodsList.PropTypes = {
	onSelect :React.PropTypes.func
};
export default GoodsList;