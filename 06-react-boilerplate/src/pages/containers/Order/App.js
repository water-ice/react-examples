import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as OrderActions from '../../actions/order';
import Order from './Modules/Order';
import OrderList from './Modules/OrderList';
import OrderDetail from './Modules/OrderDetail';
import OrderComment from './Modules/OrderComment';
import OrderRefund from './Modules/OrderRefund';
class App extends Component {
	constructor(props,context) {
	    super(props,context);
	}
  	render() {//做路由判断，返回不同组件
    	const { actions,order,location } = this.props;
        //由于微信支付只能设置三个，所以?pages=*而不能用
    	const {pages,type} = location.query;
    	switch(pages){
            //列表页
    		case 'list':
    			return (
                    <OrderList
                        actions={actions}
                        list={order.list}
                        type={type||'all'} 
                    />
                );
            //详情页
            case 'detail':
                return (
                    <OrderDetail
                        actions={actions}
                        detail={order.detail}
                    />
                );
            //评论页
            case 'comment':
                return (
                    <OrderComment
                        actions={actions}
                        comment={order.comment}
                    />
                );
            //退款页
            case 'refund':
                return (
                    <OrderRefund
                        actions={actions}
                        refund={order.refund}
                    />
                );
    		default :
    			return (
                    <Order
                        actions={actions}
                        main={order.main}
                    />
                );
    	}
  	}
}

function mapStateToProps(state) {
	return {
		order: state.order
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(OrderActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);