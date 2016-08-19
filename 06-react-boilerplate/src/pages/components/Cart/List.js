import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
/*ant*/
import {
	Flex,
	WhiteSpace,
	WingBlank,
	Button,
	List
} from 'antd-mobile';
/*建议后期转化为无状态组件*/
class GoodsList extends Component {

	constructor(props, context) {
		super(props, context);
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillReceiveProps(){
		let {itemObj} = this.props.main;
		let state ={};
		for(let i in itemObj){
			state[i] = itemObj[i].quantity;
		}
		this.state = state;//感觉这样设计不合理
	}
	handleChange(event){
		let $this  = event.target;
		let info = $this.getAttribute('data-id').split('_');
		let id = info[1];
		this.setState({
			[id]:event.target.value
		});
	}
	renderEdit(edit,item,itemObj,onDelete,onQuantity){
		let editHtml,propHtml;
		let v = itemObj[item];
		if(v.prop){
			propHtml = (
				<div className="w-col-12">
					<em className="w-col-9 w-oneline">规格：<b>{v.prop}</b></em>
					<i className="iconfont">&#xe601;</i>
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
						<small>￥2132131</small>
						<div>X<em>{v.quantity}</em></div>
					</div>
				</div>
			);

		} else {
			editHtml = (
				<div className = "cart-edit">
					<div className="w-col-5">
						<div className="w-col-12">
							<i 	className="iconfont w-btn-step icon-move"
								data-id={'minus_'+item} 	
								onClick = {onQuantity} 
							/>
							<input  type="number" 
									className="w-btn-input" 
									onChange= {this.handleChange}
									value={this.state[item]}
									data-id={'input_'+item} 
									onBlur = {onQuantity} 
							/>
							<i  className="iconfont w-btn-step icon-add" 
								data-id={'plus_'+item} 
								onClick = {onQuantity} 
							/>
						</div>
						{propHtml}
					</div>
					<div className="w-col-2" onClick = {onDelete} data-id={item}>删除</div>
				</div>
			);
		}
		return editHtml;
	}
	render() {
		let { edit,onSelect,main,onDelete,onQuantity} = this.props;
		let { itemArr,itemObj,carts } = main;
		let liHtml = itemArr.map((item, index) =>{
			return (
				<li key={item} data-id={item}>
					<i  className={
							classnames(
								"iconfont w-col-2 w-tc",
								(carts.includes(item)? "icon-xuanzhong w-orange" : "icon-not_selected")
							)
						}
						onClick = {onSelect} 
						data-id = {item}
					/>
					<img className="w-fl" src={itemObj[item].img} />
					{this.renderEdit(edit,item,itemObj,onDelete,onQuantity)}
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