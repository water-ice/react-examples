import React, { Component, PropTypes } from 'react';
import './Goods.scss';
class Goods extends Component {
	render(){
		return (
			<div className="w-col-9 w-bg-white category-goods" style={{height:_global.innerHeight}}>
			    <div className="w-row w-pd-tb w-bb">
			        <div className="w-col-4 w-tc">
			            <img src="img/eat.jpg"  />
			        </div>
			        <div className="w-col-8">
			            <p>悦风悦风悦风悦风悦风悦风</p>
			            <i className="w-black-2">库存 0件</i>
			            <p>
			                <i className="w-bg-pink">￥50</i>
			                <i className="w-black-2">￥85</i>
			                <i className="iconfont icon-jinhuoche w-pink w-fr w-pd-r" />
			            </p>
			        </div>
			    </div>
			    <div className="w-row w-pd-tb w-bb">
			        <div className="w-col-4 w-tc">
			            <img src="img/eat.jpg" />
			        </div>
			        <div className="w-col-8">
			            <p>悦风悦风悦风悦风悦风悦风</p>
			            <i className="w-black-2">库存 0件</i>
			            <p>
			                <i className="w-bg-pink">￥50</i>
			                <i className="w-black-2">￥85</i>
			                <i className="iconfont icon-jinhuoche w-pink w-fr w-pd-r" />
			            </p>
			        </div>
			    </div>
			</div>
		);
	}
}

Goods.propTypes = {};

export default Goods;