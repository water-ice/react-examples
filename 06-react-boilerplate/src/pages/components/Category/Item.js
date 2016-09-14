import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Item extends Component {
	constructor(props,context) {
	    super(props,context);
	}
	render(){
		const {
			id,
			title,
			img,
			nowprice,
			oldprice,
			sales,
			stock
		} = this.props.itemData;
		return (
				<div className="w-row">
				    <div className="w-col-4 w-tc">
				        <img src={img} />
				    </div>
				    <div className="w-col-8">
				        <p>{title}</p>
				        <i className="w-black-2">库存 {stock}件</i>
				        <p>
				            <i className="w-bg-pink">￥{nowprice}</i>
				            <i className="w-black-2">￥{oldprice}</i>
				            <i className="iconfont icon-jinhuoche w-pink w-fr w-pd-r" />
				        </p>
				    </div>
				</div>
		);
	}
}

Item.propTypes = {};

export default Item;