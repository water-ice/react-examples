import React, { Component, PropTypes } from 'react';
import Btn from './Btn';
import pureRender from 'pure-render-decorator';
@pureRender
class Item extends Component {
	constructor(props, context) {
		super(props, context);
    }
	render() {
		const {
			show,
			itemData
		} = this.props;
		const {
			id,//order_id
			order_sn,
			order_amount,//订单金额
			goods_amount,//商品金额
			pay_amount,//支付金额
			shipping_fee,//运费
			orders_items,//商品
			status_text,//交易状态
			button_list//按钮
		} =itemData;
	  	return (
	  		<div className="order-list-body">
	  			<div className="order-list-header w-row">
	  			    <span>订单号：{order_sn}</span>
	  			</div>
  				{orders_items.map((item,index)=>{
  					const {
  						order_id,
  						product_name,
  						sku_value,
  						price,
  						quantity,
  						product_image,
  						button_list
  					} =item;
  					return(
  						<div className="order-list-item w-row" key={`${id}_${index}`}>
  						    <div className="w-col-3">
  						        <img src={`${product_image}!4-4`} />
  						    </div>
  						    <div className="w-col-9 w-pd-l">
  						        <div>
  						            <div className="w-col-9 w-twoline">{product_name}</div>
  						            <div className="w-col-3 w-tr">￥{price}</div>
  						        </div>

  						        <div className="order-list-sku">
  						            <div className="w-col-9">{sku_value}</div>
  						            <div className="w-col-3">
  						                <div className="w-tr">x{quantity}</div>
  						                {/*<div className="w-tr w-orange">已拒绝</div>*/}
  						            </div>
  						        </div>
  						    </div>
  						</div>
					);
  				})}
	  			<div className="order-list-footer w-row">
	  			    <div className="order-list-amount">
	  			        <span>共{orders_items.length}件商品 合计：</span>
	  			        <span>￥{order_amount}(含运费：￥{shipping_fee})</span>
	  			    </div>
	  			    {
	  			    	button_list.length>0&&
	  			    	<div className="order-list-btn">
		  			    	{button_list.map((item,index)=>{
		  			    		return (
		  			    			<Btn key={id} id={id} itemData={item}/>
		  			    		);
		  			    	})}
		  			    </div>
	  			    }
	  			</div>
	  		</div>
	  	);
	}
}
export default Item;