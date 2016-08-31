import React, { Component, PropTypes } from 'react';
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
				<ul className="cart-goods w-row">
					{itemArr.map((item, index) =>{
						let selected = carts.includes(item);
						return (
							<Item  	key = {item}
									onSelect={onSelect}
									onDelete={onDelete}
									edit = {edit}
									item = {item}
									itemData={itemObj[item]}
									selected = {selected}
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