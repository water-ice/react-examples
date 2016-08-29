import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class GoodsItem extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		let {logis} = this.props;
		let {
			name,
			price,
		} = logis;
		return (
			<section className="order-logis">
				<div className="logis-open-btn w-row w-pd">
					<div className="w-col-5">配送方式</div>
					<i className="iconfont w-fr">&#xe603;</i>
					<div className="w-fr logis-price">{name}<b>￥{price}</b></div>
				</div>	
			</section>
		);
				
	}
}
GoodsItem.propTypes = {
};
export default GoodsItem;