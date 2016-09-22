import React from 'react';
import Item from './Item';
import './List.scss';
/*建议后期转化为无状态组件*/
const GoodsList = (props) => {
	const { edit,onSelect,itemArr,itemObj,carts,onDelete,actions} = props;
	return (
		<div>
			<ul className="cart-goods w-row">
				{itemArr.map((item, index) =>{
					let selected = carts.includes(item);
					return (
						<Item  	
							key = {item}
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
};
export default GoodsList;