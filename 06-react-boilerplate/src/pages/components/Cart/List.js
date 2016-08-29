import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import * as types from '../../constants/actions/cart';
import Sku from '../_common/Sku/Sku';
/*ant*/
import {
	WhiteSpace
} from 'antd-mobile';
import Item from './Item';
/*建议后期转化为无状态组件*/
class GoodsList extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		let { edit,onSelect,itemArr,itemObj,carts,onDelete,actions} = this.props;
		return (
			<div>
				<WhiteSpace />
				<ul className="cart-goods w-row">
					{itemArr.map((item, index) =>{
						return (
							<Item  	key = {item}
									onSelect={onSelect}
									onDelete={onDelete}
									edit = {edit}
									item = {item}
									itemData={itemObj[item]}
									carts = {carts}
									actions= {actions}
							/>
						);
					})}
				</ul>
          	</div>
		);
	}
}
GoodsList.PropTypes = {
	onSelect :React.PropTypes.func
};
export default GoodsList;