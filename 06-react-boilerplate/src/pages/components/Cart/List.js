import React, { Component, PropTypes } from 'react';
import Item from './Item';
/*建议后期转化为无状态组件*/
class GoodsList extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { edit,onSelect,itemArr,itemObj,carts,onDelete,actions} = this.props;
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
	edit:React.PropTypes.bool,
	onSelect:React.PropTypes.func,
	onDelete:React.PropTypes.func,
	actions:React.PropTypes.object,
	itemArr:React.PropTypes.array,
	itemObj:React.PropTypes.object,
	carts:React.PropTypes.array
};
export default GoodsList;