import React, { Component, PropTypes } from 'react';
import GoodsItem from './GoodsItem';
import Logis from './Logis';
class Goods extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {itemArr,itemObj,logis,actions} = this.props;
		return (
			<div className="w-row order-goods">
				<ul>
					{itemArr.map((item, index) =>{
						return (
							<GoodsItem key={item}
									   item = {item}
									   itemData = {itemObj[item]}
									   actions = {actions}
							/>
						);
					})}
				</ul>
				<Logis  logis = {logis} 
						actions = {actions}	
				/>
			</div>
		);
	}
}
Goods.propTypes = {
	itemArr:React.PropTypes.array,
	itemObj:React.PropTypes.object,
	logis:React.PropTypes.object,
	actions:React.PropTypes.object
};
export default Goods;