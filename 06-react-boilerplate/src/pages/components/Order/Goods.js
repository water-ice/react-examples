import React, { Component, PropTypes } from 'react';
import GoodsItem from './GoodsItem';
import Logis from './Logis';//运费模版
import './Goods.scss';
class Goods extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {itemArr,itemObj,logis,actions,aid} = this.props;
		const items = itemArr.length-1;
		return (
			<div className="w-row order-goods">
				<ul>
					{itemArr.map((item, index) =>{
						return (
							<div key={`${item}_${index}`}>
								<GoodsItem item = {item}
										   itemData = {itemObj[item]}
										   actions = {actions}
										   aid = {aid}
								/>
								{(index==items||(items>0&&itemObj[item].logis_type!=itemObj[itemArr[index+1]].logis_type))&&
									<Logis  logis = {logis[itemObj[item].logis_type]}
											logis_type = {itemObj[item].logis_type}
											actions = {actions}
											aid = {aid}
									/>
								}
							</div>
						);
					})}
				</ul>
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