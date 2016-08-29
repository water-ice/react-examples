import React, { Component, PropTypes } from 'react';
import GoodsItem from './GoodsItem';
import Logis from './Logis';
class Goods extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		let {itemArr,itemObj,logis} = this.props;
		return (
			<div className="w-row order-goods">
				<ul>
					{itemArr.map((item, index) =>{
						return (
							<GoodsItem key={item}
									   item = {item}
									   itemData = {itemObj[item]}
							/>
						);
					})}
				</ul>
				<Logis logis = {logis} />
			</div>
		);
	}
}
Goods.propTypes = {
};
export default Goods;