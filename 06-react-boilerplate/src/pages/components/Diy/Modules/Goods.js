import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import GoodsItem from './GoodsItem';
import classnames from 'classnames';
@pureRender
class Goods extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			style,
			item_list
		} = this.props;
		return (
			<div className="diy-goods w-reset">
				<div className={classnames('w-row',('goods0'+style))}>
			 	{item_list.map((item,index)=>{
				 	return(
				 		<GoodsItem  
				 			key={item.id}
	 						style={Number(style)}
	 		   			    {...item}
				 		/>
				 	);
				
				})}
				</div>
			</div>
		);
	}
}
Goods.propTypes = {

};
export default Goods;